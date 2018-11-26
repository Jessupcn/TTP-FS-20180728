const router = require('express').Router();
module.exports = router;

// require in api files
router.use('/transactions', require('./transactions'));
router.use('/portfolio', require('./portfolio'));
router.use('/user', require('./user'));

// send a 404 status as a fallback
router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
