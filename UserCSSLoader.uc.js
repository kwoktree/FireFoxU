// ==UserScript==
// @name			UserCSSLoader
// @description		类似Stylish的CSS样式管理器，简体中文图形界面
// @note				Stylish みたいなもの
// @namespace		http://d.hatena.ne.jp/Griever/
// @author			Griever
// @note				==forked by iwo - Mozest.com==
// @note				CSS-Stylish管理器_火狐橙菜单+可拖动按钮版20130126，version 0.0.4.2，适用于Fx21+
// @note             转载请注明以下出处！
// @note             脚本主页@Mozest论坛 http://g.mozest.com/thread-43097-1-1
// @note				=============================================================
// @note             Thanks "build draggable Fx button" by 风飘零@a936468
// @note             thread http://blog.bitcp.com/archives/452
// @note				CSS-Stylish管理器_火狐橙菜单+扩展栏按钮版20130112，version 0.0.4.1，适用于Fx20+
// @include			main
// @license			MIT License
// @compatibility	Firefox 4
// @charset			UTF-8
// @version			0.0.4.2
// @note				0.0.4.1
// @note				version  0.0.4
// @note				0.0.4 Remove E4X
// @note				version 0.0.3.1
// @note				2012-9-1添加扩展栏按钮
// @note				CSSEntry クラスを作った
// @note				スタイルのテスト機能を作り直した
// @note				ファイルが削除された場合 rebuild 時に CSS を解除しメニューを消すようにした
// @note				uc で読み込まれた .uc.css の再読み込みに仮対応
// ==/UserScript==

/****** 使用方法 ******

在菜单“CSS-Stylish管理”菜单中：
左键点击各CSS项目，切换各项目的“应用与否”；
中键点击各CSS项目，也是切换各项目的“应用与否”，但不退出菜单，即可连续操作;
右键点击各CSS项目，则是调用编辑器对其进行编辑；

在about:config里修改 "view_source.editor.path" 以指定编辑器
在about:config里修改"UserCSSLoader.FOLDER" 指定存放文件夹

类似滚动条css的浏览器chrome样式，请改成以"xul-"为开头，或以".as.css"为结尾的文件名，才能正常载入
——以上Mozest论坛的牛君nightson针对以下日文说的
——虽不明，却觉厉

chrome フォルダに CSS フォルダが作成されるのでそこに .css をぶち込むだけ。
ファイル名が "xul-" で始まる物、".as.css" で終わる物は AGENT_SHEET で、それ以外は USER_SHEET で読み込む。
ファイルの内容はチェックしないので @namespace 忘れに注意。

メニューバーに CSS メニューが追加される
メニューを左クリックすると ON/OFF
          中クリックするとメニューを閉じずに ON/OFF
          右クリックするとエディタで開く

エディタは "view_source.editor.path" に指定されているものを使う
フォルダは "UserCSSLoader.FOLDER" にパスを入れれば変更可能

 **** 説明終わり ****/

(function(){

let { classes: Cc, interfaces: Ci, utils: Cu, results: Cr } = Components;
if (!window.Services)
	Cu.import("resource://gre/modules/Services.jsm");

// 起動時に他の窓がある（２窓目の）場合は抜ける
let list = Services.wm.getEnumerator("navigator:browser");
while(list.hasMoreElements()){ if(list.getNext() != window) return; }

if (window.UCL) {
	window.UCL.destroy();
	delete window.UCL;
}

window.UCL = {
	USE_UC: "UC" in window,
	AGENT_SHEET: Ci.nsIStyleSheetService.AGENT_SHEET,
	USER_SHEET : Ci.nsIStyleSheetService.USER_SHEET,
	readCSS    : {},
	get disabled_list() {
		let obj = [];
		try {
			obj = this.prefs.getComplexValue("disabled_list", Ci.nsISupportsString).data.split("|");
		} catch(e) {}
		delete this.disabled_list;
		return this.disabled_list = obj;
	},
	get prefs() {
		delete this.prefs;
		return this.prefs = Services.prefs.getBranch("UserCSSLoader.")
	},
	get styleSheetServices(){
		delete this.styleSheetServices;
		return this.styleSheetServices = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	},
	get FOLDER() {
		let aFolder;
		try {
			// UserCSSLoader.FOLDER があればそれを使う
			let folderPath = this.prefs.getCharPref("FOLDER");
			aFolder = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile)
			aFolder.initWithPath(folderPath);
		} catch (e) {
			aFolder = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
			aFolder.appendRelativePath("CSS");//指定用户css文件夹名称，若不存在会自动创建
		}
		if (!aFolder.exists() || !aFolder.isDirectory()) {
			aFolder.create(Ci.nsIFile.DIRECTORY_TYPE, 0664);
		}
		delete this.FOLDER;
		return this.FOLDER = aFolder;
	},
	getFocusedWindow: function() {
		let win = document.commandDispatcher.focusedWindow;
		if (!win || win == window) win = content;
		return win;
	},
	init: function() {
		var navBar = document.getElementById("tabs-closebutton"); //status-bar  urlbar-icons addon-bar alltabs-button TabsToolbar go-button
		if (!navBar) return;
	
		var menubtn = document.createElement("toolbarbutton");
		menubtn.id = "usercssloader_menubtn";
		//menubtn.setAttribute("label", "UC-Stylish-Loader");
		menubtn.setAttribute("tooltiptext", "CSS-Stylish\u7BA1\u7406\u5668");//CSS-Stylish管理器
		menubtn.setAttribute("type", "menu");// 下拉菜单,若需要右键菜单请替换为"context", "_child"  
		menubtn.setAttribute("class", "toolbarbutton-1");//toolbarbutton-1 chromeclass-toolbar-additional
		//menubtn.setAttribute("removable", "true");
		menubtn.style.listStyleImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARklEQVQ4jWNgYGD4TyFm+L/uaBJezMDA8H+vgyEGHk4GEIPxGnBhdikKZmBg+P/vEyscjxrASjglEmPAvBMPMPBwMoASDADElRSk+LLlQAAAAABJRU5ErkJggg==)';

	//	navBar.appendChild(menubtn); 
		navBar.parentNode.insertBefore(menubtn, navBar.previousSibling);

		var xml_menubtn = '\
				<menupopup id="usercssloader_menubtn_popup">\
					<menuitem label="打开CSS文件夹"\
				          accesskey="O"\
						  class="menuitem-iconic"\
				          oncommand="UCL.openFolder();" />\
					<menuitem label="重新加载选中的css样式"\
				          accesskey="R"\
						  class="menuitem-iconic"\
				          acceltext="Alt + R"\
						  oncommand="UCL.rebuild();" />\
					<menuitem label="在userstyles.org检索当前网页样式"\
				          accesskey="S"\
						  class="menuitem-iconic"\
				          oncommand="UCL.searchStyle();" />\
					<menuseparator />\
					<menu label="新建与编辑css样式..." id="usercssloader-write-edit-css" class="menu-iconic">\
						<menupopup id="usercssloader_menubtn_submenupopup">\
							<menuitem label="新建用户css样式(外部编辑器)"\
							          accesskey="N"\
									  class="menuitem-iconic"\
							          oncommand="UCL.create();" />\
							<menuitem label="新建浏览器(Chrome)样式"\
							          id="usercssloader-test-chrome"\
							          accesskey="C"\
							          oncommand="UCL.styleTest(window);" />\
							<menuitem label="新建当前网页(Web)样式"\
							          id="usercssloader-test-content"\
							          accesskey="W"\
							          oncommand="UCL.styleTest();" />\
							<menuseparator />\
							<menuitem label="编辑userChrome.css文件"\
							          hidden="false"\
									  class="menuitem-iconic"\
							          oncommand="UCL.editUserCSS(\'userChrome.css\')" />\
							<menuitem label="编辑userContent.css文件"\
							          hidden="false"\
							          oncommand="UCL.editUserCSS(\'userContent.css\')" />\
						</menupopup>\
					</menu>\
					<menu label=".uc.css" accesskey="U" hidden="'+ !UCL.USE_UC +'">\
						<menupopup id="usercssloader_menubtn_ucmenupopup">\
							<menuitem label="Rebuild(.uc.js)"\
							          oncommand="UCL.UCrebuild();" />\
							<menuseparator id="usercssloader_menubtn_ucseparator"/>\
						</menupopup>\
					</menu>\
					<menuseparator id="ucl_menubtn_separator"/>\
				</menupopup>\
		';

		var range_menubtn = document.createRange();
		range_menubtn.selectNodeContents($('usercssloader_menubtn'));
		range_menubtn.collapse(false);
		range_menubtn.insertNode(range_menubtn.createContextualFragment(xml_menubtn.replace(/\n|\t/g, '')));
		range_menubtn.detach();

//access key register
		$("mainKeyset").appendChild($C("key", {
			id: "usercssloader-rebuild-key",
			oncommand: "UCL.rebuild();",
			key: "R",
			modifiers: "alt",
		}));

		this.rebuild();
		this.initialized = true;
		if (UCL.USE_UC) {
			setTimeout(function() {
				UCL.UCcreateMenuitem();
			}, 1000);
		}
		window.addEventListener("unload", this, false);
	},
	uninit: function() {
		var dis = [x for(x in this.readCSS) if (!this.readCSS[x].enabled)];
		var str = Cc["@mozilla.org/supports-string;1"].createInstance(Ci.nsISupportsString);
		str.data = dis.join("|");
		this.prefs.setComplexValue("disabled_list", Ci.nsISupportsString, str);
		window.removeEventListener("unload", this, false);
	},
	destroy: function() {
		var i = document.getElementById("usercssloader_menu");
		if (i) i.parentNode.removeChild(i);
		var i = document.getElementById("usercssloader-rebuild-key");
		if (i) i.parentNode.removeChild(i);
		this.uninit();
	},
	handleEvent: function(event) {
		switch(event.type){
			case "unload": this.uninit(); break;
		}
	},
	rebuild: function() {
		let ext = /\.css$/i;
		let not = /\.uc\.css/i;
		let files = this.FOLDER.directoryEntries.QueryInterface(Ci.nsISimpleEnumerator);

		while (files.hasMoreElements()) {
			let file = files.getNext().QueryInterface(Ci.nsIFile);
			if (!ext.test(file.leafName) || not.test(file.leafName)) continue;
			let CSS = this.loadCSS(file);
			CSS.flag = true;
		}
		for (let [leafName, CSS] in Iterator(this.readCSS)) {
			if (!CSS.flag) {
				CSS.enabled = false;
				delete this.readCSS[leafName];
			}
			delete CSS.flag;
			this.rebuildMenu(leafName);
		}
		if (this.initialized)
			XULBrowserWindow.statusTextField.label = "\u91CD\u65B0\u52A0\u8F7Dcss\u6210\u529F";//重新加载CSS成功//Rebuild しました
	},
	loadCSS: function(aFile) {
		var CSS = this.readCSS[aFile.leafName];
		if (!CSS) {
			CSS = this.readCSS[aFile.leafName] = new CSSEntry(aFile);
			if (this.disabled_list.indexOf(CSS.leafName) === -1) {
				CSS.enabled = true;
			}
		} else if (CSS.enabled) {
			CSS.enabled = true;
		}
		return CSS;
	},
//按钮css列表子菜单start
	rebuildMenu: function(aLeafName) {
		var CSS = this.readCSS[aLeafName];
		var btnmenuitem = document.getElementById("btnusercssloader-" + aLeafName);

		if (!CSS) {
			if (btnmenuitem)
				btnmenuitem.parentNode.removeChild(btnmenuitem);
			return;
		}

		if (!btnmenuitem) {
			btnmenuitem = document.createElement("menuitem");//按钮css列表子菜单
			btnmenuitem.setAttribute("label", aLeafName);
			btnmenuitem.setAttribute("id", "btnusercssloader-" + aLeafName);
			btnmenuitem.setAttribute("class", "usercssloader-item " + (CSS.SHEET == this.AGENT_SHEET? "AGENT_SHEET" : "USER_SHEET"));
			btnmenuitem.setAttribute("type", "checkbox");
			btnmenuitem.setAttribute("autocheck", "false");
			btnmenuitem.setAttribute("oncommand", "UCL.toggle('"+ aLeafName +"');");
			btnmenuitem.setAttribute("onclick", "UCL.itemClick(event);");
			document.getElementById("usercssloader_menubtn_popup").appendChild(btnmenuitem);
		}
		btnmenuitem.setAttribute("checked", CSS.enabled);
	},
//按钮css列表子菜单end
	toggle: function(aLeafName) {
		var CSS = this.readCSS[aLeafName];
		if (!CSS) return;
		CSS.enabled = !CSS.enabled;
		this.rebuildMenu(aLeafName);
	},
	itemClick: function(event) {
		if (event.button == 0) return;

		event.preventDefault();
		event.stopPropagation();
		let label = event.currentTarget.getAttribute("label");

		if (event.button == 1) {
			this.toggle(label);
		}
		else if (event.button == 2) {
			closeMenus(event.target);
			this.edit(this.getFileFromLeafName(label));
		}
	},
	getFileFromLeafName: function(aLeafName) {
		let f = this.FOLDER.clone();
		f.QueryInterface(Ci.nsILocalFile); // use appendRelativePath
		f.appendRelativePath(aLeafName);
		return f;
	},
	styleTest: function(aWindow) {
		aWindow || (aWindow = this.getFocusedWindow());
		new CSSTester(aWindow, function(tester){
			if (tester.saved)
				UCL.rebuild();
		});
	},
	searchStyle: function() {
		let win = this.getFocusedWindow();
		let word = win.location.host || win.location.href;
		openLinkIn("http://userstyles.org/styles/browse?category=" + word, "tab", {});//http://userstyles.org/styles/browse/site/
	},
	openFolder: function() {
		this.FOLDER.launch();
	},
	editUserCSS: function(aLeafName) {
		let file = Services.dirsvc.get("UChrm", Ci.nsILocalFile);
		file.appendRelativePath(aLeafName);
		this.edit(file);
	},
	edit: function(aFile) {
		var editor = Services.prefs.getCharPref("view_source.editor.path");
		if (!editor) return alert("\u672A\u6307\u5B9A\u5916\u90E8\u7F16\u8F91\u5668\u7684\u8DEF\u5F84\u3002\n\u8BF7\u5728about：config\u4E2D\u8BBE\u7F6Eview_source.editor.path");//未指定外部编辑器的路径。\n 请在about：config中设置view_source.editor.path
		try {
			var UI = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
			UI.charset = window.navigator.platform.toLowerCase().indexOf("win") >= 0? "GB2312": "UTF-8";//Shift_JIS
			var path = UI.ConvertFromUnicode(aFile.path);
			var app = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
			app.initWithPath(editor);
			var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
			process.init(app);
			process.run(false, [path], 1);
		} catch (e) {}
	},
	create: function(aLeafName) {
		if (!aLeafName) aLeafName = prompt("\u8BF7\u8F93\u5165\u6587\u4EF6\u540D", new Date().toLocaleFormat("%Y_%m%d_%H%M%S"));//请输入文件名
		if (aLeafName) aLeafName = aLeafName.replace(/\s+/g, " ").replace(/[\\/:*?\"<>|]/g, "");
		if (!aLeafName || !/\S/.test(aLeafName)) return;
		if (!/\.css$/.test(aLeafName)) aLeafName += ".css";
		let file = this.getFileFromLeafName(aLeafName);
		this.edit(file);
	},
	UCrebuild: function() {
		let re = /^file:.*\.uc\.css(?:\?\d+)?$/i;
		let query = "?" + new Date().getTime();
		Array.slice(document.styleSheets).forEach(function(css){
			if (!re.test(css.href)) return;
			if (css.ownerNode) {
				css.ownerNode.parentNode.removeChild(css.ownerNode);
			}
			let pi = document.createProcessingInstruction('xml-stylesheet','type="text/css" href="'+ css.href.replace(/\?.*/, '') + query +'"');
			document.insertBefore(pi, document.documentElement);
		});
		UCL.UCcreateMenuitem();
	},
	UCcreateMenuitem: function() {
		let sep = $("usercssloader_ucsepalator");
		let popup = sep.parentNode;
		if (sep.nextSibling) {
			let range = document.createRange();
			range.setStartAfter(sep);
			range.setEndAfter(popup.lastChild);
			range.deleteContents();
			range.detach();
		}

		let re = /^file:.*\.uc\.css(?:\?\d+)?$/i;
		Array.slice(document.styleSheets).forEach(function(css) {
			if (!re.test(css.href)) return;
			let fileURL = decodeURIComponent(css.href).split("?")[0];
			let aLeafName = fileURL.split("/").pop();
			let m = document.createElement("menuitem");
			m.setAttribute("label", aLeafName);
			m.setAttribute("tooltiptext", fileURL);
			m.setAttribute("id", "usercssloader-" + aLeafName);
			m.setAttribute("type", "checkbox");
			m.setAttribute("autocheck", "false");
			m.setAttribute("checked", "true");
			m.setAttribute("oncommand", "this.setAttribute('checked', !(this.css.disabled = !this.css.disabled));");
			m.setAttribute("onclick", "UCL.UCItemClick(event);");
			m.css = css;
			popup.appendChild(m);
		});
	},
	UCItemClick: function(event) {
		if (event.button == 0) return;
		event.preventDefault();
		event.stopPropagation();

		if (event.button == 1) {
			event.target.doCommand();
		}
		else if (event.button == 2) {
			closeMenus(event.target);
			let fileURL = event.currentTarget.getAttribute("tooltiptext");
			let file = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getFileFromURLSpec(fileURL);
			this.edit(file);
		}
	},
};

function CSSEntry(aFile) {
	this.path = aFile.path;
	this.leafName = aFile.leafName;
	this.lastModifiedTime = 1;
	this.SHEET = /^xul-|\.as\.css$/i.test(this.leafName) ? 
		Ci.nsIStyleSheetService.AGENT_SHEET: 
		Ci.nsIStyleSheetService.USER_SHEET;
}
CSSEntry.prototype = {
	sss: Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService),
	_enabled: false,
	get enabled() {
		return this._enabled;
	},
	set enabled(isEnable) {
		var aFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile)
		aFile.initWithPath(this.path);
	
		var isExists = aFile.exists(); // ファイルが存在したら true
		var lastModifiedTime = isExists ? aFile.lastModifiedTime : 0;
		var isForced = this.lastModifiedTime != lastModifiedTime; // ファイルに変更があれば true

		var fileURL = Services.io.getProtocolHandler("file").QueryInterface(Ci.nsIFileProtocolHandler).getURLSpecFromFile(aFile);
		var uri = Services.io.newURI(fileURL, null, null);

		if (this.sss.sheetRegistered(uri, this.SHEET)) {
			// すでにこのファイルが読み込まれている場合
			if (!isEnable || !isExists) {
				this.sss.unregisterSheet(uri, this.SHEET);
			}
			else if (isForced) {
				// 解除後に登録し直す
				this.sss.unregisterSheet(uri, this.SHEET);
				this.sss.loadAndRegisterSheet(uri, this.SHEET);
			}
		} else {
			// このファイルは読み込まれていない
			if (isEnable && isExists) {
				this.sss.loadAndRegisterSheet(uri, this.SHEET);
			}
		}
		if (this.lastModifiedTime !== 1 && isEnable && isForced) {
			log(this.leafName + " 的更新已检查。");//の更新を確認しました。
		}
		this.lastModifiedTime = lastModifiedTime;
		return this._enabled = isEnable;
	},
};

function CSSTester(aWindow, aCallback) {
	this.win = aWindow || window;
	this.doc = this.win.document;
	this.callback = aCallback;
	this.init();
}
CSSTester.prototype = {
	sss: Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService),
	preview_code: "",
	saved: false,
	init: function() {
		this.dialog = openDialog(
			"data:text/html;charset=utf8,"+encodeURIComponent('<!DOCTYPE HTML><html lang="ja"><head><title>CSSTester</title></head><body></body></html>'),
			"",
			"width=550,height=400,dialog=no");
		this.dialog.addEventListener("load", this, false);
	},
	destroy: function() {
		this.preview_end();
		this.dialog.removeEventListener("unload", this, false);
		this.previewButton.removeEventListener("click", this, false);
		this.saveButton.removeEventListener("click", this, false);
		this.closeButton.removeEventListener("click", this, false);
	},
	handleEvent: function(event) {
		switch(event.type) {
			case "click":
				if (event.button != 0) return;
				if (this.previewButton == event.currentTarget) {
					this.preview();
				}
				else if (this.saveButton == event.currentTarget) {
					this.save();
				}
				else if (this.closeButton == event.currentTarget) {
					this.dialog.close();
				}
				break;
			case "load":
				var doc = this.dialog.document;
				doc.body.innerHTML = '\
					<style type="text/css">\
						:not(input):not(select) { padding: 0px; margin: 0px; }\
						table { border-spacing: 0px; }\
						body, html, #main, #textarea { width: 100%; height: 100%; }\
						#textarea { font-family: monospace; }\
					</style>\
					<table id="main">\
						<tr height="100%">\
							<td colspan="4"><textarea id="textarea"></textarea></td>\
						</tr>\
						<tr height="40">\
							<td><input type="button" value="Preview" /></td>\
							<td><input type="button" value="Save" /></td>\
							<td width="80%"><span class="log"></span></td>\
							<td><input type="button" value="Close" /></td>\
						</tr>\
					</table>\
				';
				this.textbox = doc.querySelector("textarea");
				this.previewButton = doc.querySelector('input[value="Preview"]');
				this.saveButton = doc.querySelector('input[value="Save"]');
				this.closeButton = doc.querySelector('input[value="Close"]');
				this.logField = doc.querySelector('.log');

				var code = "@namespace url(" + this.doc.documentElement.namespaceURI + ");\n";
				code += this.win.location.protocol.indexOf("http") === 0?
					"@-moz-document domain(" + this.win.location.host + ") {\n\n\n\n}":
					"@-moz-document url(" + this.win.location.href + ") {\n\n\n\n}";
				this.textbox.value = code;
				this.dialog.addEventListener("unload", this, false);
				this.previewButton.addEventListener("click", this, false);
				this.saveButton.addEventListener("click", this, false);
				this.closeButton.addEventListener("click", this, false);

				this.textbox.focus();
				let p = this.textbox.value.length - 3;
				this.textbox.setSelectionRange(p, p);

				break;
			case "unload":
				this.destroy();
				this.callback(this);
				break;
		}
	},
	preview: function() {
		var code = this.textbox.value;
		if (!code || !/\:/.test(code))
			return;
		code = "data:text/css;charset=utf-8," + encodeURIComponent(this.textbox.value);
		if (code == this.preview_code)
			return;
		this.preview_end();
		var uri = Services.io.newURI(code, null, null);
		this.sss.loadAndRegisterSheet(uri, Ci.nsIStyleSheetService.AGENT_SHEET);
		this.preview_code = code;
		this.log("Preview");
	},
	preview_end: function() {
		if (this.preview_code) {
			let uri = Services.io.newURI(this.preview_code, null, null);
			this.sss.unregisterSheet(uri, Ci.nsIStyleSheetService.AGENT_SHEET);
			this.preview_code = "";
		}
	},
	save: function() {
		var data = this.textbox.value;
		if (!data) return;

		var fp = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
		fp.init(window, "", Ci.nsIFilePicker.modeSave);
		fp.appendFilter("CSS Files","*.css");
		fp.defaultExtension = "css";
		if (window.UCL)
			fp.displayDirectory = UCL.FOLDER;
		var res = fp.show();
		if (res != fp.returnOK && res != fp.returnReplace) return;

		var suConverter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
		suConverter.charset = "UTF-8";
		data = suConverter.ConvertFromUnicode(data);
		var foStream = Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream);
		foStream.init(fp.file, 0x02 | 0x08 | 0x20, 0664, 0);
		foStream.write(data, data.length);
		foStream.close();
		this.saved = true;
	},
	log: function() {
		this.logField.textContent = new Date().toLocaleFormat("%H:%M:%S") + ": " + $A(arguments);
	}
};

UCL.init();

function $(id) { return document.getElementById(id); }
function $A(arr) Array.slice(arr);
function $C(name, attr) {
	var el = document.createElement(name);
	if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
	return el;
}

function log() { Application.console.log(Array.slice(arguments)); }



// 通过手动更新 toolbar 的 currentSet 特性来添加按钮到 toolbar 里，使得按钮可拖动
/*
  var updateToolbar = {
	runOnce: function() {
		var toolbars = document.querySelectorAll("TabsToolbar");//toolbar//无需改为"addon-bar"
		Array.slice(toolbars).forEach(function (toolbar) {
			var currentset = toolbar.getAttribute("currentset");
			if (currentset.split(",").indexOf("usercssloader_menubtn") < 0) return;   //按钮 ID  
			toolbar.currentSet = currentset;
			try {
				BrowserToolboxCustomizeDone(true);
			} catch (ex) {
				}
		});
	},
  }
  updateToolbar.runOnce(); */
})();
