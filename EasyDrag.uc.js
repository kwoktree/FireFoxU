// ==UserScript==
// @include      chrome://browser/content/browser.xul
// @name         EasyDrag Gestures
// @description  鼠标拖拽（EasyDrag）
// @author       ziyunfei + SimpleU
// @namespace    http://www.cnblogs.com/ziyunfei/archive/2011/12/20/2293928.html
// @homepage     http://simpleu.googlecode.com/svn/trunk/Firefox/EasyDrag.js
// @version      17:21 2013/8/9
//
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
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function(event) {
	var self = arguments.callee;
	if (!event) {
		["dragstart", "dragover", "drop"].forEach(function(type) {
			gBrowser.mPanelContainer.addEventListener(type, self, false);
		});
		window.addEventListener("unload", function() {
			["dragstart", "dragover", "drop"].forEach(function(type) {
				gBrowser.mPanelContainer.removeEventListener(type, self, false);
			});
		}, false);
		return;
	}
	switch (event.type) {
	case "dragstart":
		{
			self.startPoint = [event.screenX, event.screenY];
			self.sourceNode = event.target;
			event.target.localName == "img" && event.dataTransfer.setData("application/x-moz-file-promise-url", event.target.src);
			break;
		}
	case "dragover":
		{
			self.startPoint && (Components.classes["@mozilla.org/widget/dragservice;1"].getService(Components.interfaces.nsIDragService).getCurrentSession().canDrop = true);
			break;
		}
	case "drop":
		{
			if (self.startPoint && event.target.localName != "textarea" && (!(event.target.localName == "input" && (event.target.type == "text" || event.target.type == "password"))) && event.target.contentEditable != "true") {
				event.preventDefault();
				event.stopPropagation();
				var [subX, subY] = [event.screenX - self.startPoint[0], event.screenY - self.startPoint[1]];
				var [distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
				var direction;
				if (distX > distY) direction = subX < 0 ? "L" : "R";
				else direction = subY < 0 ? "U" : "D";
				if (event.dataTransfer.types.contains("application/x-moz-file-promise-url")) {
					if (direction == "U") {
						//复制图片
						(document.popupNode = content.document.createElement('img')).src = event.dataTransfer.getData("application/x-moz-file-promise-url");
						goDoCommand('cmd_copyImageContents');
						return;
					}
					if (direction == "D") {
						//下载图片
						saveImageURL(event.dataTransfer.getData("application/x-moz-file-promise-url"), null, null, null, null, null, document);
						return;
					}
					if (direction == "L") {
						//搜索相似图片(全部引擎)
						gBrowser.addTab('http://www.tineye.com/search/?pluginver=firefox-1.0&sort=size&order=desc&url=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
						gBrowser.addTab('http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
						gBrowser.addTab('http://www.google.com/searchbyimage?image_url=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
						gBrowser.addTab('http://pic.sogou.com/ris?query=' + encodeURIComponent(event.dataTransfer.getData("application/x-moz-file-promise-url")));
						return;
					}
					if (direction == "R") {
						//复制图片地址
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("application/x-moz-file-promise-url"));
						return;
					}
				} else if (event.dataTransfer.types.contains("text/x-moz-url")) {
					if (direction == "U") {
						//新标签打开链接(前台)
						gBrowser.selectedTab = gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
						return;
					}
					if (direction == "D") {
						//新标签打开链接(后台)
						gBrowser.addTab(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
						return;
					}
					if (direction == "L") {
						//复制链接
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/x-moz-url").split("\n")[0]);
						return;
					}
					if (direction == "R") {
						//下载链接
						saveImageURL(event.dataTransfer.getData("text/x-moz-url").split("\n")[0], null, null, null, null, null, document);
						return;
					}
				} else {
					if (direction == "U") {
						//复制文本
						Components.classes['@mozilla.org/widget/clipboardhelper;1'].createInstance(Components.interfaces.nsIClipboardHelper).copyString(event.dataTransfer.getData("text/unicode"));
						return;
					}
					if (direction == "D") {
						//baidu搜索选中文字(前台)
						gBrowser.selectedTab = gBrowser.addTab('http://www.baidu.com/s?wd=' + event.dataTransfer.getData("text/unicode"));
						return;
					}
					if (direction == "L") {
						//Google翻译文本
						var div = content.document.documentElement.appendChild(content.document.createElement("div"));
						div.style.cssText = "position:absolute;z-index:1000;border-left:solid 0.5px #0000AA;border-top:solid 1px #0000AA;border-right:solid 2.5px #0000AA;border-bottom:solid 2px #0000AA;background-color:white;padding-left:5px;padding: 1pt 3pt 1pt 3pt;font-size: 10pt;color: black;left:" + +(event.clientX + content.scrollX + 10) + 'px;top:' + +(event.clientY + content.scrollY + 10) + "px";
						var xmlhttp = new XMLHttpRequest;
						xmlhttp.open("get", "http://translate.google.cn/translate_a/t?client=t&hl=zh-CN&sl=auto&tl=zh-CN&text=" + event.dataTransfer.getData("text/unicode"), 0);
						xmlhttp.send();
						div.textContent = eval("(" + xmlhttp.responseText + ")")[0][0][0];
						content.addEventListener("click", function() {
							content.removeEventListener("click", arguments.callee, false);
							div.parentNode.removeChild(div);
						}, false);
						return;
					}
					if (direction == "R") {
						//Google搜索选中文字(前台)
						gBrowser.selectedTab = gBrowser.addTab('http://www.google.com/search?q=' + encodeURIComponent(event.dataTransfer.getData("text/unicode")));
						return;
					}
				}
				self.startPoint = 0;
			}
		}
	}
})()
