const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./database');
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 8080;

// register passport
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) =>
  db.models.user
    .findById(id)
    .then(user => done(null, user))
    .catch(done)
);

// create express.js app
const app = express();
module.exports = app;

// sync database
db.sync().then(() => console.log('Database is synced'));

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// compression middleware
app.use(compression());

// session middleware with passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'this is a secret session shh',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

// auth and api routes
app.use('/auth', require('./auth'));
app.use('/api', require('./api'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// send 404 for other extensions
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// app listening on a port
app.listen(PORT, () => console.log(`Server online at port ${PORT}`));
