Set objShell = CreateObject("Wscript.Shell")
strPath = Wscript.ScriptFullName 
Set objFSO = CreateObject("Scripting.FileSystemObject") 
Set objFile = objFSO.GetFile(strPath) 
strFolder = objFSO.GetParentFolderName(objFile)
strPath = strFolder '��ȡ�ļ���פ�����ļ��е�����·�� 

set WshShell = Wscript.CreateObject("Wscript.Shell") 
strDesktop = WshShell.SpecialFolders("Desktop") 
set oShellLink = WshShell.CreateShortcut(strDesktop & "\FirefoxU.lnk") 
oShellLink.TargetPath = strPath & "\firefox.exe" '����һ����ݷ�ʽ���� 
oShellLink.Arguments="-profile profile --no-remote"
oShellLink.Windowstyle = 1 
oShellLink.Hotkey = "" '���ÿ�ݷ�ʽ�Ŀ�ݼ� 
oShellLink.Description = "Firefox SimpleU Edition" '���ÿ�ݷ�ʽ������ 
oShellLink.WorkingDirectory = strPath
oShellLink.Save 
