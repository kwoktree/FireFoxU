// ==UserScript==
// @name           Switch Proxy
// @namespace   switchProxy@slimx.com
// @description    快速切换代理状态,编辑pac文件
// @version        3.0.6.6
// @updateURL     https://j.mozest.com/ucscript/script/30.meta.js
// ==/UserScript==
var proxySwitcher = new function () {
    //文本编辑器的路径
    var editorPath = "C:\\Windows\\notepad.exe";
    //pac文件的路径
    var pacPath = "C:\\Windows\\iProxy.pac";
    //自动重载当前页面
    var autoReload = true;
    //指定代理使用的端口
    var ports = {"Proxom:1218":1218, "Proxom:8080":8080, "GTunnel:8081":8081, "GTunnel:8082":8082, "WallProxy:8086":8086, "GAE:8087":8087, "Proxy:8088":8088, "Privoxy:8118":8118, "FreeG:8580":8580, "WuJie:9666":9666, "AdvOR:9050":9050, "Tor:9051":9051 };
    //------------------------------------------------------------------------------------------------------------------

    var labels = ["Direct", "Proxy", "Auto"];

    function $E(/**String*/ parent, /**String*/ content) {
        var range = document.createRange();
        range.selectNodeContents($(parent));
        range.collapse(false);
        range.insertNode(range.createContextualFragment(content.replace(/\n|\t/g, '')));
        range.detach();
    }

    function $(e) {
        return document.getElementById(e);
    }

    function getValue() {
        return gPrefService.getIntPref("network.proxy.type");
    }

    function setLabel(index) {
        $("proxySwitcher").setAttribute("label", labels[index]);

    }

    this.onPopup = function (event) {
        //todo
        var value = getValue();
        if (value == 0) {
            event.target.children[2].setAttribute("checked", true);
        } else if (value == 2) {
            event.target.children[3].setAttribute("checked", true);
        } else if (value == 1) {
            var port = gPrefService.getIntPref("network.proxy.http_port");
            Object.keys(ports).forEach(function (item, index) {
                if (ports[item] == port) {
                    event.target.children[index + 4].setAttribute("checked", true);
                }
            })
        }

    }

    this.switchP = function (index, port) {
        //change port
        if (index == 1) {
            gPrefService.setIntPref('network.proxy.http_port', port);
        }
        gPrefService.setIntPref('network.proxy.type', index);
        setLabel(index);
    }


    this.editPac = function () {
        const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].
            getService(Components.interfaces.nsIClipboardHelper);
        gClipboardHelper.copyString("if (shExpMatch(url, '*" + content.document.location.hostname + "/*')) return PROXY;");

        var appFile = Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
        appFile.initWithPath(editorPath);
        var application = Components.classes["@mozilla.org/process/util;1"].createInstance(Components.interfaces.nsIProcess);
        application.init(appFile);

        var file = Components.classes["@mozilla.org/file/local;1"].
            createInstance(Components.interfaces.nsILocalFile);
        file.persistentDescriptor = pacPath;
        var time0 = file.lastModifiedTime;

        application.runwAsync([pacPath], 1, {observe:function (subject, topic, data) {
            if (topic = "process-finished") {
                setTimeout(function () {
                    file.persistentDescriptor = pacPath;
                    if (file.lastModifiedTime == time0)return;
                    //reloadpac
                    var pps = Components.classes['@mozilla.org/network/protocol-proxy-service;1'];
                    if ("nsPIProtocolProxyService" in Components.interfaces) {
                        //linux
                        var url = navigator.preference("network.proxy.autoconfig_url");
                        pps = pps.getService(Components.interfaces.nsPIProtocolProxyService);
                        pps.configureFromPAC(url);
                    } else {
                        //win
                        pps = pps.getService();
                        pps.reloadPAC();
                    }
                    if (autoReload)gBrowser.reloadTab(gBrowser.selectedTab);
                }, 1000);
            }
        }
        });
    }


    this.init = function () {
        $E("status-bar", '<statusbarpanel id="proxySwitcher"\
        context="proxySwitcherPopup"\
        class="statusbarpanel-iconic-text"\
        label="proxy"/>');


        var menuString = '<menupopup id="proxySwitcherPopup"\
                        onpopupshowing="proxySwitcher.onPopup(event)">\
                            <menuitem label="Edit Pac" oncommand="proxySwitcher.editPac()"/>\
                            <menuseparator/>\
                            <menuitem label="Direct"\
                            type="radio"\
                            name="proxySwitcherGroup"\
                            oncommand="proxySwitcher.switchP(0)"/>\
                            <menuitem label="Auto"\
                            type="radio"\
                            name="proxySwitcherGroup"\
                            oncommand="proxySwitcher.switchP(2)"/>';

        Object.keys(ports).forEach(function (item) {
            menuString += '<menuitem label="' + item + '"\
                                       type="radio"\
                                       name="proxySwitcherGroup"\
                                       oncommand="proxySwitcher.switchP(1,' + ports[item] + ')"/>';

        });
        menuString += '</menupopup>';
        $E("mainPopupSet", menuString)

        setLabel(getValue());
    }

}
proxySwitcher.init();

