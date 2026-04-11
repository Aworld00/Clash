# 预防老年痴呆
### Clash Party效果图
![](https://github.com/Aworld00/Clash/blob/main/Image/%E6%95%88%E6%9E%9C%E5%9B%BE.png)
#### 规则地址

Baa_CN直连<br>
https://raw.githubusercontent.com/Aworld00/Clash/refs/heads/main/Rules/Baa_CN.yaml
https://cdn.jsdelivr.net/gh/Aworld00/Clash@refs/heads/main/Rules/Baa_CN.yaml

Baa_Agent代理<br>
https://raw.githubusercontent.com/Aworld00/Clash/refs/heads/main/Rules/Baa_Agent.yaml
https://cdn.jsdelivr.net/gh/Aworld00/Clash@refs/heads/main/Rules/Baa_Agent.yaml

Baa_USA（美区系列）<br>
https://raw.githubusercontent.com/Aworld00/Clash/refs/heads/main/Rules/Baa_USA.yaml
https://cdn.jsdelivr.net/gh/Aworld00/Clash@refs/heads/main/Rules/Baa_USA.yaml

#### 规则写法
##### DOMAIN - 完整域名匹配
```
- DOMAIN,google.com,代理策略
- DOMAIN,baidu.com,DIRECT
```
##### DOMAIN-SUFFIX - 域名后缀匹配
- DOMAIN-SUFFIX,google.com,代理策略  # 匹配 *.google.com
- DOMAIN-SUFFIX,cn,DIRECT           # 匹配所有 .cn 域名
##### DOMAIN-KEYWORD - 域名关键词匹配
- DOMAIN-KEYWORD,google,代理策略     # 匹配包含 google 的域名
- DOMAIN-KEYWORD,ads,REJECT         # 阻断包含 ads 的域名
##### GEOSITE - 地理站点匹配
- GEOSITE,youtube,代理策略           # YouTube 相关域名
- GEOSITE,cn,DIRECT                 # 中国大陆网站
- GEOSITE,category-ads-all,REJECT   # 广告域名
#### IP 规则
##### IP-CIDR - IP 地址段匹配
- IP-CIDR,192.168.0.0/16,DIRECT     # 局域网直连
- IP-CIDR,10.0.0.0/8,DIRECT         # 私有网络
##### GEOIP - 地理 IP 匹配
- GEOIP,CN,DIRECT                   # 中国 IP 直连
- GEOIP,US,代理策略                  # 美国 IP 走代理
#### 端口规则
##### DST-PORT - 目标端口匹配
- DST-PORT,22,DIRECT                # SSH 端口直连
- DST-PORT,80/443,代理策略           # HTTP/HTTPS 端口
#### 应用规则
##### PROCESS-NAME - 进程名匹配
- PROCESS-NAME,Telegram.exe,代理策略  # Telegram 走代理
- PROCESS-NAME,WeChat.exe,DIRECT     # 微信直连
#### 逻辑规则 
##### AND - 多条件同时满足
- AND,((DOMAIN-SUFFIX,youtube.com),(GEOIP,!CN)),代理策略
##### OR - 多条件满足其一
- OR,((DOMAIN-KEYWORD,google),(DOMAIN-KEYWORD,youtube)),代理策略
#### 通用规则
##### MATCH - 兜底规则（必须放在最后）
- MATCH,代理策略                     # 其他所有流量的默认策略
#### 代理策略选择
在规则中指定的 "代理策略" 需要选择您配置的节点分组：
DIRECT - 直连，不使用代理
REJECT - 阻断连接
代理组名称 - 如 🚀 手动切换、🎯 全球直连 等
#### 规则插入位置
规则可以插入到 "前置规则" 或 "后置规则"：
 - 前置规则：优先级最高，建议将自定义规则放在此处
 - 后置规则：在订阅规则之后生效
推荐使用前置规则，因为规则按从上到下的顺序匹配，前置规则能确保您的自定义配置优先生效。
#### 常用配置示例
##### 广告屏蔽
- GEOSITE,category-ads-all,REJECT
- DOMAIN-KEYWORD,ads,REJECT
- DOMAIN-KEYWORD,tracker,REJECT
##### 国内网站直连
- GEOSITE,cn,DIRECT
- GEOIP,CN,DIRECT
- DOMAIN-SUFFIX,cn,DIRECT
##### 流媒体分流
- GEOSITE,netflix,🎬 流媒体
- GEOSITE,youtube,📹 YouTube
- GEOSITE,disney,🏰 Disney+
##### 应用分流
- PROCESS-NAME,Telegram.exe,📱 Telegram
- PROCESS-NAME,steam.exe,🎮 游戏加速
- PROCESS-NAME,WeChat.exe,DIRECT
##### 注意事项
1.规则顺序很重要 - 规则按从上到下匹配，越靠前优先级越高
2.测试规则效果 - 配置后建议测试访问对应网站确认规则生效
3.定期更新规则 - 网站域名可能变化，需要适时调整规则
4.避免规则冲突 - 确保规则逻辑清晰，避免前后矛盾


#### 一些图标
| 图标 | 图标 | 图标 | 图标 | 图标 | 图标 |
|------|------|------|------|------|------|
| <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Adblock.png" width="100" height="100" alt="Adblock"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Airport.png" width="100" height="100" alt="Airport"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/America.png" width="100" height="100" alt="America"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Auto.png" width="100" height="100" alt="Auto"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Balance.png" width="100" height="100" alt="Balance"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Catnet.png" width="100" height="100" alt="Catnet"> |
| <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/China.png" width="100" height="100" alt="China"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Fallback.png" width="100" height="100" alt="Fallback"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Final.png" width="100" height="100" alt="Final"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Game.png" width="100" height="100" alt="Game"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Game_2.png" width="100" height="100" alt="Game_2"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/GitHub.png" width="100" height="100" alt="GitHub"> |
| <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Global.png" width="100" height="100" alt="Global"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Global_2.png" width="100" height="100" alt="Global_2"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Google.png" width="100" height="100" alt="Google"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Hong_Kong.png" width="100" height="100" alt="Hong_Kong"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Ip.png" width="100" height="100" alt="Ip"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Ip_2.png" width="100" height="100" alt="Ip_2"> |
| <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Match.png" width="100" height="100" alt="Match"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Reject.png" width="100" height="100" alt="Reject"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/SSID.png" width="100" height="100" alt="SSID"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Select.png" width="100" height="100" alt="Select"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Shadowrocket.png" width="100" height="100" alt="Shadowrocket"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Singapore.png" width="100" height="100" alt="Singapore"> |
| <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Steam.png" width="100" height="100" alt="Steam"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/TaiWan.png" width="100" height="100" alt="TaiWan"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/YouTube.png" width="100" height="100" alt="YouTube"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/adguard.png" width="100" height="100" alt="adguard"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/bilibili.png" width="100" height="100" alt="bilibili"> | <img src="https://github.com/Aworld00/Clash_Parsers/blob/master/Icon/Telegram.png" width="100" height="100" alt="Telegram"> |
