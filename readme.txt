Minus

FirefoxU是一个简洁的定制版，不需要你花更多的时间去设置，尽情享受你的网上冲浪。

配置文件使用和设置方法：
1.下载你所需语言版本的新版Firefox
2.在Firefox Setup （版本号）.exe上右键，使用7z打开
3.进入core目录，ctrl+A全选，并解压到 "D:\Program Files\FirefoxU" 目录，
若无此目录请手动创建。
4.将 FirefoxU.7z 解压到此目录
5.运行FirefoxU.bat，启动
6.若想创建快捷方式，请双击@ShortCut.bat
此步骤会 设置此目录下profile为配置目录，设置完以后可不带参数运行。
并在桌面创建一个FirefoxU的快捷方式

FF默认的配置保存目录：
%AppData%\Mozilla
%USERPROFILE%\AppData\Local\Mozilla

鼠标手势修改详见：
↑ 上 	        转到页面顶部 | 如果当前页面在刷新则停止载入
↓ 下           转到页面底部 | 如果在页面的链接上使用本手势，则在后台打开该链接
← 左 	        后退,超级后退 | 自动翻页上一页  
→ 右 	        前进,超级快进 | 自动翻页下一页

↑↓上-下 	刷新
↑← 上-左 	转到左边标签页
↑→ 上-右 	转到右边标签页

↓↑ 下-上 	隐藏窗口
↓← 下-左 	关闭当前标签
↓→ 下-右 	恢复刚才关闭的标签

←→ 左-右 	打开新标签页   用ie打开
←↑ 左-上 	页面放大
←↓ 左-下 	页面缩小

→← 右-左 	复制当前页面url+标题
→↑ 右-上 	主页
→↓ 右-下 	显示/隐藏书签工具栏

按住右键点左键 	页面缩放重置
点住左键按右键 	转到下个标签页 | 复制选中文本
按住右键向上滚轮 打开任务管理器
按住右键向下滚轮 打开音量控制

↑↓↑上下上 	退出，关闭所有窗口，这些窗口在下次启动时会被恢复
↑←↑上左上    到上一层
↑→↑上右上    强制刷新

↓→↑下右上    重启浏览器


// 文字+上	复制文本
// 文字+下	baidu搜索选中文字(前台)
// 文字+左	Google翻译文本
// 文字+右	Google搜索选中文字(前台)
//
// 链接+上	新标签打开链接(前台)
// 链接+下	新标签打开链接(后台)
// 链接+左	复制链接
// 链接+右	下载链接
//
// 图片+上	复制图片
// 图片+下	下载图片
// 图片+左	搜索相似图片(全部引擎)
// 图片+右	复制图片地址

更改的常用热键设置如下：
CTRL+Z撤销关闭标签页（同opera默认设置），
ALT+P定位到firefox配置文件目录，
ALT+C定位到 chrome脚本目录，
ALT+A附加软件管理器，
ALT+D下载管理器，
f单键快捷键打开查找栏，
c单键快捷键截取网页区域为图片，
ALT+R重启firefox，
1、2数字键切换前后标签页，
z后退，x前进，
方向键->论坛下一页，<-论坛上一页。
单键快捷键必须在鼠标焦点不在文本输入框时才可正常使用。
 
if (location == "chrome://browser/content/browser.xul") {
  userChrome.import("SubScript", "UChrm");
 }

照葫芦画瓢： 
rebuild_userChrome.uc.xul为例，打开脚本找到这里：
          var navBar = document.getElementById("alltabs-button"); //urlbar-icons  status-bar addon-bar searchbar TabsToolbar alltabs-button bookmarks-menu-button
          if (!navBar) return;
          

UserCSSLoader.uc.js 修改方法同上，找到这里进行修改。
        init: function() {
                var navBar = document.getElementById("alltabs-button"); //status-bar  urlbar-icons addon-bar alltabs-button TabsToolbar go-button
                if (!navBar) return;

双引号内的内容替换为“tabs-closebutton”！



现在试过这样才正确：

 omni.ja\chrome\chrome.manifest 替换为官方chrome.manifest
 omni.ja\chrome\ 删除en-US文件夹
 omni.ja\chrome\ 把官方的chrome\zh-CN 文件夹放进来
 omni.ja\chrome.manifest替换为官方chrome.manifest


 browser\omni.ja\chrome\chrome.manifest 替换为官方chrome.manifest
 browser\omni.ja\chrome\ 删除en-US文件夹
 browser\omni.ja\chrome\ 把官方的chrome\zh-CN 文件夹放进来
 browser\omni.ja\chrome.manifest替换为官方chrome.manifest


uc脚本
autoclick:
每次要悬停打开链接,必须先移鼠标到地址栏上一次.
https://g.mozest.com/thread-43522-1-4

autocopy 修改版：
https://g.mozest.com/viewthread.php?tid=42980&page=1#pid299093

griever的UserScriptLoader
https://g.mozest.com/thread-41278-1-1

UserCSSLoader.uc
http://bbs.kafan.cn/thread-1549952-1-1.html

UC脚本-Extension Options Menu.uc.js
http://bbs.kafan.cn/thread-1534385-1-4.html

语法高亮版griever的UserCSSLoader和UserScriptLoader
https://g.mozest.com/thread-41278-1-1

youkuantiads.uc.js
https://j.mozest.com/zh-CN/ucscript/script/92/

uc脚本UA切换修正版
http://bbs.kafan.cn/thread-1534937-1-1.html

显示服务器国旗点击复制ip固定地址栏版
http://bbs.kafan.cn/thread-1494914-1-1.html

snapLinks uc脚本汉化修正版
http://bbs.kafan.cn/thread-1494018-1-1.html

js
NetEase News Comments for Greasemonkey
http://userscripts.org/scripts/show/156627


3rd mod
这是楼主脚本更新地址，可以看到具体什么时候更新的。
https://github.com/lastdream2013/userChrome
https://github.com/Griever/userChromeJS
https://github.com/alice0775/userChrome.js

全脚本极速火狐
http://bbs.kafan.cn/thread-1477995-1-1.html
http://pan.baidu.com/share/link?shareid=335007&uk=406074541

其他优秀资源:
search_enginejump 简单修改版 130104
http://bbs.kafan.cn/thread-1393405-1-4.html

教程:
uc脚本常见问题总结
http://bbs.kafan.cn/thread-1527234-1-3.html

火狐/Firefox字体界面显示及相关设置说明（Windows平台）
http://bbs.kafan.cn/thread-1528636-1-2.html

从20.0.4841起默认不需再修改的优化参数备份：
//pref("javascript.options.mem.gc_per_compartment", true);
//pref("javascript.options.mem.high_water_mark", 64);
//pref("javascript.options.mem.max", -1);
//pref("javascript.options.gc_on_memory_pressure", true);
//pref("javascript.options.mem.disable_explicit_compartment_gc", true);
//Set max script runtimes to sane values
//pref("dom.max_chrome_script_run_time", 90); //Some addons need ample time!
//pref("dom.max_script_run_time", 20); //Should be plenty for a page script to do what it needs
//pref("browser.sessionstore.privacy_level",1); //会话保存哪些内容？1 不保存加密站点的会话（填表内容等）
//pref("browser.cache.memory.enable", true);
//pref("browser.cache.disk.max_entry_size",4096);//最大磁盘缓存元素大小？暗月设为4MB，任何大于4MB的元素都不建议缓存
//pref("browser.cache.disk.smart_size.enabled",false);//关闭缓存自动管理
pref("dom.ipc.plugins.enabled", true); // 开启”插件容器”plugin-container，防止插件崩溃.设成否会导至工行网行挂死（ua需要设成firefox10）
pref("browser.urlbar.autoFill.typed", true);
pref("browser.urlbar.autoFill", true);
pref("network.dns.disableIPv6", false); //开启ipv6
pref("network.http.max-persistent-connections-per-server", 6);
pref("network.http.proxy.pipelining", false); // 代理流水线- 会造成一些代理失败 (406)
pref("browser.download.manager.showWhenStarting", true);
pref("plugin.scan.plid.all", false);  //禁止FF加载时定位大部分注册表中的插件的路径
user_pref("browser.preferences.animateFadeIn", false);
user_pref("browser.search.openintab", true);
pref("pdfjs.disabled", true);
pref("javascript.options.mem.gc_incremental",true);
pref("image.mem.max_decoded_image_kb", 256000);
pref("network.dnsCacheExpiration", 1800); //TTL 1 hour
pref("network.dnsCacheEntries", 512); //这二个有争议，改这么大是否会有影响 cache 1024 instead of 20

我认为不重要的参数：
pref("network.http.max-connections",64); // 不要最大化网络层，以保证家庭网络和无线网络! (FF=256)
pref("network.http.max-persistent-connections-per-proxy", 8);
pref("browser.cache.memory.capacity",-1); //按需动态分配内存缓存
pref("browser.cache.memory.max_entry_size",-1); 
pref("network.http.pipelining.maxrequests", 12);  // 最大流水线请求数
//pref("general.useragent.override", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4; rv:20.0.1) Gecko/20130409194949 Firefox/20.0.1");
pref("extensions.update.autoUpdateDefault", false);//让用户选择扩展更新
pref("image.cache.size", 256000);
pref("browser.sessionstore.privacy_level",1);
pref("browser.urlbar.trimURLs", false); //stop being a derp, Mozilla!不要被误导～
user_pref("extensions.autoDisableScopes", 0);

无效或默认不自带的参数：
pref("network.http.max-connections-per-server",16); // 使用了流水线，这个值应该小一点儿 (FF=15)
user_pref("microsoft.CLR.auto_install", false);
user_pref("security.warn_entering_weak",false);
user_pref("security.warn_viewing_mixed",false);
user_pref("browser.tabs.showSingleWindowModePrefs", true);
user_pref("browser.warnOnRestart", false);
user_pref("toolkit.telemetry.rejected", true);
user_pref("toolkit.telemetry.prompted", 2);
//渲染优化
pref("content.interrupt.parsing", true); 
pref("content.switch.threshold", 500000); 
pref("content.notify.ontimer", true);

Presetup=%SystemRoot%\system32\taskkill.exe /F /IM firefox.exe
;Presetup=Firefox\rar.exe a -m5 -idq -r -ed -ep1 -x*.mfl -x*.dat -x*\*cache* -x*\*safebrowsing* -x*\*bak* -x*\*jetpack* -x*\*bookmarkbackups* -x*.bak -xpatterns-*.ini -xcompatibility.ini -xparent.lock -ag[YYYY-MM-DD,hh-mm-ss] Firefox\profilebackup.rar Firefox\profile\
Update=U
Path=D:\Program Files\Firefox
SavePath
Setup=DeskLnk.vbs
Overwrite=1
Title=Mozilla Firefox-SimpleU
Text
{
Clean Simple Useful
}
License=注意！
{
安装程序即将终止Firezfox，
请尽量放至到 D:\Program Files\Firefox 文件夹
}
;Shortcut=D, "Firefox\firefox.exe -profile profile -no-remote", "", "Mozilla Firefox", "Mozilla Firefox", "Firefox\Firefox.exe"
