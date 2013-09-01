# SimpleU User Preferences File
# Arrange & Choice: Kwok
# 17:36 2013/8/24
# pref(key,value) 会覆盖默认设置,在删除之后会恢复默认设置.

//extensions
pref("UserCSSLoader.disabled_list", "Ad_glob.css|BBS.css|BBSStyle.css|CleanClear.css|Gray.css|Green.css|Hover Cursor.css|Night.css||Visited.css|地址栏背景.css|自动隐藏书签栏.css");
pref("capability.policy.maonoscript.sites", "115img.com 163.com 360.cn addons.mozilla.org afx.ms apps.microsoft.com aspnetcdn.com bbs.kafan.cn bdimg.com bdstatic.com bing.com.cn bitdefender.com cmfu.com comsome.com douban.com fastly.net feedly.com firstdata.com firstdata.lv flashgot.net gfx.ms google.com googleapis.com gstatic.com gtimg.cn hotmail.com ifeng.com ifengimg.com ikafan.com informaction.com kuaipan.cn live.com live.net maone.net microsofttranslator.com mozest.com mozilla.net msn.com netease.com noscript.net outlook.com passport.com passport.net passportimages.com paypal.com paypalobjects.com persona.org qhimg.com qidian.com qq.com securecode.com securesuite.net sfx.ms soku.com wlxrs.com yahoo.com yahooapis.com yimg.com ykimg.com youku.com youtube.com ytimg.com about: about:addons about:blank about:blocked about:certerror about:config about:crashes about:home about:memory about:neterror about:plugins about:privatebrowsing about:sessionrestore about:support blob: chrome: http://115img.com http://163.com http://360.cn http://afx.ms http://aspnetcdn.com http://bdimg.com http://bdstatic.com http://bitdefender.com http://cmfu.com http://comsome.com http://douban.com http://fastly.net http://feedly.com http://firstdata.com http://firstdata.lv http://flashgot.net http://gfx.ms http://google.com http://googleapis.com http://gstatic.com http://gtimg.cn http://hotmail.com http://ifeng.com http://ifengimg.com http://ikafan.com http://informaction.com http://kuaipan.cn http://live.com http://live.net http://maone.net http://microsofttranslator.com http://mozest.com http://mozilla.net http://msn.com http://netease.com http://noscript.net http://outlook.com http://passport.com http://passport.net http://passportimages.com http://paypal.com http://paypalobjects.com http://persona.org http://qhimg.com http://qidian.com http://qq.com http://securecode.com http://securesuite.net http://sfx.ms http://soku.com http://wlxrs.com http://yahoo.com http://yahooapis.com http://yimg.com http://ykimg.com http://youku.com http://youtube.com http://ytimg.com https://115img.com https://163.com https://360.cn https://afx.ms https://aspnetcdn.com https://bdimg.com https://bdstatic.com https://bitdefender.com https://cmfu.com https://comsome.com https://douban.com https://fastly.net https://feedly.com https://firstdata.com https://firstdata.lv https://flashgot.net https://gfx.ms https://google.com https://googleapis.com https://gstatic.com https://gtimg.cn https://hotmail.com https://ifeng.com https://ifengimg.com https://ikafan.com https://informaction.com https://kuaipan.cn https://live.com https://live.net https://maone.net https://microsofttranslator.com https://mozest.com https://mozilla.net https://msn.com https://netease.com https://noscript.net https://outlook.com https://passport.com https://passport.net https://passportimages.com https://paypal.com https://paypalobjects.com https://persona.org https://qhimg.com https://qidian.com https://qq.com https://securecode.com https://securesuite.net https://sfx.ms https://soku.com https://wlxrs.com https://yahoo.com https://yahooapis.com https://yimg.com https://ykimg.com https://youku.com https://youtube.com https://ytimg.com resource:");
pref("capability.policy.maonoscript.javascript.enabled", "allAccess");
pref("extensions.adblockplus.hideContributeButton", true);
pref("extensions.adblockplus.patternsbackupinterval", 0);
pref("extensions.adblockplus.patternsbackups", 0);
pref("extensions.fireie.autoswitch_enabled", false);
pref("extensions.fctlite.showContext", true);
pref("extensions.lastpass.Icon", 0);
pref("extensions.lastpass.hidecontextmenu", true);
pref("noscript.ABE.migration", 1);
pref("noscript.autoAllow", 2);
pref("noscript.confirmUnblock", false);
pref("noscript.ctxMenu", false);
//override
pref("general.useragent.override.www.videozaixian.com", "Mozilla/5.0 (LETVC1;iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/535.35 (KHTML, like Gecko)");
pref("general.useragent.override.vod.kankan.com", "Opera/9.80 (Windows NT 6.1; Win64; x64; SimpleU Edition) Presto/2.12.388 Version/12.16");
pref("general.useragent.override.movie.douban.com", "Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25");
pref("general.useragent.override.b2c1.icbc.com.cn", "Mozilla/5.0 (Windows NT 6.1; rv:10.0.6) Gecko/20120716 Firefox/10.0.6");
pref("general.useragent.override.mybank.icbc.com.cn", "Mozilla/5.0 (Windows NT 6.1; rv:10.0.6) Gecko/20120716 Firefox/10.0.6");
pref("general.useragent.override.mybank1.icbc.com.cn", "Mozilla/5.0 (Windows NT 6.1; rv:10.0.6) Gecko/20120716 Firefox/10.0.6");
pref("general.useragent.override.www.icbc.com.cn", "Mozilla/5.0 (Windows NT 6.1; rv:10.0.6) Gecko/20120716 Firefox/10.0.6");
//settings
//关闭“选项”菜单滑动效果
user_pref("browser.preferences.animateFadeIn", false);
//关闭烦人提示
user_pref("security.warn_entering_weak", false);
user_pref("security.warn_viewing_mixed", false);
user_pref("xpinstall.whitelist.required", false);
user_pref("browser.rights.3.shown", true);
user_pref("browser.syncPromoViewsLeftMap", "{\"bookmarks\":0}");
//关闭自动更新
user_pref("app.update.auto", false);
user_pref("app.update.enabled", false);
pref("app.update.disable_button.showUpdateHistory", false);
pref("app.update.service.enabled", false);
//缓存设置为50M
user_pref("browser.cache.disk.capacity", 51200);
user_pref("browser.cache.disk.smart_size.enabled", false);
user_pref("browser.cache.disk.smart_size.first_run", false);
//快速拨号设置
user_pref("browser.newtabpage.columns", 4);
user_pref("browser.newtabpage.pinned", "[{\"url\":\"http://bbs.tianya.cn/\",\"title\":\"天涯论坛\"},{\"url\":\"http://weibo.com/\",\"title\":\"新浪微博\"},{\"url\":\"http://www.renren.com/\",\"title\":\"人人网\"},{\"url\":\"http://www.douban.com/\",\"title\":\"豆瓣\"},{\"url\":\"http://dzh.mop.com/\",\"title\":\"Mop大杂烩\"},{\"url\":\"http://v.360.cn/\",\"title\":\"在线电影\"},{\"url\":\"http://www.bbgyy.net/\",\"title\":\"步步高影院\"},{\"url\":\"http://www.yyets.com/\",\"title\":\"YYeTs人人影视\"},{\"url\":\"http://www.youku.com/\",\"title\":\"优酷视频\"},{\"url\":\"http://www.fengniao.com/\",\"title\":\"蜂鸟网\"},{\"url\":\"http://news.163.com/\",\"title\":\"网易新闻\"},{\"url\":\"http://www.taobao.com/\",\"title\":\"淘宝网\"},{\"url\":\"http://cnbeta.com/\",\"title\":\"cnBeta.COM\"},{\"url\":\"http://bbs.kafan.cn/forum-215-1.html\",\"title\":\"卡饭论坛\"},{\"url\":\"http://yingzheng.com/forum.php?mod=forumdisplay&fid=10\",\"title\":\"赢政天下\"},{\"url\":\"http://www.downg.com/\",\"title\":\"绿软家园\"},null]");
user_pref("browser.newtabpage.rows", 4);
//主页设置
user_pref("browser.startup.homepage", "http://hao.360.cn");
//关闭攻击站点报告
user_pref("browser.safebrowsing.enabled", false);
user_pref("browser.safebrowsing.malware.enabled", false);
//关闭搜索引擎自动更新
user_pref("browser.search.update", false);
//即时查找输入的文本
pref("WordHighlightToolbar.GET_KEYWORD", true);
user_pref("accessibility.typeaheadfind", true);
//关闭输入检查拼写
user_pref("layout.spellcheckDefault", 0);
//关闭检查默认浏览器
user_pref("browser.shell.checkDefaultBrowser", false);
//关闭标签和窗口不提示
user_pref("browser.tabs.warnOnClose", false);
user_pref("browser.tabs.warnOnCloseOtherTabs", false);
user_pref("browser.warnOnQuit", false);
//关闭“AboutConfig”警告
user_pref("general.warnOnAboutConfig", false);
//外部程序调用浏览器时 0,默认窗口/ 1,当前窗口或标签/ 2, 新窗口/3, 新标签
pref("browser.link.open_external", 3);
//Proxy
user_pref("network.proxy.type", 2);
//禁HealthReport
user_pref("datareporting.healthreport.logging.consoleEnabled", false);
user_pref("datareporting.healthreport.pendingDeleteRemoteData", true);
user_pref("datareporting.healthreport.service.enabled", false);
user_pref("datareporting.healthreport.service.firstRun", false);
user_pref("datareporting.healthreport.service.firstRun", true);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("datareporting.policy.dataSubmissionEnabled", false);
//书签生成html
pref("browser.bookmarks.autoExportHTML", true);
//自动备份书签,最大为3
pref("browser.bookmarks.max_backups", 3);
//安全模式时恢复默认书签
pref("browser.bookmarks.restore_default_bookmarks", false);
//关闭下载后提示
pref("browser.download.manager.closeWhenDone", true);
//禁用下载文件扫描
pref("browser.download.manager.scanWhenDone", false);
//下载完成提示
pref("browser.download.manager.showAlertOnComplete", true);
//设置历史记录天数为30天
pref("browser.history_expire_days", 30);
//设置历史记录站点数为1000
pref("browser.history_expire_sites", 1000);
//链接打开方式
pref("browser.link.open_newwindow", 1);
//在新标签搜索
pref("browser.search.openintab", true);
//JS链接打开方式
pref("browser.link.open_newwindow.restriction", 0);
//已关闭标签数
pref("browser.sessionhistory.max_total_viewers", 5);
//降低会话保存频率，降低内存消耗 每一分钟（默认每10秒）
pref("browser.sessionstore.interval",60000);
//禁用标签动画效果
pref("browser.tabs.animate", false);
//显示上次打开的窗口和标签页
user_pref("browser.startup.page", 3);
//0 - 仅在活动的标签页上显示关闭按钮
pref("browser.tabs.closeButtons", 0);
//关闭最后一个标签不关闭窗口
pref("browser.tabs.closeWindowWithLastTab", false);
pref("browser.tabs.loadBookmarksInBackground", true);
pref("browser.tabs.warnOnOpen", false);
//关闭JumpList特性
pref("browser.taskbar.lists.enabled",false);
//关闭标签预览
pref("browser.taskbar.previews.enable", false);
//单击地址栏全选
pref("browser.urlbar.clickSelectsAll", true);
//地址栏自动补全的延迟为0
pref("browser.urlbar.delay", 0);
//双击地址栏不全选
pref("browser.urlbar.doubleClickSelectsAll", false);
//地址栏自动补全列表扩展为20
pref("browser.urlbar.maxRichResults",20);
//地址栏显示 http://
pref("browser.urlbar.trimURLs", false);
//自动展开：此连接是不受信任的
pref("browser.xul.error_pages.expert_bad_cert", true);
//插件防崩溃
pref("dom.ipc.plugins.enabled", true);
pref("dom.ipc.plugins.timeoutSecs", 7);
pref("dom.max_chrome_script_run_time", 90);
pref("dom.max_script_run_time", 20);
//插件最大连续弹窗次数设为3
pref("dom.popup_maximum", 3);
//关闭启动时插件检查窗口
user_pref("extensions.blocklist.enabled", false);
//不根据版本检测扩展兼容性
user_pref("extensions.checkCompatibility", false);
//扩展页面扩展不下载自动推荐内容
user_pref("extensions.autoDisableScopes", 0);
user_pref("extensions.getAddons.cache.enabled", false);
user_pref("extensions.update.autoUpdateDefault", false);
user_pref("extensions.update.enabled",false);
//最小字体12号
pref("font.minimum-size.zh-CN", 12);
pref("font.minimum-size.zh-HK", 12);
pref("font.minimum-size.zh-TW", 12);
//平滑滚动
pref("general.smoothScroll.mouseWheel.durationMaxMS", 500);
pref("general.smoothScroll.mouseWheel.durationMinMS", 180);
//pic tweaks
pref("image.mem.max_ms_before_yield", 250);
//语言区域设置
pref("general.useragent.locale", "zh-CN");
pref("intl.accept_languages","zh-cn,zh,zh-hk,zh-sg,zh-tw,en-us,en,en-gb,ja");
pref("intl.charset.detector", "universal_charset_detector");
pref("intl.charsetmenu.browser.cache", "UTF-8, windows-1252, EUC-JP, gbk");
//add IGC and adjust time slice
pref("javascript.options.mem.gc_incremental_slice_ms",25);
//总是 jit 加速 javascript，改善JS内存占用
pref("javascript.options.methodjit_always", true);
pref("javascript.options.xml.content", true);
//地址栏默认搜索引擎地址，空值表示使用搜索栏默认搜索引擎
pref("keyword.URL", "http://www.google.com/search?q=%s");
// Win7默认开启H.264支持
pref("media.windows-media-foundation.enabled", true);
//启用全屏API
pref("full-screen-api.enabled", true);
//开启GPU加速
pref("gfx.font_rendering.directwrite.enabled", true);
pref("mozilla.widget.render-mode", 6);
//强制开启2Ddirect
pref("gfx.direct2d.force-enabled", true);
//强制启用图层加速
pref("layers.acceleration.force-enabled", true);
//自动启用硬件加速
pref("layers.acceleration.disabled", false);
//强制开启WebGL
pref("webgl.force-enabled", true);
//使滚动幅度增大、减小.卷动加速为几倍
pref("mousewheel.acceleration.factor", 3);
//鼠标滚轮连续滚动几次之后会启动加速功能,调到0-5微调有明显变化
pref("mousewheel.acceleration.start", 5);
pref("mousewheel.default.delta_multiplier_y", 200);
pref("mousewheel.transaction.ignoremovedelay",150);
pref("mousewheel.transaction.timeout",1600);
pref("network.dns.disablePrefetch", true);
//禁用DNS预读，防止路由阻塞
pref("network.dnsCacheEntries", 512);
pref("network.dnsCacheExpiration", 1800);
pref("network.dnsCacheExpirationGracePeriod", 1800);
pref("network.http.pipelining", true);
//默认开启spdy
pref("network.http.spdy.enabled", true);
//默认开启流水线，目前没有出现问题
pref("network.http.pipelining.firstrequest", true);
//加强HTTP利用率,理解请查 RFC2616
pref("network.http.pipelining.ssl"  , true);
//加强HTTP利用率
pref("network.http.proxy.pipelining", true);
//默认关闭预读引擎，同Opera SimpleU的设置
pref("network.prefetch-next", false);
//remote dns, 这个对提高网速，预防dns劫持有没有意义还在实验
pref("network.proxy.socks_remote_dns", true);
//简单理解:载入多少,显示多少
pref("nglayout.initialpaint.delay", 150);
//关闭pdfjs
pref("pdfjs.disabled", true);
//显示插件路径
pref("plugin.expose_full_path", true);
//禁止FF加载时定位大部分注册表中的插件的路径，可以提高启动速度并减少一些崩溃的可能性，这个比较个人了，对便携版有意义
pref("plugin.scan.plid.all", false);
//缺失插件不提示
pref("plugins.hide_infobar_for_missing_plugin", true);
pref("plugins.hide_infobar_for_outdated_plugin", true);
//禁止插件弹窗
pref("privacy.popups.disable_from_plugins", 2);
pref("privacy.popups.firstTime",false);
//禁止屏蔽非安全传输内容
pref("security.mixed_content.block_active_content", false);
pref("services.sync.prefs.sync.browser.download.manager.scanWhenDone", false);
pref("services.sync.prefs.sync.browser.download.manager.showWhenStarting", false);
pref("signed.applets.codebase_principal_support", true);
pref("ui.submenuDelay", 0);
pref("security.dialog_enable_delay", 0);
//DNT不要追踪我
user_pref("privacy.donottrackheader.enabled", true);
user_pref("privacy.sanitize.migrateFx3Prefs", true);
//pref("view_source.editor.path", "C:\\Windows\\notepad.exe");
pref("browser.allTabs.previews", true);
pref("browser.preferences.advanced.selectedTabIndex", 3);
pref("browser.search.context.loadInBackground", true);
//don't swap focus to the context search tab.
pref("browser.zoom.full", false);
pref("config.trim_on_minimize", false);
//Allow status feedback by default
pref("dom.disable_window_status_change", false);
pref("browser.search.selectedEngine", "Google搜索");
//菜单响应时间
pref("view_source.editor.external", true);
//外部编辑器
pref("view_source.editor.path", "D:\\Program Files\\AkelPad\\AkelPad.exe");
//disable all devtools
pref("devtools.webconsole.filter.networkinfo", false);
pref("devtools.webconsole.filter.network", false);
pref("devtools.webconsole.filter.cssparser", false);
pref("devtools.webconsole.filter.csserror", false);
pref("devtools.webconsole.filter.", false);
pref("devtools.webconsole.enabled", false);
pref("devtools.toolbox.sideEnabled", false);
pref("devtools.toolbar.enabled", false);
pref("devtools.tilt.outro_transition", false);
pref("devtools.tilt.intro_transition", false);
pref("devtools.tilt.enabled", false);
pref("devtools.styleeditor.transitions", false);
pref("devtools.styleeditor.enabled", false);
pref("devtools.scratchpad.enabled", false);
pref("devtools.responsiveUI.enabled", false);
pref("devtools.profiler.enabled", false);
pref("devtools.netmonitor.enabled", false);
pref("devtools.layoutview.enabled", false);
pref("devtools.inspector.enabled", false);
pref("devtools.fontinspector.enabled", false);
pref("devtools.errorconsole.deprecation_warnings", false);
pref("devtools.editor.expandtab", false);
pref("devtools.debugger.ui.variables-sorting-enabled", false);
pref("devtools.debugger.force-local", false);
pref("devtools.debugger.enabled", false);
pref("devtools.debugger.chrome-enabled", false);
