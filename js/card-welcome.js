(function () {
  // 你所在城市的坐标（示例：长沙），改成你自己的
  const ANCHOR = { name: "长沙", lat: 28.2282, lng: 112.9388 };

  // Haversine 公式：计算两个经纬度坐标的球面距离（km）
  function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  const cityEl = document.getElementById("visitor-city");
  const distEl = document.getElementById("visitor-distance");
  if (!cityEl) return;

  // 公共 IP 接口（实测支持 CORS），按顺序降级
  const APIS = [
    {
      // ipinfo.io：city 为英文城市名，loc 为 "纬度,经度"
      url: "https://ipinfo.io/json",
      parse: (d) => {
        const [lat, lng] = (d.loc || "").split(",").map(parseFloat);
        return { city: d.city, lat, lng };
      },
    },
    {
      url: "https://ipwho.is/",
      parse: (d) => ({
        city: d.city,
        lat: parseFloat(d.latitude),
        lng: parseFloat(d.longitude),
      }),
    },
    {
      // 部分 IP 无 city 字段，降级用 region / country
      url: "https://get.geojs.io/v1/ip/geo.json",
      parse: (d) => ({
        city: d.city || d.region || d.country,
        lat: parseFloat(d.latitude),
        lng: parseFloat(d.longitude),
      }),
    },
  ];

  async function loadVisitor() {
    for (const api of APIS) {
      try {
        const res = await fetch(api.url, { signal: AbortSignal.timeout(5000) });
        const data = await res.json();
        const info = api.parse(data);
        if (!info.city) throw new Error("no city");
        cityEl.textContent = info.city;
        if (distEl && !isNaN(info.lat) && !isNaN(info.lng)) {
          distEl.textContent = Math.round(
            haversine(ANCHOR.lat, ANCHOR.lng, info.lat, info.lng)
          );
        }
        return;
      } catch (e) {
        console.warn("[welcome]", api.url, "请求失败，尝试下一个", e);
      }
    }
    cityEl.textContent = "远方";
    if (distEl) distEl.textContent = "--";
  }
  loadVisitor();
})();
