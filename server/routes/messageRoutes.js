const passport = require('passport');

const requireSignin = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.post('/api/messages', requireSignin, (req, res) => {
    console.log(req.body);
  });
};
