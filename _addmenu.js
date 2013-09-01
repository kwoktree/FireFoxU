// addMenu.uc.js SimpleuLite Mod on ywzhaiqi 的配置文件
/*
◆ 可用的变量 ◆
%EOL%            改行(\r\n)
%TITLE%          页面标题
%URL%            页面URI
%SEL%            选取范围内的文字
%RLINK%          リンクアンカー先の URL  链接锚的目的地
%IMAGE_URL%      画像的 URL
%IMAGE_ALT%      画像的 alt 属性
%IMAGE_TITLE%    画像的 title 属性
%LINK%           リンクアンカー先の URL  链接锚的目的地
%LINK_TEXT%      链接的文本
%RLINK_TEXT%     链接的文本
%MEDIA_URL%      媒体 URL
%CLIPBOARD%      剪贴板的内容
%FAVICON%        Favicon 的 URL
%EMAIL%          E-mail 链接
%HOST%           当前网页(域名)
%LINK_HOST%      当前网页(域名)
%RLINK_HOST%     当前网页(域名)

%XXX_HTMLIFIED%  HTML エンコードされた上記変数（XXX → TITLE などに読み替える）
%XXX_HTML%       HTML エンコードされた上記変数
%XXX_ENCODE%     URI 编码， 类似 TITLE_ENCODE

◇ 簡易的な変数 ◇
%h               当前网页(域名)
%i               图片的 URL
%l               链接的 URL
%m               媒体的 URL
%p               剪贴板的内容
%s               選択文字列
%t               当前页面标题
%u               当前页面 URL

基本的に Copy URL Lite+ の変数はそのまま使えます。
大文字・小文字は区別しません。
*/


/* 
 * 可添加隐藏 PageMenu, TabMenu, ToolMenu, AppMenu
 * 详见 原程序。
 * 
 * 位置更改。
 *   - 可通过隐藏原菜单，加载新的菜单。
 * position: 1,  insertBefore: "id",  insertAfter: "id"
 */

// ===================== 左上角按钮菜单 ====================================

app([
//  	{
//  		label: "代码片段速记器",
//  		insertAfter: "appmenu_webDeveloper",
//  		accesskey: "d",
//  		oncommand: "Scratchpad.openScratchpad();"	
//  	},
	{
		label: "错误控制台",
		insertAfter: "appmenu_webDeveloper",
		accesskey: "c",
		oncommand: "toJavaScriptConsole();"
	},
]);


// ====================== 标签右键菜单 =======================================

tab([
	{	// 标签的右键菜单中加入复制图标网址的功能
		label: "复制 Favicon 的 URL",
		text: "%FAVICON%"
	},
	{
		label: "复制图标（BASE64）",
		oncommand: "toBase64(gBrowser.mCurrentTab.image);"
	},	
	{  },   // 分隔条	
	{
		label: "复制页面标题",
		text: "%TITLE%"
	},
	{
		label: "复制标题和网址",
		text: "%TITLE%\n%URL%"
	}
]);


// ==================== 菜单栏的“工具”菜单 ===================================

// tool({
// 	label: "使用 DOM Inspector 查看元素",
// 	position: 1,
// });


// ========================== 页面右键菜单 ===================================
// 替换 openImgRar.uc.js。 打开图像rar
page({
	label: "打开图像rar",
	accesskey: "R",
	position: 1,
	condition: 'image',
	oncommand: function(){
		var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
		try {
			var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
			file.initWithPath(path);
		} catch (e) {
			var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
		}
		file.initWithPath(path);
		Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
		setTimeout(function () {
			file.launch();
		}, 100);
	}
});

// 创建一个子菜单
// pagesub({ ... }) 里面可以添加子菜单
var pagesub = PageMenu({ label: "站点工具", accesskey: "a" });
// 里面可以放一个数组
pagesub([
	{
		label : "查看当前链接网址的源代码",
		url   : "view-source:%l",
		// accesskey: "r",
		where : "tab"
	},
	{
		label: "Bing 页面翻译",
		url  : "http://www.microsofttranslator.com/bv.aspx?ref=Internal&from=&to=zh-chs&a=%u",
		where: "tab"
	},
	{
		label: "Google docs 打开链接",
		url  : "http://docs.google.com/viewer?url=%l",
		where: "tab"
	},
	{
		label: "添加到 Google 书签",
		url: "http://www.google.co.jp/bookmarks/mark?op=add&bkmk=%u&title=%TITLE_ENCODE%&annotation=%SEL_ENCODE%",
		condition: "nolink"
	},
	{
		label: "Google 翻译当前页面",
		url: "http://translate.google.cn/translate?u=%u",
		condition: "nolink",
		accesskey: "t"
	},
	{
		label: "Google 快照",
		url: "http://webcache.googleusercontent.com/search?q=cache:%u",
		condition: "nolink",
		accesskey: "c"
	},
	{
		label: "当前链接的 Google 快照",
		url: "http://webcache.googleusercontent.com/search?q=cache:%l",
		accesskey: "c"
	},
	{
		label: "TinyUrl",
		url  : "http://tinyurl.com/create.php?url=%u",
		where: "tab"
	},
	{
		label: "Web Archive",
		url: "http://web.archive.org/web/*/%u",
		condition: "nolink"
	},
	{
		label: "当前链接的 Web Archive",
		url: "http://web.archive.org/web/*/%l",
	},
	{  }, // label やアクションが登録されていないので区切り
	{
		label: "当前链接在侧边栏打开",
		condition: "noselect nomedia noinput nomailto",
		ccesskey: "b",
		oncommand: function(event) {
			var title = gContextMenu.onLink? gContextMenu.linkText() : gContextMenu.target.ownerDocument.title;
			var url = gContextMenu.linkURL || gContextMenu.target.ownerDocument.location.href;
			openWebPanel(title, url);
		}
	},
	{},
	{
		label: "重新加载配置",
		accesskey: "r",
		oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);"
	}
]);

var pagesub = PageMenu({ label: "浏览保存", accesskey: "s" });
pagesub([
	{
		label: "FlvCD视频解析",
		url: "http://www.flvcd.com/parse.php?kw=%u",
		condition: "nolink",
		where: "tab"
	},
	{
		label: "查看共享账号",
		url: "http://www.bugmenot.com/view.php?mode=bookmarklet&url=%u",
		condition: "nolink",
		where: "tab"
	},
	{
		label: "天涯脱水",
		url: "http://www.tianyatool.com/cgi-bin/bbs.pl?url=%u",
		condition: "nolink",
		where: "tab"
	},	
	{
		label: "保存为PDF",
		url: "http://www.pdfdownload.org/web2pdf/Default.aspx?left=0&right=0&top=0&bottom=0&page=0&cURL=%u",
		condition: "nolink",
		where: "tab"
	},

	{},	
	{
		label: "页面可见区域截图",
		oncommand: function() {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = content.innerWidth;
			canvas.height = content.innerHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
		}
	},
	{
		label: "页面所有区域截图",
		oncommand: function() {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = content.document.documentElement.scrollWidth;
			canvas.height = content.document.documentElement.scrollHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
		}
	},
	{
		label: "浏览器界面截图",
		oncommand: function() {
			var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
			canvas.width = innerWidth;
			canvas.height = innerHeight;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
			saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
		}
	},
	{},
	{ label: '复制当前页面的URL', text: '%URL%' }
	,{ command: 'context-bookmarkpage', icon: 'starbutton' }
	,{ command: 'context-savepage' }
	,{ command: 'context-viewbgimage' }

]);

var pagesub = PageMenu({ label: "页面信息", accesskey: "t" });
pagesub([
	{
		label: "AlexaRank",
		url: "http://www.alexa.com/data/details/traffic_details/%h",
		condition: "nolink",
		where: "tab"
	},
	{
		label: "AlexaCN",
		url: "http://alexa.chinaz.com/?domain=%h",
		condition: "nolink",
		where: "tab"
	},
	{
		label: "Whois",
		url: "http://whois.domaintools.com/%h",
		condition: "nolink",
		where: "tab"
	},
	{
		label: "SEO综合查询",
		url: "http://seo.chinaz.com/?q=%h",
		condition: "nolink",
		where: "tab"
	},	
	{ command: 'context-viewsource' }
	,{ command: 'context-viewinfo' }
]);

// command 属性からオリジナルの hidden 等を連動させる関数
function syncHidden(event) {
	Array.slice(event.target.children).forEach(function(elem){
		var command = elem.getAttribute('command');
		if (!command) return;
		var original = document.getElementById(command);
		if (!original) {
			elem.hidden = true;
			return;
		};
		elem.hidden = original.hidden;
		elem.collapsed = original.collapsed;
		elem.disabled = original.disabled;
	});
};

// 页面链接右键菜单移到2级目录菜单
new function () {
	var items = [
		{ command: 'context-copylink' }
		,{ command: 'context-copyemail' }
		,{
			label: '打开当前链接'
			,icon: 'url'
			,oncommand: 'document.getElementById("context-openlinkincurrent").doCommand();'
			,onclick: 'checkForMiddleClick(document.getElementById("context-openlinkintab"), event);'
		}
		,{ command: 'context-openlinkintab' }
		,{ command: 'context-openlinkprivate' }
		,{ command: 'context-openlink' }
		,{ command: 'context-sep-open' }
		,{ command: 'context-bookmarklink' }
		,{ command: 'context-savelink' }
		,{ command: 'context-sendlink', style:'display:none;' }
		,{ command: 'context-sep-copylink', style:'display:none;' }
	];
	var menu = PageMenu({ condition: 'link', insertBefore:'context-copylink', icon:'copy2', onpopupshowing: syncHidden});
	menu(items);
	page({ condition:'link', insertBefore:'context-sep-copylink' });
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="link"] #' + it.command + '{ display: none !important; }')
	});
};

// 页面图片右键菜单移到2级目录菜单
new function () {
	var items = [
		{ command: 'context-viewimage' }
		,{ command: 'context-reloadimage' }
		,{ command: 'context-copyimage-contents' }
		,{ command: 'context-copyimage' }
		,{ command: 'context-sep-copyimage' }
		,{ command: 'context-saveimage' }
		,{ command: 'context-sendimage', style:'display:none;' }
		,{ command: 'context-viewimageinfo' }
		,{ command: 'context-setDesktopBackground' }
		,{}								
	];
	var menu = PageMenu({ condition:'image', insertBefore:'context-viewimage', icon:'image', onpopupshowing: syncHidden});
	menu(items);
	page({ condition:'image', insertBefore:'context-setDesktopBackground' });
	items.forEach(function(it){
		if (it.command)
			css('#contentAreaContextMenu[addMenu~="image"] #' + it.command + '{ display: none !important; }')
	});
};

/**
 * ファイルメニューなどを右クリックメニューから無理矢理使えるようにする
 */

// 既存の menupopup をサブメニューとして利用する関数
// menu に subpopup 属性が必要
function subPopupshowing(event) {
	var subPopup = document.getElementById(event.currentTarget.getAttribute('subpopup'));
	if (!subPopup) return;

	var popup = event.target;
	if (!popup.hasAttribute('style')) {
		popup.style.cssText = [
			'-moz-appearance: none !important;'
			,'max-height: 1px !important;'
			,'border: none !important;'
			,'background: transparent !important;'
			,'opacity: 0 !important;'
		].join(' ');
	}
	popup.style.setProperty('min-width', (popup._width || 100)+'px', 'important');

	var { screenY, screenX, width } = popup.boxObject;
	var popupshown = function(evt) {
		var utils = window.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowUtils);
		utils.sendMouseEvent('mousemove', screenX, screenY, 0, 1, 0);
		subPopup.removeEventListener('popupshown', popupshown, false);
		popup._width = subPopup.boxObject.width;
	};
	setTimeout(function() {
		subPopup.addEventListener('popupshown', popupshown, false);
		subPopup.openPopupAtScreen(screenX-2, screenY-2, true);
	}, 0);
};

// 右クリックメニューに ファイル・ブックマークなどを作る
// 自定义右键菜单，如 文件 菜单等

/**
 * 選択範囲を色々するスクリプト群
 * 选取范围
 */
var selmenu = PageMenu({ label: "选取范围", condition:"select", accesskey: "R", insertBefore: "context-sep-open" });
selmenu([
	{
		label: "谷歌站內搜索"
		,url: "http://www.google.com.hk/search?q=site:%HOST%+%SEL%"
	}
	,{
		label: "百度站內搜索"
		,url: "http://www.baidu.com/s?wd=site:%HOST%+%SEL%"
	}
	,{
		label: "高亮选择的文字"
		,oncommand: function(event) {
			var ts = {};
			addMenu.getRangeAll().forEach(function(range) {
				var word = range.toString();
				if (ts[word]) return;
				gFindBar._highlightDoc(true, word);
				ts[word] = true;
			});
		}
	}	
	,{
		label: "打开选取范围内的 URL"
		,oncommand: function(event) {
			var urls = {};
			var reg = /h?t?tps?\:\/\/(?:\w+\.wikipedia\.org\/wiki\/\S+|[^\s\\.]+?\.[\w#%&()=~^_?.;:+*/-]+)/g;
			var matched = addMenu.focusedWindow.getSelection().toString().match(reg) || [];
			matched.forEach(function(url) {
				url = url.replace(/^h?t?tp/, "http");
				if (!urls[url])
					gBrowser.addTab(url);
				urls[url] = true;
			});
		}
	}
	,{
		label: "打开选取范围内的链接"
		,oncommand: function(event) {
			var urls = {};
			addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
				if (!urls[a.href] && /^http|^file/.test(a.href))
					gBrowser.addTab(a.href);
				urls[a.href] = true;
			});
		}
	}
	,{
		label: "打开一组选取范围内新的链接"
		,oncommand: function(event) {
			var urls = [];
			addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
				if (/^http|^file/.test(a.href))
					urls.push(a.href);
			});
			if (urls.length === 0) return;

			TabView._initFrame(function(){
				var item = TabView._iframe.focusedWindow.GroupItems.newGroup();
				urls.forEach(function(url, i){
					var tab = gBrowser.addTab(url);
					TabView.moveTabTo(tab, item.id);
					if (i === 0) gBrowser.selectedTab = tab;
				});
			});
		}
	}
	,{
		label: "打开选取范围内的图片"
		,oncommand: function() {
			var urls = [];
			addMenu.$$('a:not(:empty)', null, true).forEach(function(a) {
				if (/\.(jpe?g|png|gif|bmp)$/i.test(a.href) && urls.indexOf(a.href) === -1)
					urls.push(a.href);
			});
			if (urls.length === 0) return;

			var htmlsrc = '<style> img { max-width: 100%; max-height: 100%; } </style>';
			htmlsrc += urls.map(function(u) '\n<img src="' + u + '">').join("");
			gBrowser.addTab("data:text/html;charset=utf-8," + encodeURIComponent(htmlsrc));
		}
	}	
	,{
		label: "复制选取范围内的链接"
		,oncommand: function(event) {
			var urls = {};
			addMenu.$$('a:not(:empty)', null, true).forEach(function(a) { urls[a.href] = true; });
			urls = Object.keys(urls);
			if (urls.length === 0) return;
			addMenu.copy(urls.join('\n'));
		}
	}
	,{
		label: "勾选选取范围内的选择框"
		,icon: "checkbox"
		,checked: true
		,oncommand: function(event) {
			addMenu.$$('input[type="checkbox"]:not(:disabled)', null, true).forEach(function(a){
				a.checked = true;
			});
		}
	}
	,{
		label: "取消勾选选取范围内的选择框"
		,icon: "checkbox"
		,oncommand: function(event) {
			addMenu.$$('input[type="checkbox"]:not(:disabled)', null, true).forEach(function(a){
				a.checked = false;
			});
		}
	},
]);
