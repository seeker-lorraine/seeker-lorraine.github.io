(function () {
  const CACHE_KEY = "welcome-info-v2"; // 升级版本号，避免旧的英文缓存继续显示
  const CACHE_TTL = 12 * 60 * 60 * 1000; // 12 小时缓存，避免每次刷新都请求接口
  const DEFAULT_NAME = "Lorraine";

  // 省份问候语
  const PROVINCE_GREETINGS = {
    北京市: "北——京——欢迎你",
    天津市: "讲段相声吧",
    重庆市: "高德地图：已到达重庆，下面交给百度地图导航",
    河北省: "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山",
    山西省: "展开坐具长三尺，已占山河五百余",
    内蒙古自治区: "天苍苍，野茫茫，风吹草低见牛羊",
    辽宁省: "我想吃烤鸡架",
    吉林省: "状元阁就是东北烧烤之王",
    黑龙江省: "很喜欢哈尔滨大剧院",
    上海市: "众所周知，中国只有两个城市",
    浙江省: "东风渐绿西湖柳，雁已还人未南归",
    福建省: "井邑白云间，岩城远带山",
    江西省: "落霞与孤鹜齐飞，秋水共长天一色",
    山东省: "遥望齐州九点烟，一泓海水杯中泻",
    湖北省: "来碗热干面",
    湖南省: "74751，长沙斯塔克",
    广东省: "老板来两斤福建人",
    广西壮族自治区: "桂林山水甲天下",
    海南省: "朝观日出逐白浪，夕看云起收霞光",
    四川省: "康康川妹子",
    贵州省: "茅台，学生，再塞200",
    云南省: "玉龙飞舞云缠绕，万仞冰川直耸天",
    西藏自治区: "躺在茫茫草原上，仰望蓝天",
    陕西省: "来份臊子面加馍",
    甘肃省: "羌笛何须怨杨柳，春风不度玉门关",
    青海省: "牛肉干和老酸奶都好好吃",
    宁夏回族自治区: "大漠孤烟直，长河落日圆",
    新疆维吾尔自治区: "驼铃古道丝绸路，胡马犹闻唐汉风",
    台湾省: "我在这头，大陆在那头",
    香港特别行政区: "永定贼有残留地鬼嚎，迎击光非岁玉",
    澳门特别行政区: "性感荷官，在线发牌",
  };
  const MUNICIPALITIES = new Set([
    "北京市", "天津市", "重庆市", "上海市", "香港特别行政区", "澳门特别行政区",
  ]);
  const COUNTRY_GREETINGS = {
    日本: "よろしく，一起去看樱花吗",
    美国: "Make America Great Again",
    英国: "想同你一起夜乘伦敦眼",
    俄罗斯: "干了这瓶伏特加",
    法国: "C'est La Vie",
    德国: "Die Zeit verging im Fluge.",
    澳大利亚: "一起去大堡礁吧",
    加拿大: "拾起一片枫叶赠予你",
  };

  function readCache() {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const cached = JSON.parse(raw);
      if (!cached.expires || cached.expires < Date.now()) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      return cached.data;
    } catch (e) {
      return null;
    }
  }

  function writeCache(data) {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ expires: Date.now() + CACHE_TTL, data })
      );
    } catch (e) {
      // 隐私模式下 localStorage 不可用，忽略即可
    }
  }

  // 球面弦长计算距离（km）
  function distance(lat1, lng1, lat2, lng2) {
    const { sin, cos, asin, PI, hypot } = Math;
    const toVec = (lat, lng) => {
      const a = (lat * PI) / 180;
      const b = (lng * PI) / 180;
      return { x: cos(b) * cos(a), y: cos(b) * sin(a), z: sin(b) };
    };
    const v1 = toVec(lat1, lng1);
    const v2 = toVec(lat2, lng2);
    const chord = hypot(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    return Math.round(asin(chord / 2) * 2 * 6371);
  }

  function resolveLocation(ad) {
    if (ad.nation !== "中国") {
      return {
        address: ad.nation || "未知",
        greeting: COUNTRY_GREETINGS[ad.nation] || "带我去你的国家看看吧",
      };
    }
    const address = MUNICIPALITIES.has(ad.province)
      ? ad.province
      : `${ad.province} ${ad.city}`.trim();
    if (ad.province === "江苏省") {
      const special = {
        南京市: "欢迎来自安徽省南京市的小伙伴",
        苏州市: "上有天堂，下有苏杭",
        泰州市: "这里也是我的故乡",
      };
      return { address, greeting: special[ad.city] || "散装是必须要散装的" };
    }
    if (ad.province === "安徽省") {
      return {
        address,
        greeting: ad.city === "淮南市" ? "淮南牛肉汤！" : "蚌埠住了，芜湖起飞",
      };
    }
    return {
      address,
      greeting: PROVINCE_GREETINGS[ad.province] || "带我去你的城市逛逛吧",
    };
  }

  function timeGreeting() {
    const h = new Date().getHours();
    if (h >= 5 && h < 11) return "🌤️上午好，一日之计在于晨";
    if (h >= 11 && h < 13) return "☀️中午好，该摸鱼吃午饭了";
    if (h >= 13 && h < 15) return "🕞下午好，懒懒地睡个午觉吧";
    if (h >= 15 && h < 16) return "🍵三点几啦，饮茶先啦";
    if (h >= 16 && h < 19) return "🌇夕阳无限好，只是近黄昏";
    if (h >= 19 && h < 24) return "🌔晚上好，夜生活嗨起来";
    return "🌌夜深了，早点休息，少熬夜";
  }

  function render(el, payload, blogLat, blogLng) {
    const result = payload.result || {};
    const ip = result.ip || "未知";
    const ad = result.ad_info || {};
    const loc = result.location || {};
    const { address, greeting } = resolveLocation(ad);
    const dist = distance(blogLat, blogLng, loc.lat, loc.lng);
    const isIPv6 = ip.includes(":");
    const name = el.dataset.name || DEFAULT_NAME;
    const ipHtml = isIPv6
      ? `<br><b style="font-size:11px;"><div class="ip-address">${ip}</div></b>`
      : `<b style="font-size:12px;"><div class="ip-address" style="display:inline;margin-left:5px;">${ip}</div></b>`;

    el.innerHTML = `🙋欢迎 <b>${address}</b> 的小伙伴<br>
      😊<b>${greeting}</b><br>
      🗺️您距离 <b>${name}</b> 约有 <b>${Number.isFinite(dist) ? dist : "--"}</b> 公里！<br>
      你的IP地址：${ipHtml}${isIPv6 ? "" : "<br>"}
      <b><span>${timeGreeting()}</span>！</b>`;
  }

  // 腾讯位置服务 IP 定位（JSONP，天然绕过 CORS）
  function queryTencent(key) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error("IP 定位接口超时"));
      }, 5000);
      function cleanup() {
        clearTimeout(timer);
        script.remove();
        delete window.QQmap;
      }
      script.src = `https://apis.map.qq.com/ws/location/v1/ip?key=${encodeURIComponent(key)}&output=jsonp`;
      window.QQmap = (data) => {
        cleanup();
        data.status === 0 ? resolve(data) : reject(new Error("IP 定位失败"));
      };
      script.onerror = () => {
        cleanup();
        reject(new Error("IP 定位接口加载失败"));
      };
      document.body.appendChild(script);
    });
  }

  // 公共接口兜底（无需密钥，均支持 CORS）
  async function queryPublic() {
    let d;
    try {
      const res = await fetch("https://ipinfo.io/json", {
        signal: AbortSignal.timeout(4000),
      });
      d = await res.json();
      const [lat, lng] = (d.loc || "").split(",").map(parseFloat);
      return normalize(d.ip, d.country === "CN" ? "中国" : d.country, d.region, d.city, lat, lng);
    } catch (e) {
      const res = await fetch("https://ipwho.is/", {
        signal: AbortSignal.timeout(4000),
      });
      d = await res.json();
      return normalize(
        d.ip,
        d.country_code === "CN" ? "中国" : d.country,
        d.region,
        d.city,
        parseFloat(d.latitude),
        parseFloat(d.longitude)
      );
    }
  }

  // 兜底接口返回英文地名，这里转成中文；腾讯接口本身返回中文，原样保留
  const NATION_CN = {
    CN: "中国", China: "中国", Japan: "日本", "United States": "美国", US: "美国",
    "United Kingdom": "英国", UK: "英国", Russia: "俄罗斯", France: "法国",
    Germany: "德国", Australia: "澳大利亚", Canada: "加拿大", Singapore: "新加坡",
    "South Korea": "韩国", Korea: "韩国",
  };
  const REGION_CN = {
    Beijing: "北京市", Tianjin: "天津市", Shanghai: "上海市", Chongqing: "重庆市",
    Hebei: "河北省", Shanxi: "山西省", "Inner Mongolia": "内蒙古自治区",
    Liaoning: "辽宁省", Jilin: "吉林省", Heilongjiang: "黑龙江省",
    Jiangsu: "江苏省", Zhejiang: "浙江省", Anhui: "安徽省", Fujian: "福建省",
    Jiangxi: "江西省", Shandong: "山东省", Henan: "河南省", Hubei: "湖北省",
    Hunan: "湖南省", Guangdong: "广东省", Guangxi: "广西壮族自治区",
    Hainan: "海南省", Sichuan: "四川省", Guizhou: "贵州省", Yunnan: "云南省",
    Tibet: "西藏自治区", Shaanxi: "陕西省", Gansu: "甘肃省", Qinghai: "青海省",
    Ningxia: "宁夏回族自治区", Xinjiang: "新疆维吾尔自治区",
    Taiwan: "台湾省", "Hong Kong": "香港特别行政区", Macau: "澳门特别行政区",
    Macao: "澳门特别行政区",
  };
  const CITY_CN = {
    Beijing: "北京市", Shanghai: "上海市", Tianjin: "天津市", Chongqing: "重庆市",
    Guangzhou: "广州市", Shenzhen: "深圳市", Hangzhou: "杭州市", Nanjing: "南京市",
    Suzhou: "苏州市", Wuhan: "武汉市", Changsha: "长沙市", Chengdu: "成都市",
    Xian: "西安市", "Xi'an": "西安市", Zhengzhou: "郑州市", Jinan: "济南市",
    Qingdao: "青岛市", Dalian: "大连市", Shenyang: "沈阳市", Harbin: "哈尔滨市",
    Kunming: "昆明市", Guiyang: "贵阳市", Nanning: "南宁市", Haikou: "海口市",
    Fuzhou: "福州市", Xiamen: "厦门市", Nanchang: "南昌市", Hefei: "合肥市",
    Taiyuan: "太原市", Shijiazhuang: "石家庄市", Lanzhou: "兰州市", Xining: "西宁市",
    Yinchuan: "银川市", Urumqi: "乌鲁木齐市", Lhasa: "拉萨市", Hohhot: "呼和浩特市",
    Changchun: "长春市", Ningbo: "宁波市", Wuxi: "无锡市", Dongguan: "东莞市",
    Foshan: "佛山市", Zhuhai: "珠海市", Zhongshan: "中山市", Huizhou: "惠州市",
    Wenzhou: "温州市", Jinhua: "金华市", Xuzhou: "徐州市", Changzhou: "常州市",
    Nantong: "南通市", Yangzhou: "扬州市", Yancheng: "盐城市", Taizhou: "台州市",
    Luoyang: "洛阳市", Kaifeng: "开封市", Xinyang: "信阳市", Nanyang: "南阳市",
    Zhumadian: "驻马店市", Huanggang: "黄冈市", Yangjiang: "阳江市",
    Huainan: "淮南市", Wuhu: "芜湖市", Bengbu: "蚌埠市",
    "Hong Kong": "香港", Macau: "澳门", Taipei: "台北市",
  };

  // ipwho.is 会返回 "Jiangsu Sheng" 这类带后缀的写法，先清洗再查表
  function cleanName(value) {
    return (value || "")
      .replace(/\s+(Sheng|Shi|Province|City|Zizhiqu|Autonomous Region)$/i, "")
      .trim();
  }

  function toCN(value, dict) {
    if (!value) return "";
    if (dict[value]) return dict[value];
    const cleaned = cleanName(value);
    if (dict[cleaned]) return dict[cleaned];
    // 已是中文则原样返回，未命中的英文返回空（避免出现中英混排）
    return /^[\u4e00-\u9fa5]/.test(value) ? value : "";
  }

  function normalize(ip, nation, province, city, lat, lng) {
    return {
      result: {
        ip,
        location: { lat, lng },
        ad_info: {
          nation: toCN(nation, NATION_CN) || "未知",
          province: toCN(province, REGION_CN),
          city: toCN(city, CITY_CN),
        },
      },
    };
  }

  function injectStyles() {
    if (document.getElementById("welcome-info-style")) return;
    const style = document.createElement("style");
    style.id = "welcome-info-style";
    style.textContent = `
      #welcome-info{outline:1px solid var(--anzhiyu-card-border);background-color:var(--anzhiyu-background);border-radius:12px;margin-top:5px;padding:10px}
      .ip-address{filter:blur(5px);transition:filter .3s;cursor:pointer}
      .ip-address:hover{filter:blur(0)}
    `;
    document.head.appendChild(style);
  }

  async function init() {
    const el = document.getElementById("welcome-info");
    if (!el || el.dataset.rendered === "true") return;
    const key = el.dataset.key || "";
    const lat = Number(el.dataset.lat);
    const lng = Number(el.dataset.lng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return;

    el.dataset.rendered = "true";
    injectStyles();

    const cached = readCache();
    if (cached) {
      render(el, cached, lat, lng);
      return;
    }

    try {
      const data = key ? await queryTencent(key) : await queryPublic();
      writeCache(data);
      render(el, data, lat, lng);
    } catch (e) {
      // 腾讯接口失败时回退公共接口
      try {
        const data = await queryPublic();
        writeCache(data);
        render(el, data, lat, lng);
      } catch (err) {
        el.remove();
        console.warn("[welcome] 访客信息获取失败:", err);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", init);
  document.addEventListener("pjax:complete", init); // Anzhiyu 站内跳转
  init();
})();
