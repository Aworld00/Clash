function main(config) {

  // 代理组通用配置（统一检测参数）
  const groupBaseOption = {
    "interval": 180,          // 3分钟检测一次延迟
    "timeout": 3000,          // 超时时间3秒
    "url": "https://www.google.com/generate_204",  // 更稳定的检测地址
    "lazy": true,             // 延迟加载（减少启动耗时）
    "max-failed-times": 3,    // 失败3次后标记不可用
    "hidden": false,//隐藏节点组不再页面显示；true是隐藏，false是显示
  };

  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "✈️开启代理",
      "type": "select",
      "proxies": ["DIRECT", "🇭🇰香港测速⚡", "🇨🇳台湾测速⚡", "🇯🇵日本测速⚡", "🇰🇷韩国测速⚡", "🇺🇸美国测速⚡", "🇸🇬新加坡测速⚡", "👋避免香港IP检测", "💈负载均衡💈"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Airport.png"
    },
    {
      ...groupBaseOption,
      "name": "🗽美国专用",
      "type": "select",
      "hidden": false,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "include-all": true,        // 自动包含你订阅里的所有节点
      "filter": "(?i)^(?=.*(?:US|us|🇺🇸|America|美国))(?!.*(?:倍|流量|x)).*$",
      "proxies": ["🀄关闭代理", "🇺🇸美国测速⚡", "✈️开启代理"],
      "icon": "https://raw.githubusercontent.com/Aworld00/Clash/refs/heads/main/Icon/America.png"
    },
    {
      ...groupBaseOption,
      "name": "🆎广告拦截",
      "type": "select",
      "hidden": false,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "proxies": ["REJECT", "🀄关闭代理"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/adguard.png"
    },
    {
      ...groupBaseOption,
      "name": "⚠️隐私保护",
      "type": "select",
      "hidden": false,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "proxies": ["REJECT", "🀄关闭代理"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Ip.png"
    },
    {
      ...groupBaseOption,
      "name": "🀄关闭代理",
      "type": "select",
      "proxies": ["DIRECT", "✈️开启代理"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/China.png"
    },
    {
      ...groupBaseOption,
      "name": "🏊番剧出差",
      "type": "select",
      "proxies": ["🀄关闭代理", "🇭🇰香港测速⚡", "🇨🇳台湾测速⚡"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/bilibili.png"
    },
    {
      ...groupBaseOption,
      "name": "🧸国内_Game",
      "type": "select",
      "proxies": ["🀄关闭代理", "✈️开启代理"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Game.png"
    },
    {
      ...groupBaseOption,
      "name": "🎮国外_Game",
      "type": "select",
      "proxies": ["🀄关闭代理", "✈️开启代理", "🇭🇰香港测速⚡", "🇸🇬新加坡测速⚡"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Steam.png"
    },
    {
      ...groupBaseOption,
      "name": "🌍国外网站",
      "type": "select",
      "include-all": true,// 打开自动包含所有节点
      "filter": "(?i)^(?!.*(?:HK|hk|🇭🇰|hongkong|港|CN|🇨🇳|tw|🇹🇼|台湾|JP|jp|🇯🇵|Japan|日本|KR|kr|🇰🇷|korea|韩国|US|us|🇺🇸|America|美国|SG|sg|🇸🇬|singapore|新加坡|🏷|t\\.me)).*",
      //排除香港，新加坡，台湾，日本，韩国，美国的节点
      "proxies": ["✈️开启代理", "🀄关闭代理", "💈负载均衡💈"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/GitHub.png"
    },
    {
      ...groupBaseOption,
      "name": "🐟️黑白名单",
      "type": "select",
      "proxies": ["✈️开启代理", "🀄关闭代理", "🇭🇰香港测速⚡", "👋避免香港IP检测"],
      "icon": "https://github.com/Aworld00/Clash_Parsers/raw/master/Icon/Select.png"
    },
    // 2. 自动选择代理组（隐藏，仅用于分流）
    {
      ...groupBaseOption,
      "name": "🇭🇰香港测速⚡", //延迟选优
      "type": "url-test",
      "hidden": true,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "include-all": true,// 打开自动包含所有节点
      "filter": "(?i)^(?=.*(?:HK|hk|🇭🇰|hongkong|港))(?!.*(?:倍|流量|x)).*$"//仅保留香港节点的同时，但又移除倍率节点
      // (?=.*(?:🇭🇰|港|hk|hongkong))：正向预查，确保节点名称包含香港相关关键词
      // (?!.*(?:高倍率|...|plus))：负向预查，排除包含倍率相关关键词的节点
      // 2x|3x|4x|5x：直接匹配常见倍率（2 倍、3 倍等）
      // \\dx：匹配任意数字倍率（如 1x、6x、10x 等）
      // premium|pro|elite|vip|ultra|max|plus：排除高级 / 付费节点
      // 只筛选包含相关关键词的节点
      //功能：定期测试节点延迟，自动选择延迟最低的节点。
      //适用场景：需要稳定低延迟的场景（如游戏、视频会议）。
    },
    {
      ...groupBaseOption,
      "name": "🇨🇳台湾测速⚡", //延迟选优
      "type": "url-test",
      "hidden": true,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "include-all": true,// 打开自动包含所有节点
      "filter": "(?i)^(?=.*(?:CN|🇨🇳|tw|🇹🇼|台湾))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵日本测速⚡", //延迟选优
      "type": "url-test",
      "hidden": true,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "include-all": true,// 打开自动包含所有节点
      "filter": "(?i)^(?=.*(?:JP|jp|🇯🇵|Japan|日本))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇰🇷韩国测速⚡", //延迟选优
      "type": "url-test",
      "hidden": true,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "include-all": true,// 打开自动包含所有节点
      "filter": "(?i)^(?=.*(?:KR|kr|🇰🇷|korea|韩国))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸美国测速⚡", //延迟选优
      "type": "url-test",
      "hidden": true,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "include-all": true,// 打开自动包含所有节点
      "filter": "(?i)^(?=.*(?:US|us|🇺🇸|America|美国))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "🇸🇬新加坡测速⚡", ////延迟选优
      "type": "url-test",
      "hidden": true,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "include-all": true,// 打开自动包含所有节点
      "filter": "(?i)^(?=.*(?:SG|sg|🇸🇬|singapore|新加坡))(?!.*(?:倍|流量|x)).*$"
    },
    {
      ...groupBaseOption,
      "name": "💈负载均衡💈", //负载均衡 (轮询) 
      "type": "load-balance",
      "strategy": "round-robin",
      "hidden": true,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "include-all": false,// 打开自动包含所有节点
      "proxies": ["🇸🇬新加坡测速⚡", "🇰🇷韩国测速⚡", "🇯🇵日本测速⚡", "🇨🇳台湾测速⚡"],
      //功能：按顺序轮流使用节点，平均分配流量。
      //适用场景：需要分散流量、避免单节点过载的场景（如多设备共享代理）。
    },
    {
      ...groupBaseOption,
      "name": "👋避免香港IP检测", //负载均衡 (散列)
      "type": "load-balance",
      "strategy": "consistent-hashing",// 基于IP哈希
      "hidden": true,//隐藏节点组不再页面显示；true是隐藏，false是显示
      "include-all": false,// 打开自动包含所有节点
      "proxies": ["🇭🇰香港测速⚡"],
      //功能：散列方式会将同一个域名的请求全部分到同一个节点，从而实现按域名进行节点分流的效果。
      //适用场景：需要稳定低延迟的场景（如游戏、视频会议）。
      //此种方式适用于风控较强的场景，避免被网站检查到不同区域IP登录。
    },
  ];

  // 规则集通用配置（统一更新频率与格式）
  const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400,  // 24小时更新一次（平衡时效性与资源消耗）
    "user-agent": "Clash/1.17.0"  // 模拟合法请求头，避免被拦截
  };

  // 规则集配置
  const ruleProviders = {
    //"behavior": "domain","ipcidr","classical"
    //domain	仅域名（DOMAIN-SUFFIX 为主）	直接填写域名（无前缀）	纯域名规则管理	简化配置，专注域名匹配
    //ipcidr	仅 IP 段（IP-CIDR/IP-CIDR6）	直接填写 IP 段（无前缀）	纯 IP 规则管理	简洁高效，专注 IP 匹配
    //classical	所有 Clash 规则（混合类型）	需完整规则语法（带前缀）	复杂混合规则管理	灵活全面，支持多条件匹配
    //若规则集仅含 IP 段 → 选 ipcidr，减少冗余语法，提升匹配效率。
    //若规则集仅含域名 → 选 domain，简化配置，专注域名过滤。
    //若规则集含多种类型（域名 + IP + 地域等） → 选 classical，支持复杂逻辑。


    //loyalsoldier_规则
    //广告
    "reject": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
      "path": "./ruleset/loyalsoldier/reject.yaml"
    },
    //下载软件
    "applications": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
      "path": "./ruleset/loyalsoldier/applications.yaml"
    },
    //基础GFW
    "GFW": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
      "path": "./ruleset/loyalsoldier/GFW.yaml"
    },
    //基础Proxy
    "Proxy": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
      "path": "./ruleset/loyalsoldier/Proxy.yaml"
    },
    //国内外选择（国内直连）
    "tld-not-cn": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
      "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
    },
    //电报ip
    "telegramcidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
      "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
    },
    //国内ip
    "cncidr": {
      ...ruleProviderCommon,
      "behavior": "ipcidr",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
      "path": "./ruleset/loyalsoldier/cncidr.yaml"
    },
    //国内域名
    "direct": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
      "path": "./ruleset/loyalsoldier/direct.yaml"
    },
    //blackmatrix7_规则
    //隐私保护
    "Privacy": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Privacy/Privacy_Classical.yaml",
      "path": "./ruleset/blackmatrix7/Privacy.yaml"
    },
    //游戏		
    "Game": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Game/Game.yaml",
      "path": "./ruleset/blackmatrix7/Game.yaml"
    },
    "SteamCN": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/SteamCN/SteamCN.yaml",
      "path": "./ruleset/blackmatrix7/SteamCN.yaml"
    },
    "Epic": {
      ...ruleProviderCommon,
      "behavior": "domain",
      "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Epic/Epic.yaml",
      "path": "./ruleset/blackmatrix7/Epic.yaml"
    },
    //ACL4SSR_规则
    //B站港澳台
    "BilibiliHMT": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://fastly.jsdelivr.net/gh/Aworld00/ACL4SSR@master/Clash/Providers/Ruleset/BilibiliHMT.yaml",
      "path": "./ruleset/ACL4SSR/BilibiliHMT.yaml"
    },
    //LAN局域网
    "LAN": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://cdn.jsdelivr.net/gh/Aworld00/ACL4SSR@refs/heads/master/Clash/Providers/LocalAreaNetwork.yaml",
      "path": "./ruleset/ACL4SSR/LAN.yaml"
    },
    //Lovedeath_规则
    //CN规则
    "Baa_CN": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/Aworld00/Clash_Parsers/refs/heads/master/Rules/Baa_CN.yaml",
      "path": "./ruleset/Lovedeath/Baa_CN.yaml"
    },
    //Plus
    "Baa_Agent": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/Aworld00/Clash/refs/heads/main/Rules/Baa_Agent.yaml",
      "path": "./ruleset/Lovedeath/Baa_Agent.yaml"
    },
    //USA
    "Baa_USA": {
      ...ruleProviderCommon,
      "behavior": "classical",
      "url": "https://raw.githubusercontent.com/Aworld00/Clash/refs/heads/main/Rules/Baa_USA.yaml",
      "path": "./ruleset/Lovedeath/Baa_USA.yaml"
    },
  };

  // 规则列表（按优先级排序，添加分组注释）
  const rules = [
    // 自定义规则
    //规则由上往下遍历，如上面规则已经命中，则不再往下处理
    // 下载规则
    "DOMAIN-SUFFIX,raw.githubusercontent.com,✈️开启代理",

    // ACL4SSR 规则集
    "RULE-SET,BilibiliHMT,🏊番剧出差",

    // blackmatrix7 规则集
    "RULE-SET,Privacy,⚠️隐私保护",
    "RULE-SET,SteamCN,🧸国内_Game",
    "RULE-SET,Epic,🧸国内_Game",
    "RULE-SET,Game,🎮国外_Game",

    // Lovedeath 规则集
    "RULE-SET,Baa_CN,🀄关闭代理,no-resolve",
    "RULE-SET,Baa_Agent,🌍国外网站",
    "RULE-SET,Baa_USA,🗽美国专用",

    // Loyalsoldier 规则集
    "RULE-SET,reject,🆎广告拦截",
    "RULE-SET,applications,🀄关闭代理,no-resolve",
    "RULE-SET,GFW,✈️开启代理",
    "RULE-SET,Proxy,✈️开启代理",
    "RULE-SET,telegramcidr,✈️开启代理",
    "RULE-SET,cncidr,🀄关闭代理,no-resolve",
    "RULE-SET,direct,🀄关闭代理,no-resolve",
    "RULE-SET,tld-not-cn,🀄关闭代理,no-resolve",

    // ACL4SSR 规则集
    "GEOIP,LAN,🀄关闭代理,no-resolve",

    // 其他规则
    "GEOSITE,CN,🀄关闭代理,no-resolve",
    "GEOIP,CN,🀄关闭代理,no-resolve",
    "MATCH,🐟️黑白名单"//⭐️⭐️规则之外的，在这里来修改是✈️开启代理，还是🀄关闭代理
  ];
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  return config;
}
