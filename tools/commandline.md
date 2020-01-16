# Terminal Commands & Tricks
- This file covers commands that are used in terminal or general commands.

Note: For mac specific, go to [Mac Commands](tools/mac-commands.md).

## Port 8000 already in use
- Find: `sudo kill -9 $(sudo lsof -t -i:8000)`   
- Or `pkill -If 'manage.py'`
- For Mac, see [here](/tools/mac-commands.md#port-8000-already-in-use)

## chmod cheetsheet
chmod a-w file (removes all writing permissions)   
chmod o+x file (sets execute permissions for other (public permissions))   
chmod u=rx file        (Give the owner rx permissions, not w)   
chmod go-rwx file      (Deny rwx permission for group, others)   
chmod g+w file         (Give write permission to the group)   
chmod a+x file1 file2  (Give execute permission to everybody)   
chmod g+rx,o+x file    (OK to combine like this with a comma)   

u = user that owns the file   
g = group that owns the file   
o = other (everyone else)   
a = all (everybody)   
r = read aces to the file   
w = write access   
x = execute (run) access   

## Ubuntu show/hide hidden files/folders
- `Ctrl + H`

## scp command
### info
- Copy files or directories to and fro local system to target host.
- Find more https://www.linuxtechi.com/scp-command-examples-in-linux/

### Copy a file from local system to remote system using scp
- `scp path-to-local-location remote-host-username@remote-host:/path-to-remote-location`
- Example: `scp jdk-linux-x64_bin.rpm root@172.20.10.8:/opt`

### Copy a file from remote System to local system using scp
- `scp remote-host-username@remote-host:/path-to-remote-location path-to-local-location`
- Example: `scp root@172.20.10.8:/root/Technical-Doc-RHS.odt /tmp`

## Miscellaneous
### Java installed directory in Ubuntu
- `readlink -f $(which java)`

