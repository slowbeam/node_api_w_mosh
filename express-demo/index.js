const express = require('express');
const app = express();
const logger = require('./logger');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger("Morgan enabled...");
}

app.use(logger);

app.use(function(req, res, next) {
    console.log("Authenticating...");
    next();
});

// Routes
app.use('/api/courses', courses);
app.use('/', home);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})