// ==UserScript==
// @name           WebScreenShot.uc.xul
// @namespace      http://d.hatena.ne.jp/Griever
// @include        main
// @version        0.0.2
// ==/UserScript==


document.getElementById('contentAreaContextMenu').addEventListener('popupshowing', function func(event) {
	if (event.target != event.currentTarget) return;
	document.getElementById('WebScreenShotOnImage').hidden = !gContextMenu.onImage && !gContextMenu.onCanvas;
}, false);


window.WebScreenShot = function(){
	this.init();
};


window.WebScreenShot.prototype = {
	init: function() {
		this.browser = gBrowser.mCurrentBrowser;
		this.statusField = document.getElementById('statusbar-display');
	},

	handleEvent: function(event) {
		switch(event.type) {
			case 'mousedown':
				this.browser.removeEventListener('mousedown', this, true);
				this.x = event.screenX;
				this.y = event.screenY;
				this.innerTop = content.mozInnerScreenY;
				this.innerLeft = content.mozInnerScreenX;
				this.innerBottom = this.innerTop + content.innerHeight;
				this.innerRight = this.innerLeft + content.innerWidth;
				this.box.openPopupAtScreen(this.x, this.y);
				this.browser.addEventListener('mousemove', this, true);
				this.browser.addEventListener('mouseup', this, true);
				break;

			case 'mousemove':
				var moveX = event.screenX;
				var moveY = event.screenY;
				
				if (moveX <= this.innerLeft) moveX = this.innerLeft;
				else if (moveX >= this.innerRight) moveX = this.innerRight;
				if (moveY <= this.innerTop) moveY = this.innerTop;
				else if (moveY >= this.innerBottom) moveY = this.innerBottom;
				if (this.x > moveX || this.y > moveY)
					this.box.moveTo(this.x > moveX? moveX : this.x, this.y > moveY? moveY : this.y);
				this.box.width  = Math.abs(moveX - this.x);
				this.box.height = Math.abs(moveY - this.y);
				this.statusField.label = this.box.width + 'x' + this.box.height;
				break;

			case 'mouseup':
				this.browser.removeEventListener('mousemove', this, true);
				this.browser.removeEventListener('mouseup', this, true);
				var borderWidth = Math.round( (this.box.boxObject.width - this.box.clientWidth) / 2);
				var x = this.box.boxObject.screenX - content.mozInnerScreenX + content.scrollX + borderWidth;
				var y = this.box.boxObject.screenY - content.mozInnerScreenY + content.scrollY + borderWidth;
				var w = this.box.boxObject.width  - borderWidth;
				var h = this.box.boxObject.height - borderWidth;
				this.capture(content, x, y, w, h);
				this.box.removeEventListener('popuphiding', this, false);
				this.box.parentNode.removeChild(this.box);
				this.resetCursor();
				break;

			case 'mouseover':
				this.target = event.target;
				this.highlight();
				this.relatedTarget = this.target;
				this.statusField.label = this.target.offsetWidth + 'x' + this.target.offsetHeight;
				break;

			case 'click':
				this.relatedTarget = this.target;
				this.lowlight();
				var win = this.target.ownerDocument.defaultView;
				var rect = this.target.getBoundingClientRect();
				this.capture(win, rect.left + win.scrollX, rect.top + win.scrollY, rect.width, rect.height, false);
				
				this.browser.removeEventListener('mouseover', this, true);
				this.browser.removeEventListener('click', this, true);
				break;

			case 'popuphiding':
				break;
		}
		event.preventDefault();
		event.stopPropagation();
	},

	highlight: function() {
		if (this.relatedTarget) 
			this.lowlight();
		this.defStyle = this.target.getAttribute('style');
		this.target.style.setProperty('outline', '2px solid red', 'important');
		this.target.style.setProperty('outline-offset', '1px', 'important');
	},

	lowlight: function() {
		if (this.defStyle == null)
			this.relatedTarget.removeAttribute('style');
		else 
			this.relatedTarget.setAttribute('style', this.defStyle || '');
	},

	getWindowList: function() {
		this.windowList = (function(win) {
			var array = win.document.body instanceof HTMLFrameSetElement? []: [win];
			for (var i = 0, l = win.frames.length; i < l; i++) {
				array.push.apply(array, arguments.callee(win.frames[i]));
			}
			return array;
		})(window.content);
	},

	setCursor: function() {
		this.rootList = this.windowList.map(function(win) win.document.documentElement);
		this.rootList.forEach(function(root) {
			root.style.setProperty('cursor', 'crosshair', 'important');
		});
	},
	
	resetCursor: function() {
		this.rootList.forEach(function(root){
			if (root)
				root.style.setProperty('cursor', '', '');
		});
	},

	capture: function(win, x, y, w, h) {
		var tab = gBrowser.addTab();
		var browser = gBrowser.getBrowserForTab(tab);
		browser.addEventListener('load', function(event) {
			browser.removeEventListener('load', arguments.callee, true);
			var doc = browser.contentDocument;
			var canvas = doc.body.appendChild(doc.createElement('canvas'));
			canvas.style.display = 'inline';
			canvas.width = w;
			canvas.height = h;
			var ctx = canvas.getContext("2d");
			ctx.drawWindow(win, x, y, x + w, y + h, "rgb(255,255,255)");
			gBrowser.selectedTab = tab;
		}, true);
	},

	imageCapture: function(img) {
		var base64;
		if (img instanceof HTMLCanvasElement) {
			base64 = img.toDataURL("image/png");
		} else {
			var scrollbox = document.createElement('scrollbox');
			scrollbox.hidden = true;
			document.documentElement.appendChild(scrollbox);
			var canvas = scrollbox.appendChild( document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas') );
			canvas.style.display = 'inline';
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(img, 0, 0);
			base64 = canvas.toDataURL("image/png");
			scrollbox.parentNode.removeChild(scrollbox);
		}
		Cc['@mozilla.org/widget/clipboardhelper;1'].getService(Ci.nsIClipboardHelper).copyString(base64);
		alert('\u5DF2\u590D\u5236\u56FE\u8C61BASE64\u7F16\u7801\u5230\u526A\u8D34\u677F');
	},

	clickCapture: function() {
		this.browser.addEventListener('mouseover', this, true);
		this.browser.addEventListener('click', this, true);
	},

	clippingCapture: function() {
		this.box = document.createElement('tooltip');
		this.box.style.cssText = [
			'-moz-appearance: none;',
			'background-color: rgba(0, 0, 0, 0.05);',
			'max-width: none;',
			'padding: 0;',
			'margin: 0;',
			'border: 1px dashed #00FF00;',
			'cursor: crosshair;'
		].join(' ');
		this.box.width = 1;
		this.box.height = 1;
		document.getElementById('mainPopupSet').appendChild(this.box);
		this.browser.addEventListener('mousedown', this, true);
		this.box.addEventListener('popuphiding', this, false);
		
		this.getWindowList();
		this.setCursor();
	},

	pageCapture: function() {
		this.capture(content, content.scrollX, content.scrollY, content.innerWidth, content.innerHeight);
	},

	fullCapture: function() {
		this.capture(content, 0, 0, content.innerWidth + content.scrollMaxX, content.innerHeight + content.scrollMaxY);
	},
};



//Statusbar

(function(){
    var WebScreenShotPopup =document.createElement("menupopup");
    WebScreenShotPopup.setAttribute("id","WebScreenShotPopupid");

    var label1=document.createElement("menuitem");
    label1.setAttribute("label","\u6355\u83B7\u6574\u4E2A\u9875\u9762");
    label1.setAttribute("oncommand","new WebScreenShot().fullCapture()");

    var label2=document.createElement("menuitem");
    label2.setAttribute("label","\u6355\u83B7\u5F53\u524D\u90E8\u5206\u7684\u9875\u9762");
    label2.setAttribute("oncommand","new WebScreenShot().pageCapture();");

    var label3=document.createElement("menuitem");
    label3.setAttribute("label","\u9009\u62E9\u7F51\u9875\u533A\u57DF");
    label3.setAttribute("oncommand","new WebScreenShot().clippingCapture();");

    var label4=document.createElement("menuitem");
    label4.setAttribute("label","\u5355\u51FB\u6355\u83B7\u5143\u7D20");
    label4.setAttribute("oncommand","new WebScreenShot().clickCapture();");


    WebScreenShotPopup.appendChild(label1);
    WebScreenShotPopup.appendChild(label2);
    WebScreenShotPopup.appendChild(label3);
    WebScreenShotPopup.appendChild(label4);

    var statusbarW = document.getElementById("TabsToolbar");
    var WebScreenShot = document.createElement("toolbarbutton");
    WebScreenShot.setAttribute("id","WebScreenShot");
    WebScreenShot.setAttribute("class","toolbarbutton-1 chromeclass-toolbar-additional");
    WebScreenShot.setAttribute("type", "menu");
    WebScreenShot.style.listStyleImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jb3T20vTcRjH8S9410X/Q9BNUGYeEg0sKQjSopMlqamoy4V4LDO7SJ3BCl3g8rDllvvl8TdPc3PiDv6c03T7be4kLrUprHBUEy1MbU4/XURC4IVXvuF18zzP7UPIYUbTSSGT7oqMCXdFBk0nhewtlBbOkYMwzD6LM86UmwyuErNu+kEMIYQQxvH0EeMo/TRiL1kcsRd7Rh2lnjFn+X8MzjIPY3+8qLMVetRs1qzKlDY3aE53qkypCURrKXJa5hvgW2HhW2ExvSCCzlqMEdsT6G2l0FiLYHRVweiqwuBUNroNt9A/kQLFRCoU4ynviWqSa/Gt2PCvr6suqKfyMGwuxpApH/OfVQhsryMQXMfGlh/mWSE6ddcgH70Dmkl6RxTGh+yYnY+lZQOWlsdgdLyCcjwP/WMcWD9KAOzAsSiG3lYAt5fG7u4ONKYyUENX0Ka5ISX9TC7bw3Ag12dCrs9EL8NB3ygXssHrWP5ux5xXBa2lDP4fs1B+yMWXb2bMe7UQ98VDOpAoJbQmi6W1OaC1OZDrOOjSZkOiSMQbOg4+/wys7nZ06/LgX10CpUzGglePea8Wwq5YNPVckpL2wftsmzoD7UOZaFOno1F+GXUdcailosCwAgS2N0EPF0AguwCV4Tl2drbRzxRD0BoNYed5KWlR3GMpZRpkAymoa7+IGlkMBNQ51MhiUNMSDZOLwu/AL6z9XMbG1hpGTALwpeGopWJRI4uVEknvXaekLxmvqXjwmyPxUnp2D785EtWiUIjkN9Gh5qK+MwE80UnwJVF/b95GtZIm+W2xQBYf4InCgi/EEfsID1Y2ngpW1J8IVjWG7s2rxRGbPFEElwipq8d4oggurym0oKrxTP6BNIQVVjaczqyoO370UJ9x3/4A8q8Gzo1jnwwAAAAASUVORK5CYII=)";
    WebScreenShot.setAttribute("tooltiptext","\u622A\u56FE");

    WebScreenShot.appendChild(WebScreenShotPopup);

    statusbarW.appendChild(WebScreenShot);

var RightMenu = document.getElementById("contentAreaContextMenu");

var labelImg = document.createElement("menuitem");
labelImg.setAttribute("id","WebScreenShotOnImage");
labelImg.setAttribute("label","\u56FE\u7247\u8F6C\u6362\u4E3A\u0020\u0042\u0061\u0073\u0065\u0036\u0034");
labelImg.setAttribute("insertbefore","context-setDesktopBackground");
labelImg.setAttribute("oncommand","new WebScreenShot().imageCapture(gContextMenu.target)");
RightMenu.insertBefore(labelImg,document.getElementById("context-copyimage") );

    })();



