// ==UserScript==
// @name         Advanced Mouse Gestures (with Wheel Gesture and Rocker Gesture)
// @namespace    http://www.xuldev.org/
// @description  轻量级鼠标手势脚本（可自定义手势代码）
// @include      main
// @author       Raqbgxue + Gomita
// @version      10.1.17 (folk from original 9.5.18)
// @homepage     http://www.xuldev.org/misc/ucjs.php
// @homepage     http://d.hatena.ne.jp/raqbgxue/20090624/1245848856
// @note         Ctrl+(right-click-up) => Reset Gesture
//
// chromeフォルダに入れて使います。ジェスチャを焦って動作がおかしくなったら、
// 「Ctrl + 右クリック」で正常な状態に戻せます。
// FireGesturesとジェスチャ割り当てはだいたい同じです。カズタマイズは好みでどうぞ。
//
// 文字化けする、動かないなどの問題があったなら、まず文字コードと改行文字を疑って
// みてください。このファイルはUTF-8、LF改行（unix）で保存されています。
// ==/UserScript==
var ucjsMouseGestures={
// options
enableWheelGestures: true,
enableRockerGestures: true,
enablePopupGestures: true,

_lastX: 0,
_lastY: 0,
_directionChain: '',
_isMouseDownL: false,
_isMouseDownR: false,
_hideFireContext: false, //for windows
_shouldFireContext: false, //for linux

POPUP_ID: 'GesturePopup',
GESTURES:{
    'R':{name:'下一页',cmd:function(){var nav = gBrowser.webNavigation;
if (nav.canGoForward)
  nav.goForward();
else
try { var node = FireGestures.sourceNode; } catch (e) {}
while (node && node.nodeName != "BODY")
  node = node.parentNode;
if (!node) node = getBrowser().contentDocument;
var e = document.createEvent("KeyboardEvent");
e.initKeyEvent("keydown", true, true, window, false, false, false, false, 39, 0);
node.dispatchEvent(e);}},
    'L':{name:'上一页',cmd:function(){var nav = gBrowser.webNavigation;
if (nav.canGoBack)
  nav.goBack();
else
  try { var node = FireGestures.sourceNode; } catch (e) {}
while (node && node.nodeName != "BODY")
node = node.parentNode;
if (!node) node = getBrowser().contentDocument;
var e = document.createEvent("KeyboardEvent");
e.initKeyEvent("keydown", true, true, window, false, false, false, false, 37, 0);
node.dispatchEvent(e);}},
    'U':{name:'滚动到页面顶部',cmd:function(){goDoCommand("cmd_scrollTop");}},
    'D':{name:'滚动到页面底部',cmd:function(){goDoCommand("cmd_scrollBottom");}},
    'R':{name:'下一页',cmd:function(){nextPage.next(true);}},
    'UD':{name:'刷新',cmd:function(){document.getElementById("Browser:Reload").doCommand();}},
    'UL':{name:'转到左边标签页',cmd:function(){gBrowser.mTabContainer.advanceSelectedTab(-1,true);}},
    'UR':{name:'转到右边标签页',cmd:function(){gBrowser.mTabContainer.advanceSelectedTab(+1,true);}},
    'DL':{name:'关闭当前标签页',cmd:function(){document.getElementById("cmd_close").doCommand();}},
    'DR':{name:'撤销关闭标签页',cmd:function(){document.getElementById("History:UndoCloseTab").doCommand();}},
    'LR':{name:'打开新标签页',cmd:function(){document.getElementById("cmd_newNavigatorTab").doCommand();}},
    'LU':{name:'向上滚动',cmd:function(){FullZoom.enlarge();}},
    'LD':{name:'向下滚动',cmd:function(){FullZoom.reduce();}},
    'RL':{name:'复制当前页面URL+标题',cmd: function(){Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(content.document.title + " - " + content.location);}},
    'RU':{name:'主页',cmd:function(){document.getElementById("Browser:Home").doCommand();}},
    'RD':{name:'显示/隐藏书签工具栏',cmd:function(){var bmToolbar=document.getElementById("PersonalToolbar");bmToolbar.collapsed=!bmToolbar.collapsed;}},
    'L<R':{name:'页面缩放重置',cmd:function(){FullZoom.reset();}},
    'L>R':{name:'复制选中文字',cmd:function(){Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper).copyString(content.getSelection());}},
    'W+':{name:'打开音量控制器',cmd: function() {try {var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsILocalFile);file.append(/6/.test(navigator.oscpu) ? "sndvol.exe" : "sndvol32.exe");var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);process.init(file);process.run(false, ["-f"], 1);}catch(ex){alert("\u6253\u5f00\u97f3\u91cf\u63a7\u5236\u5668\u5931\u8d25!")}}},
    'W-':{name:'打开任务管理器',cmd: function() {try {var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);file.initWithPath(Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsILocalFile).path + "\\taskmgr.exe");file.launch();}catch(ex){alert("\u6253\u5f00\u4efb\u52a1\u7ba1\u7406\u5668\u5931\u8d25!")}}},
    'UDU':{name:'关闭浏览器',cmd:function(){goQuitApplication();}},
    'DLU':{name:'重启浏览器',cmd:function(){const nsIAppStartup=Components.interfaces.nsIAppStartup;var os=Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);var cancelQuit=Components.classes["@mozilla.org/supports-PRBool;1"].createInstance(Components.interfaces.nsISupportsPRBool);os.notifyObservers(cancelQuit,"quit-application-requested",null);if(cancelQuit.data)return;os.notifyObservers(null,"quit-application-granted",null);var wm=Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);var windows=wm.getEnumerator(null);while(windows.hasMoreElements()){var win=windows.getNext();if(("tryToClose"in win)&&!win.tryToClose())return;}Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(nsIAppStartup).quit(nsIAppStartup.eRestart|nsIAppStartup.eAttemptQuit);}},
    'URU':{name:'强制刷新',cmd:function(){document.getElementById("Browser:ReloadSkipCache").doCommand();}},
    'ULU':{name:'到上一层',cmd:function(){var uri=gBrowser.currentURI;if(uri.path=="/")return;var pathList=uri.path.split("/");if(!pathList.pop())pathList.pop();loadURI(uri.prePath+pathList.join("/")+"/");}},
    'DU':{name:'隐藏窗口',cmd:function doBossKey () {
    Components.utils.import("resource://gre/modules/ctypes.jsm");
    var user32 = ctypes.open("user32.dll");
    with (ctypes) {
        var findWindow = user32.declare(
            "FindWindowW", winapi_abi, uint32_t,
            jschar.ptr, jschar.ptr);
        var getWindowLong = user32.declare(
            "GetWindowLongW", winapi_abi, uint32_t,
            uint32_t, int32_t);
        var setWindowLong = user32.declare(
            "SetWindowLongW", winapi_abi, uint32_t,
            uint32_t, int32_t, uint32_t);
        var ShowWindow= user32.declare(
            "ShowWindow", winapi_abi, bool,
            uint32_t, uint32_t);
        var SetLayeredWindowAttributes = user32.declare(
            "SetLayeredWindowAttributes", winapi_abi, bool,
            uint32_t, uint32_t, uint8_t, uint32_t);
    }
    var hWnd = findWindow(
        "MozillaWindowClass",
        document.getElementById("main-window").getAttribute("title"));
    var lStyle = getWindowLong(hWnd, -20);
    //setWindowLong(hWnd, -20, 0x80000 ^ lStyle);
    //SetLayeredWindowAttributes(hWnd, 0xFFFFFF, 200, 2);
    ShowWindow(hWnd,0);
    setWindowLong(hWnd, -20, 0x80 | lStyle)
    ShowWindow(hWnd,6);
    var tf1 = window.setTimeout(function() {
        setWindowLong(hWnd, -20, ~0x80 & lStyle)
        ShowWindow(hWnd,6);
        user32.close()
    },1000);
} }, // bosskey
},

init:function(){
	var self=this;
	var events=["mousedown","mousemove","mouseup","contextmenu"];
	if(this.enableRockerGestures)events.push("draggesture");
	if(this.enableWheelGestures)events.push("DOMMouseScroll");
	function registerEvents(aAction,eventArray){
		eventArray.forEach(function(aType){
				getBrowser().mPanelContainer[aAction+"EventListener"](aType,self,aType=="contextmenu");
		});
	};
	registerEvents("add",events);
	window.addEventListener("unload",function(){
			registerEvents("remove",events);
		},false);
},

handleEvent:function(event){
	switch(event.type){
		case"mousedown":
			if(event.button==2){
				this._isMouseDownR=true;
				this._hideFireContext=false;
				this._startGesture(event);
			}
			if(this.enableRockerGestures){
				if(event.button==2&&this._isMouseDownL){
					this._isMouseDownR=false;
					this._shouldFireContext=false;
					this._hideFireContext=true;
					this._directionChain="L>R";
					this._stopGesture(event);
				}else if(event.button==0){
					this._isMouseDownL=true;
					if(this._isMouseDownR){
						this._isMouseDownL=false;
						this._shouldFireContext=false;
						this._hideFireContext=true;
						this._directionChain="L<R";
						this._stopGesture(event);
					}
				}
			}
			break;
		case"mousemove":
			if(this._isMouseDownR){
				this._hideFireContext=true;
				this._progressGesture(event);
			}
			break;
		case"mouseup":
			if(event.ctrlKey&&event.button==2){
				this._isMouseDownL=false;
				this._isMouseDownR=false;
				this._shouldFireContext=false;
				this._hideFireContext=false;
				this._directionChain='';
				event.preventDefault();
				XULBrowserWindow.statusTextField.label="Reset Gesture";
				break;
			}
			if(this._isMouseDownR&&event.button==2){
				if(this._directionChain)this._shouldFireContext=false;
				this._isMouseDownR=false;
				this._stopGesture(event);
				if(this._shouldFireContext&&!this._hideFireContext){
					this._shouldFireContext=false;
					this._displayContextMenu(event);
				}
			}else if(this.enableRockerGestures&&event.button==0&&this._isMouseDownL){
				this._isMouseDownL=false;
				this._shouldFireContext=false;
			}else if(this.enablePopupGestures&&(event.button==0||event.button==1)&&event.target.localName=='menuitem'){
				this._isMouseDownL=false;
				this._shouldFireContext=false;
				var popup=document.getElementById(this.POPUP_ID);
				var activeItem=event.target;
				switch(popup.getAttribute("gesturecommand")){
					case"WebSearchPopup":
						var selText=popup.getAttribute("selectedtext");
						var engine=activeItem.engine;
						if(!engine)break;
						var submission=engine.getSubmission(selText,null);
						if(!submission)break;
						document.getElementById('searchbar').textbox.value=selText;
						gBrowser.loadOneTab(submission.uri.spec,null,null,submission.postData,null,false);
						break;
					case"ClosedTabsPopup":
						undoCloseTab(activeItem.index);
						break;
					case"HistoryPopup":
						gBrowser.webNavigation.gotoIndex(activeItem.index);
						break;
					case"AllTabsPopup":
						gBrowser.selectedTab=gBrowser.mTabs[activeItem.index];
						break;
				}
				popup.hidePopup();
			}
			break;
	case"popuphiding":
		var popup=document.getElementById(this.POPUP_ID);
		popup.removeEventListener("popuphiding",this,true);
		document.documentElement.removeEventListener("mouseup",this,true);
		while(popup.hasChildNodes())popup.removeChild(popup.lastChild);
		break;
	case"contextmenu":
		if(this._isMouseDownL||this._isMouseDownR||this._hideFireContext){
			event.preventDefault();
			event.stopPropagation();
			this._shouldFireContext=true;
			this._hideFireContext=false;
		}
		break;
	case"DOMMouseScroll":
		if(this.enableWheelGestures&&this._isMouseDownR){
			event.preventDefault();
			event.stopPropagation();
			this._shouldFireContext=false;
			this._hideFireContext=true;
			this._directionChain="W"+(event.detail>0?"+":"-");
			this._stopGesture(event);
		}
		break;
	case"draggesture":
		this._isMouseDownL=false;
		break;
	}
},

_displayContextMenu:function(event){
	var evt=event.originalTarget.ownerDocument.createEvent("MouseEvents");
	evt.initMouseEvent("contextmenu",true,true,event.originalTarget.defaultView,0,event.screenX,event.screenY,event.clientX,event.clientY,false,false,false,false,2,null);
	event.originalTarget.dispatchEvent(evt);
},

_startGesture:function(event){
	this._lastX=event.screenX;
	this._lastY=event.screenY;
	this._directionChain="";
},

_progressGesture:function(event){
	var x=event.screenX, y=event.screenY;
	var lastX=this._lastX, lastY=this._lastY;
	var subX=x-lastX, subY=y-lastY;
	var distX=(subX>0?subX:(-subX)),distY=(subY>0?subY:(-subY));
	var direction;
	if(distX<10&&distY<10)return;
	if(distX>distY)direction=subX<0?"L":"R";
	else direction=subY<0?"U":"D";
	var dChain = this._directionChain;
	if(direction!=dChain.charAt(dChain.length-1)){
		dChain+=direction;
		this._directionChain+=direction;
		var gesture=this.GESTURES[dChain];
		XULBrowserWindow.statusTextField.label="手势: "+dChain+(gesture?' ('+gesture.name+')':'');
	}
	this._lastX=x;
	this._lastY=y;
},

_stopGesture:function(event){
	try{
		if(dChain=this._directionChain)this.GESTURES[dChain].cmd(this,event);
		XULBrowserWindow.statusTextField.label="";
	}catch(e){
		XULBrowserWindow.statusTextField.label='未定义的手势: '+dChain;
	}
	this._directionChain="";
},

_buildPopup:function(event,gestureCmd){
	if(!this.enablePopupGestures)return;
	var popup=document.getElementById(this.POPUP_ID);
	if(!popup){
		popup=document.createElement("popup");
		popup.id=this.POPUP_ID;
	}
	document.getElementById("mainPopupSet").appendChild(popup);
	popup.setAttribute("gesturecommand",gestureCmd);
	switch(gestureCmd){
		case"WebSearchPopup":
			var searchSvc=Cc["@mozilla.org/browser/search-service;1"].getService(Ci.nsIBrowserSearchService);
			var engines=searchSvc.getVisibleEngines({});
			if(engines.length<1)throw"No search engines installed.";
			for(var i=engines.length-1;i>=0;--i){
				var engine = engines[i];
				var menuitem=document.createElement("menuitem");
				menuitem.setAttribute("label",engine.name);
				menuitem.setAttribute("class","menuitem-iconic");
				if(engine.iconURI)menuitem.setAttribute("src",engine.iconURI.spec);
				popup.insertBefore(menuitem,popup.firstChild);
				menuitem.engine=engine;
			}
			popup.setAttribute("selectedtext",getBrowserSelection().toString());
			break;
		case"ClosedTabsPopup":
			try{
				if(!gPrefService.getBoolPref("browser.sessionstore.enabled"))throw"Session Restore feature is disabled.";
			}catch(e){}
			var ss=Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);
			if(ss.getClosedTabCount(window)==0)throw"No restorable tabs in this window.";
			var undoItems=eval("("+ss.getClosedTabData(window)+")");
			for(var i=0,LEN=undoItems.length;i<LEN;i++){
				var menuitem=popup.appendChild(document.createElement("menuitem"));
				menuitem.setAttribute("label",undoItems[i].title);
				menuitem.setAttribute("class","menuitem-iconic bookmark-item");
				menuitem.index=i;
				var iconURL=undoItems[i].image;
				if(iconURL)menuitem.setAttribute("image",iconURL);
			}
			break;
		case"HistoryPopup":
			var sessionHistory=gBrowser.webNavigation.sessionHistory;
			if(sessionHistory.count<1)throw"No back/forward history for this tab.";
			var curIdx=sessionHistory.index;
			for(var i=0,shc=sessionHistory.count;i<shc;i++){
				var entry=sessionHistory.getEntryAtIndex(i,false);
				if(!entry)continue;
				var menuitem=document.createElement("menuitem");
				popup.insertBefore(menuitem,popup.firstChild);
				menuitem.setAttribute("label",entry.title);
				try{
					var iconURL=Cc["@mozilla.org/browser/favicon-service;1"].getService(Ci.nsIFaviconService).getFaviconForPage(entry.URI).spec;
					menuitem.style.listStyleImage="url("+iconURL+")";
				}catch(e){}
				menuitem.index=i;
				if(i==curIdx){
					menuitem.style.listStyleImage="";
					menuitem.setAttribute("type","radio");
					menuitem.setAttribute("checked","true");
					menuitem.className="unified-nav-current";
					activeItem=menuitem;
				}else{
					menuitem.className=i<curIdx?"unified-nav-back menuitem-iconic":"unified-nav-forward menuitem-iconic";
				}
			}
			break;
		case"AllTabsPopup":
			var tabs=gBrowser.mTabs;
			if(tabs.length<1)return;
			for(var i=0,LEN=tabs.length;i<LEN;i++){
				var menuitem=popup.appendChild(document.createElement("menuitem"));
				var tab=tabs[i];
				menuitem.setAttribute("class","menuitem-iconic bookmark-item");
				menuitem.setAttribute("label",tab.label);
				menuitem.setAttribute("crop",tab.getAttribute("crop"));
				menuitem.setAttribute("image",tab.getAttribute("image"));
				menuitem.index=i;
				if(tab.selected)activeItem=menuitem;
			}
			break;
	}
	document.popupNode=null;
	document.tooltipNode=null;
	popup.addEventListener("popuphiding",this,true);
	popup.openPopup(null,"",event.clientX,event.clientY,false,false);
	document.documentElement.addEventListener("mouseup",this,true);
},

};

ucjsMouseGestures.init();