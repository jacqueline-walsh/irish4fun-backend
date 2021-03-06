const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');



// Connect to Database
 mongoose.connect(config.database,{ useNewUrlParser: true });
//mongoose.connect(config.database)
 // .then(() => console.log("MongoDB Connected..."))
//  .catch(err => console.log(err));

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

const puzzleRoutes = require('./routes/puzzles');

// Port Number
// const port = process.env.port || 9898;
const port = process.env.YOUR_PORT || process.env.PORT || 9898
// CORS Middleware
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.use('/puzzles', puzzleRoutes);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});
