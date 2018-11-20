const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

const PORT = process.env.PORT || 8080;

// create express.js app
const app = express();
module.exports = app;

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// compression middleware
app.use(compression());

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
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// app listening on a port
app.listen(PORT, () => console.log(`Server online at port ${PORT}`));
