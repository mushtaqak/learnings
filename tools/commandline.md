### Port 8000 already in use
- ```sudo kill -9 $(sudo lsof -t -i:8000)```    
- For Mac    
- Find:  ```lsof -i :3000```    
- Kill:  ```kill -9 <PID>```
- Or ```pkill -If 'manage.py'```   
