module.exports = {

    title: 'MyApp',      // Default title of the pages

    urlmode: 'hash',  // hash - will handle URLs like localhost:8080/#/sub1/sub2
                         // history - common URLs like localhost:8080/sub1/sub2 
                         //           (On production server you should manually set rewrite all requests to index.html)

    proxy:{              // Use proxy endpoint to remote server: http://localhost:8080/api -> http://my.site/api

        enabled: false,                      // Enable | Disable proxy feature    
        endpoints:[
            ['/api' , 'http://localhost:8080']      // Endpoint on local environment , Remote server to handle endpoint 
        ]    

    },


    
    // DO NOT EDIT UNDER THIS LINE    
    proxy_param(){
        if (this.proxy.enabled === false) return {};
        let proxyObj = {}
        this.proxy.endpoints.forEach(e => {
            proxyObj[e[0]] = {
                target: e[1]
            }
        });
        return proxyObj
    },

    is_history(){
        return this.urlmode === 'history';
    }
}