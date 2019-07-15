### To install an npm package locally:
1. In custom package, Run `npm run build`  
2. In our app, run `npm --save ../path-to-custom-package/custom-package  
3. Or In our package.json, `'custom-package': "file:../path-to-custom-package/custom-package"` and run `npm install`   

### To install an npm package through github:  
1. In custom package, Run `npm run build`   
2. In our package.json, `'custom-package': "github:organization-name/custom-package"` and run `npm install`   

### If there are any new changes in custom module:   
1. we need to create a new build in our custom package.   
> `npm run build`   
2. Delete & Re-install local custom module    
> `rm -rf node_module/custom-package && npm install`   
