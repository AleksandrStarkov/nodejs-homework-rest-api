const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const auth = require('./middlewares/auth');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const publicPath = path.join(__dirname, 'public');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', auth, contactsRouter);
app.use('/users', usersRouter);

app.use(express.static(publicPath));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
