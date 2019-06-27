/*
  The purpose of this file is to allow a server to run on a DEV environment. 
  Without the proxys created, the server would try to use React's port (3000) and 
  not where the server routes are being defined (3090). This isn't a problem on production since they 
  will run on the same port. 
*/

const proxy = require('http-proxy-middleware');
const targetURL = 'http://localhost:3090';

module.exports = function(app) {
  app.use(proxy('/auth/*', { target: targetURL }));
  app.use(proxy('/api/*', { target: targetURL }));
  app.use(proxy('/api/listings/*', { target: targetURL }));
  app.use(proxy('/api/upload/*', { target: targetURL }));
  app.use(proxy('/api/messages/*', { target: targetURL }));
};
