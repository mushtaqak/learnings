### Port 8000 already in use
- ```sudo kill -9 $(sudo lsof -t -i:8000)```    
- For Mac    
- Find:  ```lsof -i :3000```    
- Kill:  ```kill -9 <PID>```
- Or ```pkill -If 'manage.py'```   

### chmod cheetsheet
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
