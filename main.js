const express = require('express');
const app = express();
const ejsmate = require('ejs-mate');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./schema.js');
require('dotenv').config();

const port = process.env.PORT || 3000;

// Middleware Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const mongo_url = process.env.MONGO_URI;
mongoose.connect(mongo_url)
  .then(() => console.log('MongoDB connection successful'))
  .catch((err) => console.log('MongoDB connection failed', err));

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.get('/', (req, res) => {
  res.render('main.ejs');
});

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username });
    const registeredUser = await User.register(user, password);
    res.send("User registered successfully!");
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
