require('../services/passport');
const Authentication = require('../controllers/authentication');
const passport = require('passport');

const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.post('/auth/signin', requireSignin, Authentication.signin);

  app.post('/auth/signup', Authentication.signup);
};
