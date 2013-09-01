//keys.f1 = function(ev){ alert(ev); };// ヘルプが実行されないことの确认用
keys.z = "BrowserBack();";//后退
keys.x = "BrowserForward();";//前进
keys[1] = "gBrowser.mTabContainer.advanceSelectedTab(-1, true);";// 前のタブ
keys[2] = "gBrowser.mTabContainer.advanceSelectedTab(+1, true);";// 次のタブ
keys[0] = "FullZoom.reset();";// ズームリセット
keys["-"] = "FullZoom.reduce();";
keys["+"] = "FullZoom.enlarge();";
//keys["Shift+G"] = "var s = getMarkupDocumentViewer();s.authorStyleDisabled = !s.authorStyleDisabled;";// サイトの CSS を ON/OFF トグル
keys["F4"] = "toggleSidebar('viewBookmarksSidebar')";// ブックマークサイドバーを开く
keys["VK_F12+Ctrl"] = "openPreferences();";//firefox选项
keys["p+alt"] = "openPreferences();";
keys["c"] = "WebScreenShotByClipping.init();"; //截图
//keys["s"] = "snapLinks.init();";//snap links  
keys["U+Ctrl"] = "undoCloseTab();";//撤销关闭标签页
keys["Z+Ctrl"] = "undoCloseTab();";//撤销关闭标签页
keys["F5"] =  "gBrowser.mCurrentBrowser.reload();"; //刷新
keys["F6"] =  "BrowserReloadSkipCache();";              //强制刷新
keys["p"] = function( ){ document.getElementById('quickproxy-status').click() }; //代理状态切换
keys["Alt+R"] = function(){Application.restart();}; //重启

