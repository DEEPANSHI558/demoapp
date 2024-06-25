// setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', createProxyMiddleware({
    target: 'https://3123397atrial.it-cpitrial06-rt.cfapps.us10-001.hana.ondemand.com',
    changeOrigin: true,
  }));
};
