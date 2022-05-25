const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const { format } = require('timeago.js');

// Initializations
const app = express();
require('./database');

//    <a class="navbar-brand" href="/">INICIO</a>
//    <a class="navbar-brand" href="/reportes">REPORTES</a>


// settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  

 
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});

// routes
app.use(require('./routes'));
app.use(require('./routes/b_pichincha.js'));
app.use(require('./routes/b_guayaquil.js'));
app.use(require('./routes/full_carga.js'));
app.use(require('./routes/reportes.js'));
app.use(require('./routes/prueba.js'));
app.use(require('./routes/papeleria.js'));


// static files
app.use(express.static(path.join(__dirname, 'public')));

// Server is listening
app.listen(app.get('port'), () => {
  console.log('Server on http://localhost', app.get('port'));
  
});
