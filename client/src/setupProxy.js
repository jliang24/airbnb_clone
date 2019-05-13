const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/auth/*', { target: 'http://localhost:3090' }));
  app.use(proxy('/api/*', { target: 'http://localhost:3090' }));
  app.use(proxy('/api/listings/*', { target: 'http://localhost:3090' }));
  app.use(proxy('/api/upload/*', { target: 'http://localhost:3090' }));
  app.use(proxy('/api/messages/*', { target: 'http://localhost:3090' }));
};
