const { createProxyMiddleware } = require('http-proxy-middleware');  

module.exports = function(app) {  
  app.use('/api1', createProxyMiddleware({  
    target: 'https://harf.roshan-ai.ir/',  
    changeOrigin: true,  
  }));  
  
  app.use('/api2', createProxyMiddleware({  
    target: 'https://harf-dev.roshan-ai.ir/',  
    changeOrigin: true,  
  }));  
};