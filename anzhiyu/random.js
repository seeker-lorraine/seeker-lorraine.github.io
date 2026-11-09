var posts=["2026/11/09/hello-world/","2024/05/21/快速搭建个人博客网站/","2026/11/08/我的第一篇文章/","2026/05/24/手把手教你用 Docker Compose 部署 Twikoo 评论系统/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"又拍云","link":"https://console.upyun.com/register/?invite=y4WzBTKTD","avatar":"https://console.upyun.com/assets/favicon.png","descr":"国内知名企业级云服务商、国家高新技术企业，持有工信部颁发的CDN牌照","recommend":false},{"name":"腾讯云","link":"https://curl.qcloud.com/7hVTHjdZ","avatar":"https://registry.npmmirror.com/@lobehub/icons-static-png/1.75.0/files/light/tencentcloud-color.png","descr":"国内知名云服务商","recommend":false},{"name":"阿里云","link":"https://www.aliyun.com/minisite/goods?userCode=oxr4vsrx","avatar":"https://img.alicdn.com/tfs/TB1_ZXuNcfpK1RjSZFOXXa6nFXa-32-32.ico","descr":"新用户优惠折上折！","recommend":false},{"name":"雨云","link":"https://www.rainyun.com/Lorin_","avatar":"https://app.rainyun.com/favicon.ico","descr":"国内新兴云计算服务提供商","recommend":false},{"name":"凌霞软件","link":"https://www.lxware.cn?code=Lorin","avatar":"https://file.lxware.cn/fav-2.png","descr":"国内领先的开源软件公司"},{"name":"Hexo","link":"https://hexo.io/zh-tw/","avatar":"https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg","descr":"快速、简单且强大的网站框架"},{"name":"anzhiyu主题","link":"https://hexo.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/hexo.anheyu.com.jpg"},{"name":"安知鱼","link":"https://hexo.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/hexo.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"安知鱼","link":"https://hexo.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"阿锦在线","link":"https://www.ajinol.com","avatar":"https://www.ajinol.com/upload/logo.png","descr":"记录生活点滴！","recommend":false},{"name":"Anyeの小站","link":"https://www.anye.xyz/","avatar":"https://www.anye.xyz/upload/Anye-logo-white.webp","descr":"Always Nurturing Your Enthusiasm","recommend":false},{"name":"博客星球","link":"https://www.blogplanet.cn","avatar":"https://www.blogplanet.cn/img/bkxq.png","descr":"每一个博客都是一个独立星球！","recommend":false},{"name":"杨杨得亿","link":"https://yangpin.link","avatar":"https://yangpin.link/favicon.ico","descr":"关注：网安，虚拟化，VPN 等相关领域。","recommend":false},{"name":"玖涯博客","link":"https://blog.nineya.com","avatar":"https://blog.nineya.com/favicon.png","descr":"投资未来的人，是忠于现实的人。","recommend":false},{"name":"小小笔记大大用处","link":"https://blog.uptoz.cn","avatar":"https://api.minio.uptoz.cn/blog/images/ED2MIz31Ry.webp","descr":"保持热爱，奔赴山海","recommend":false},{"name":"Mo的记事簿","link":"https://blog.xiowo.net","avatar":"https://blog.xiowo.net/img/avatar.png","descr":"万年鸽王，哈哈OvO","recommend":false},{"name":"Elykia","link":"https://blog.elykia.cn","avatar":"https://bu.dusays.com/2024/10/25/671b2438203a6.gif","descr":"致以无暇之人","siteshot":"https://bu.dusays.com/2024/10/25/671b50dc2dd2b.png","recommend":false},{"name":"咖啡豆子coffee的小站","link":"https://blog.kfdzcoffee.cn","avatar":"https://images.kfdzcoffee.cn/i/1/avatar.png","siteshot":"https://images.kfdzcoffee.cn/i/1/siteshot.jpg","descr":"所有奇迹的始发点","recommend":false},{"name":"逐暗者的麦田","link":"https://www.iasuna.com","avatar":"https://pic.shellingford.cn/i/me/logo.jpg","descr":"一位Java攻城狮的个人博客，主要分享编程、建站、动漫、趣闻和生活内容","recommend":false},{"name":"世界第一可爱","link":"https://www.nahida.cn","avatar":"https://www.nahida.cn/upload/logo.svg","descr":"biu~","recommend":false},{"name":"朽丘秋雨","link":"https://koxiuqiu.cn/","avatar":"https://koxiuqiu.cn/img/avatar/avatar.png","descr":"一定会和喜欢的人在夏日夜晚牵手慢步","recommend":false},{"name":"Mimosa 的小屋","link":"https://loneapex.cn","avatar":"https://loneapex.cn/wp-content/themes/argon/extra-js/favicon.jpg","descr":"含羞草居住的地方","recommend":false},{"name":"陵长镜","link":"https://r1n.top","avatar":"https://r1n.top/avatar_nr.jpg","descr":"Everything collapses, but you rise.","siteshot":"https://r1n.top/siteshot.jpg","recommend":false},{"name":"小慧博客","link":"https://www.itxiaohui.top/","avatar":"https://blogoss.itxiaohui.top/logo%20-uhlgnmrf.png","descr":"小慧的技术博客","siteshot":"https://blogoss.itxiaohui.top/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202025-12-05%20222800-hijtjazu.png","recommend":false},{"name":"qwwp","link":"https://qwwp.top/","avatar":"https://qwwp.top/images/avatar.jpg","descr":"你要吃C4吗？","recommend":false},{"name":"NihaoShow","link":"https://www.nihao.show/","avatar":"https://www.nihao.show/favicon.svg","descr":"一个人的网站","recommend":false},{"name":"小林酱博客","link":"https://blog.zxiaolin.com","avatar":"https://blog.zxiaolin.com/upload/humuziwt.png","descr":"小林酱博客-记录生活，专注于自媒体资源分享","recommend":false}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };