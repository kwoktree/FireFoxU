Minus

FirefoxU��һ�����Ķ��ư棬����Ҫ�㻨�����ʱ��ȥ���ã���������������ϳ��ˡ�

�����ļ�ʹ�ú����÷�����
1.�������������԰汾���°�Firefox
2.��Firefox Setup ���汾�ţ�.exe���Ҽ���ʹ��7z��
3.����coreĿ¼��ctrl+Aȫѡ������ѹ�� "D:\Program Files\FirefoxU" Ŀ¼��
���޴�Ŀ¼���ֶ�������
4.�� FirefoxU.7z ��ѹ����Ŀ¼
5.����FirefoxU.bat������
6.���봴����ݷ�ʽ����˫��@ShortCut.bat
�˲���� ���ô�Ŀ¼��profileΪ����Ŀ¼���������Ժ�ɲ����������С�
�������洴��һ��FirefoxU�Ŀ�ݷ�ʽ

FFĬ�ϵ����ñ���Ŀ¼��
%AppData%\Mozilla
%USERPROFILE%\AppData\Local\Mozilla

��������޸������
�� �� 	        ת��ҳ�涥�� | �����ǰҳ����ˢ����ֹͣ����
�� ��           ת��ҳ��ײ� | �����ҳ���������ʹ�ñ����ƣ����ں�̨�򿪸�����
�� �� 	        ����,�������� | �Զ���ҳ��һҳ  
�� �� 	        ǰ��,������� | �Զ���ҳ��һҳ

������-�� 	ˢ��
���� ��-�� 	ת����߱�ǩҳ
���� ��-�� 	ת���ұ߱�ǩҳ

���� ��-�� 	���ش���
���� ��-�� 	�رյ�ǰ��ǩ
���� ��-�� 	�ָ��ղŹرյı�ǩ

���� ��-�� 	���±�ǩҳ   ��ie��
���� ��-�� 	ҳ��Ŵ�
���� ��-�� 	ҳ����С

���� ��-�� 	���Ƶ�ǰҳ��url+����
���� ��-�� 	��ҳ
���� ��-�� 	��ʾ/������ǩ������

��ס�Ҽ������ 	ҳ����������
��ס������Ҽ� 	ת���¸���ǩҳ | ����ѡ���ı�
��ס�Ҽ����Ϲ��� �����������
��ס�Ҽ����¹��� ����������

������������ 	�˳����ر����д��ڣ���Щ�������´�����ʱ�ᱻ�ָ�
������������    ����һ��
������������    ǿ��ˢ��

������������    ���������


// ����+��	�����ı�
// ����+��	baidu����ѡ������(ǰ̨)
// ����+��	Google�����ı�
// ����+��	Google����ѡ������(ǰ̨)
//
// ����+��	�±�ǩ������(ǰ̨)
// ����+��	�±�ǩ������(��̨)
// ����+��	��������
// ����+��	��������
//
// ͼƬ+��	����ͼƬ
// ͼƬ+��	����ͼƬ
// ͼƬ+��	��������ͼƬ(ȫ������)
// ͼƬ+��	����ͼƬ��ַ

���ĵĳ����ȼ��������£�
CTRL+Z�����رձ�ǩҳ��ͬoperaĬ�����ã���
ALT+P��λ��firefox�����ļ�Ŀ¼��
ALT+C��λ�� chrome�ű�Ŀ¼��
ALT+A���������������
ALT+D���ع�������
f������ݼ��򿪲�������
c������ݼ���ȡ��ҳ����ΪͼƬ��
ALT+R����firefox��
1��2���ּ��л�ǰ���ǩҳ��
z���ˣ�xǰ����
�����->��̳��һҳ��<-��̳��һҳ��
������ݼ���������꽹�㲻���ı������ʱ�ſ�����ʹ�á�
 
if (location == "chrome://browser/content/browser.xul") {
  userChrome.import("SubScript", "UChrm");
 }

�պ�«��ư�� 
rebuild_userChrome.uc.xulΪ�����򿪽ű��ҵ����
          var navBar = document.getElementById("alltabs-button"); //urlbar-icons  status-bar addon-bar searchbar TabsToolbar alltabs-button bookmarks-menu-button
          if (!navBar) return;
          

UserCSSLoader.uc.js �޸ķ���ͬ�ϣ��ҵ���������޸ġ�
        init: function() {
                var navBar = document.getElementById("alltabs-button"); //status-bar  urlbar-icons addon-bar alltabs-button TabsToolbar go-button
                if (!navBar) return;

˫�����ڵ������滻Ϊ��tabs-closebutton����



�����Թ���������ȷ��

 omni.ja\chrome\chrome.manifest �滻Ϊ�ٷ�chrome.manifest
 omni.ja\chrome\ ɾ��en-US�ļ���
 omni.ja\chrome\ �ѹٷ���chrome\zh-CN �ļ��зŽ���
 omni.ja\chrome.manifest�滻Ϊ�ٷ�chrome.manifest


 browser\omni.ja\chrome\chrome.manifest �滻Ϊ�ٷ�chrome.manifest
 browser\omni.ja\chrome\ ɾ��en-US�ļ���
 browser\omni.ja\chrome\ �ѹٷ���chrome\zh-CN �ļ��зŽ���
 browser\omni.ja\chrome.manifest�滻Ϊ�ٷ�chrome.manifest


uc�ű�
autoclick:
ÿ��Ҫ��ͣ������,����������굽��ַ����һ��.
https://g.mozest.com/thread-43522-1-4

autocopy �޸İ棺
https://g.mozest.com/viewthread.php?tid=42980&page=1#pid299093

griever��UserScriptLoader
https://g.mozest.com/thread-41278-1-1

UserCSSLoader.uc
http://bbs.kafan.cn/thread-1549952-1-1.html

UC�ű�-Extension Options Menu.uc.js
http://bbs.kafan.cn/thread-1534385-1-4.html

�﷨������griever��UserCSSLoader��UserScriptLoader
https://g.mozest.com/thread-41278-1-1

youkuantiads.uc.js
https://j.mozest.com/zh-CN/ucscript/script/92/

uc�ű�UA�л�������
http://bbs.kafan.cn/thread-1534937-1-1.html

��ʾ����������������ip�̶���ַ����
http://bbs.kafan.cn/thread-1494914-1-1.html

snapLinks uc�ű�����������
http://bbs.kafan.cn/thread-1494018-1-1.html

js
NetEase News Comments for Greasemonkey
http://userscripts.org/scripts/show/156627


3rd mod
����¥���ű����µ�ַ�����Կ�������ʲôʱ����µġ�
https://github.com/lastdream2013/userChrome
https://github.com/Griever/userChromeJS
https://github.com/alice0775/userChrome.js

ȫ�ű����ٻ��
http://bbs.kafan.cn/thread-1477995-1-1.html
http://pan.baidu.com/share/link?shareid=335007&uk=406074541

����������Դ:
search_enginejump ���޸İ� 130104
http://bbs.kafan.cn/thread-1393405-1-4.html

�̳�:
uc�ű����������ܽ�
http://bbs.kafan.cn/thread-1527234-1-3.html

���/Firefox���������ʾ���������˵����Windowsƽ̨��
http://bbs.kafan.cn/thread-1528636-1-2.html

��20.0.4841��Ĭ�ϲ������޸ĵ��Ż��������ݣ�
//pref("javascript.options.mem.gc_per_compartment", true);
//pref("javascript.options.mem.high_water_mark", 64);
//pref("javascript.options.mem.max", -1);
//pref("javascript.options.gc_on_memory_pressure", true);
//pref("javascript.options.mem.disable_explicit_compartment_gc", true);
//Set max script runtimes to sane values
//pref("dom.max_chrome_script_run_time", 90); //Some addons need ample time!
//pref("dom.max_script_run_time", 20); //Should be plenty for a page script to do what it needs
//pref("browser.sessionstore.privacy_level",1); //�Ự������Щ���ݣ�1 ���������վ��ĻỰ��������ݵȣ�
//pref("browser.cache.memory.enable", true);
//pref("browser.cache.disk.max_entry_size",4096);//�����̻���Ԫ�ش�С��������Ϊ4MB���κδ���4MB��Ԫ�ض������黺��
//pref("browser.cache.disk.smart_size.enabled",false);//�رջ����Զ�����
pref("dom.ipc.plugins.enabled", true); // ���������������plugin-container����ֹ�������.��ɷ�ᵼ���������й�����ua��Ҫ���firefox10��
pref("browser.urlbar.autoFill.typed", true);
pref("browser.urlbar.autoFill", true);
pref("network.dns.disableIPv6", false); //����ipv6
pref("network.http.max-persistent-connections-per-server", 6);
pref("network.http.proxy.pipelining", false); // ������ˮ��- �����һЩ����ʧ�� (406)
pref("browser.download.manager.showWhenStarting", true);
pref("plugin.scan.plid.all", false);  //��ֹFF����ʱ��λ�󲿷�ע����еĲ����·��
user_pref("browser.preferences.animateFadeIn", false);
user_pref("browser.search.openintab", true);
pref("pdfjs.disabled", true);
pref("javascript.options.mem.gc_incremental",true);
pref("image.mem.max_decoded_image_kb", 256000);
pref("network.dnsCacheExpiration", 1800); //TTL 1 hour
pref("network.dnsCacheEntries", 512); //����������飬����ô���Ƿ����Ӱ�� cache 1024 instead of 20

����Ϊ����Ҫ�Ĳ�����
pref("network.http.max-connections",64); // ��Ҫ�������㣬�Ա�֤��ͥ�������������! (FF=256)
pref("network.http.max-persistent-connections-per-proxy", 8);
pref("browser.cache.memory.capacity",-1); //���趯̬�����ڴ滺��
pref("browser.cache.memory.max_entry_size",-1); 
pref("network.http.pipelining.maxrequests", 12);  // �����ˮ��������
//pref("general.useragent.override", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4; rv:20.0.1) Gecko/20130409194949 Firefox/20.0.1");
pref("extensions.update.autoUpdateDefault", false);//���û�ѡ����չ����
pref("image.cache.size", 256000);
pref("browser.sessionstore.privacy_level",1);
pref("browser.urlbar.trimURLs", false); //stop being a derp, Mozilla!��Ҫ���󵼡�
user_pref("extensions.autoDisableScopes", 0);

��Ч��Ĭ�ϲ��Դ��Ĳ�����
pref("network.http.max-connections-per-server",16); // ʹ������ˮ�ߣ����ֵӦ��Сһ��� (FF=15)
user_pref("microsoft.CLR.auto_install", false);
user_pref("security.warn_entering_weak",false);
user_pref("security.warn_viewing_mixed",false);
user_pref("browser.tabs.showSingleWindowModePrefs", true);
user_pref("browser.warnOnRestart", false);
user_pref("toolkit.telemetry.rejected", true);
user_pref("toolkit.telemetry.prompted", 2);
//��Ⱦ�Ż�
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
License=ע�⣡
{
��װ���򼴽���ֹFirezfox��
�뾡�������� D:\Program Files\Firefox �ļ���
}
;Shortcut=D, "Firefox\firefox.exe -profile profile -no-remote", "", "Mozilla Firefox", "Mozilla Firefox", "Firefox\Firefox.exe"
