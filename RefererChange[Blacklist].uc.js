// ==UserScript==
// @name        refererChangerBlacklistVersion
// @include     main
// @include     chrome://browser/content/browser.xul
// @version     1.0.3
// @description Refererの内容を柔軟に書き換えるUserScriptです。
// ==/UserScript==
// ◆設定方法
//   スクリプト内のsites配列（ハッシュ配列）にリファラーを書き換えたいサイトと書き換え方法を指定すれば次回userChrome.jsロード時から書き換えてくれます。
//   sites配列の書き方はハッシュのkeyに書き換え対象のドメインを、valueに書き換え方法を指定して下さい。
// ◇sites配列のvalue指定方法
//   @NORMAL：リファラを変更しない
//   @FORGE：開こうとしているサーバのルートに
//   @ORIGINAL：開こうとしているサイトのURLを送信する
//   @BLOCK : リファラを空にして送信
//   無指定：開こうとしているサーバが別サーバだとそのサーバのルートに、ドキュメントと同じサーバーから開かれたようにする
//   それ以外 : 指定された内容にリファラを書き換える。

var refererChanger = {};
refererChanger.state = true; /* 启动时是否启用 */
refererChanger.enabledTip = "RefererChanger\u7834\u89E3\u56FE\u7247\u5916\u94FE\u5DF2\u5F00\u542F";
refererChanger.disabledTip = "RefererChanger\u7834\u89E3\u56FE\u7247\u5916\u94FE\u5DF2\u5173\u95ED";
refererChanger.enabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADHUlEQVQ4jX3T3U9bBRjH8ZN46d/BhTdk171TSGuTg6aTjHkhZqmF9bBkwY5RUAbtkI6W09EX6JDQClNejlJFNjZlHdIdVEIpzCbCDHUu01EcXU9L4cQs4euVM3PEX/K9/eS5eYTRmZQcnVnLDSgpTZ44ovHnCykpbejLlcvCP4vNrO083t093CuXKe/r/9vuns5OocTgdLrwDBhQUlppr8zAtYfI19bpuj7FaCqEcreb8XU34aQPe/RjHCN3aB35mcclnbCS1p4B/omUVt7XiVx/iOfGTUZXQkz+dI7hlUYiP1q5sizhm7+INPQZ7bENdrQjgNK+ztCN3+mau8rEupsryzYC37+DL/k2nsWT+JPNvBvso2PsHjntgLCy+jyg7esM3/yDztlRPlntoH+pHs93J3DdPs6FW8fxJM5Q39+L69Nf2C7svwgUyjoj3zzCMztHKHmJy0tWum6/Rfu3b9KZOMmHXzmRBq/SPbHF9pMjLniypxOb3yY0dxenEsPz9Vm8CRue+VN88HkT74UCdIwtcWkq+yIgT6S0fElnNJEjNr9NcHad8+56evzVeHyv0nXxBO7xH/DHf8P3xa88OgrYLeq0K2/QOiny/piZbkcNXo+baDSKu6OF0/1mGsKv0dbpIBqN0uPxHtrt9pbKysqXhb7xlJYv6iS3FljYvIXb7yIQCJDL5chmsywuLtIr99IX9LF5b5NsNouqqgQCAURR9AryeErLFw9Ibi0wOBnG2dZKOpPh/IUWxBoRm81GMBikra0Nm81GTU0Np886n6qqisPh0IRBJfUgXyhS3NPx+mQ+6ukhncnwZ17DZHqdRCJBOp0mmUwyPT2NyWQiPLWsqaqKy+XSheH4qncovnYnrKxqjed6D+zSmcN0JoPV7nhaVVWN0WjEYrFgsVgwGo1UVVVTf6rxgaqqNDQ0/PsTgiAIFRUVr4iiuCHLckFRlHw8HicSidDc3IzT6SQSiRCPx1EUJS/LckEUxQ3hP3vJYDAcM5vN961Wa1mSJL2pqemvurq6+tra2ipJkkqSJOlWq7VsNpvvGwyGY38DN9aNRVh5uVwAAAAASUVORK5CYII=";
refererChanger.disabledSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACN0lEQVQ4ja3TS08TURiHcb6UO+MlcWWMJkgILsQYJMRqNEYiBERKIQxSWi5TWlouY0GnMEJr5Sq1qG2qNExpK4kGgkaD9hJa5nRm2tOVf3c1kzaEhW/yrM7JL+/inKqq/zFOr2ia8kZTo4JITK4K8dpYQSR2z9ZgCeC80fRhJvNHUVWoeXpsGYUiLcmwLmxLJWBUEImsqBhdOoBpKQb98hycIgsh3gM+ZoAlYMTtKQceTgbRMvkFhzKFRdgmJcDsEomap7AtH4BZXYNzi8Xs52aMbzXBttmAsbAORl83dPYXaOO+Ik0qAHKewr76C/qVGbhiBoyFGzH88TqMgWtgPtTBHHiAGyMD6JjeRYoUYBEiWoDkKcbXfqNz0YlnkQ4MherBvK9F10Y1nrytBuO/i/qhp+h6voeklC8HJJVi8k0CzOIK2EAfBkMN0G9cRdv6FXT66/D4VSt01hn0uPaRPKqwwZFCwfmSYFfiaBU4MK/vo9/fCMZ3E+0v7+AWO4yO6RD65r6VAyaXSLIyhdOfAudLYmQxhkeGevSaL4Axnoe+uxYG/hPM7h8wzn9HohKQyVG0CZfRMnsJzfxFONpPYYerQZyrgaf3LJoc59A4dgYN1tPlwAAvkmyOIrD/rlRox4Pw5gTinnsI7q5rzhLZAljNBrxIsrmC5tJxJbJUC1gF8WdWyiGnUOTUIohaBFEpiEIhlVXEoSTDuhD995TH3ZF+uzsatAgRwp4g23yETLgjQyf8q8fPX8SIYXU9r0McAAAAAElFTkSuQmCC";

refererChanger.sites = {
    'image.itmedia.co.jp' : '@FORGE',
    '2ch.net' : '@FORGE',
    'imepita.jp' : '@ORIGINAL',
    'tumblr.com' : '@FORGE',
    'photo.store.qq.com' : '@FORGE',
    'img.pconline.com.cn' : '@FORGE',
    'fc2.com' : '@BLOCK',
    'blogs.yahoo.co.jp' : '@BLOCK',
    'hentaiverse.net': '@BLOCK',
    'photo.sina.com.cn':'@BLOCK',
    'qlogo.cn':'@BLOCK',
    'qpic.cn':'@BLOCK',
    'fmn.rrfmn.com' : '@BLOCK',
    'bdstatic.com' : 'http://tieba.baidu.com/',
    'space.wenxuecity.com' : 'http://bbs.wenxuecity.com/',
    'www.autoimg.cn' : 'http://club.autohome.com.cn/',
    'kkkmh.com' : 'http://www.kkkmh.com/',
    'nonie.1ting.com' : 'http://www.1ting.com/',
    'sinaimg.cn' : 'http://blog.sina.com.cn/',
    'yyets.com' : 'http://www.yyets.com/',
    'img.knb.im' : 'http://www.kenengba.com/',
    'tianya.cn' : 'http://bbs.tianya.cn/',
    'baidu-img.cn' : 'http://www.baidu.com/',
    'xici.net' : 'http://www.xici.net/',
    'media.chinagate.com' : 'http://www.wenxuecity.com/',
    'jdstatic.tankr.net' : 'http://jandan.net/',
    'sankakustatic.com' : 'http://chan.sankakucomplex.com/',

    //下はデバッグ用
    //'taruo.net' : 'example.co.jp',
        'postimage.org' : '@FORGE',
        'xunlei.com' : '@BLOCK',
        'hiphotos.baidu.com' : '@FORGE',
        'img.cnbeta.com' : '@FORGE',
        'imgsrc.baidu.com' : '@FORGE',
};
refererChanger.init = function () {
    var tooltiptext = this.state ? this.enabledTip : this.disabledTip;
    var src = this.state ? this.enabledSrc : this.disabledSrc;
    var statusbarpanel = document.createElement("image");
    statusbarpanel.setAttribute("id", "refererChangerTogglePanel");
    statusbarpanel.setAttribute("tooltiptext", tooltiptext);
    statusbarpanel.setAttribute("src", src);
    statusbarpanel.setAttribute("style", "padding: 0px 2px;");
    statusbarpanel.setAttribute("onclick", "event.preventDefault();event.stopPropagation();refererChanger.RCToggle(); "); 
    document.getElementById("urlbar-icons").appendChild(statusbarpanel);
    var os = Cc['@mozilla.org/observer-service;1'].getService(
        Ci.nsIObserverService);
    os.addObserver(this, 'http-on-modify-request', false);

};
refererChanger.RCToggle = function () {
    this.state = !this.state;
    let statusbarpanel = document.getElementById('refererChangerTogglePanel');
    let menuitem = document.getElementById('refererChangerToggle');
    try{
        var tooltiptext = this.state ? this.enabledTip : this.disabledTip;
        var src = this.state ? this.enabledSrc : this.disabledSrc;
        statusbarpanel.setAttribute("tooltiptext", tooltiptext);
        statusbarpanel.setAttribute("src", src);
    }catch(e){}
};
// *********Config End**********
//var statusbarHidden = true;
refererChanger.adjustRef = function (http, site) {
    try {
        var sRef;
        var refAction = undefined;
        for (var i in this.sites) {
            if(site.indexOf(i) != -1){
                refAction = this.sites[i];
                break;
            }
        }

        if (refAction == undefined)
            return true;
        if (refAction.charAt(0) == '@'){
            //下はデバッグ用
            //logs.logStringMessage("ReferrerChanger:  " + http.originalURI.spec + " : "+refAction);
            //logs.logStringMessage("ReferrerChanger:  OriginalReferrer: "+http.referrer.spec);

            switch (refAction){
            case '@NORMAL':
                return true;
                break;
            case '@FORGE':
                sRef = http.URI.scheme + "://" + http.URI.hostPort + "/";
                break;
            case '@BLOCK':
                sRef = "";
                break;
            case '@AUTO':
                return false;
            case '@ORIGINAL':
                sRef = window.content.document.location.href;
                break;
            default:
                //return false;
                break;
            }
        }else if(refAction.length == 0) {
            return true;
        }else{
            sRef= refAction;
        }
        http.setRequestHeader("Referer", sRef, false);
        if (http.referrer)
            http.referrer.spec = sRef;
        return true;
    } catch (e) {}
    return true;
};

refererChanger.observe = function (aSubject, aTopic, aData) {
    if (aTopic != 'http-on-modify-request') return;
    if (!this.state) return;
    var http = aSubject.QueryInterface(Ci.nsIHttpChannel);
    for (var s = http.URI.host; s != ""; s = s.replace(/^.*?(\.|$)/, "")){
        if (this.adjustRef(http, s))
            return;
    }
    if (http.referrer && http.referrer.host != http.originalURI.host)
        http.setRequestHeader('Referer',
            http.originalURI.spec.replace(/[^/]+$/,''), false);
};

refererChanger.unregister = function () {
    var os = Cc['@mozilla.org/observer-service;1'].getService(
        Ci.nsIObserverService);
    os.removeObserver(this, 'http-on-modify-request', false);
};

var added = false;
if (location == "chrome://browser/content/browser.xul") {
    added = true;
    refererChanger.init();
}
window.addEventListener("unload", function () {
    if (location == "chrome://browser/content/browser.xul")
    if (added)
    refererChanger.unregister();
}, false);

