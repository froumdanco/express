var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const https = require('https');
const http = require('http');

const request = require('request');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
// Swgger 
var Fingerprint = require('express-fingerprint')




require('./auth/passport');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var settingRouter = require('./routes/setting');
var authRouter = require('./routes/auth');
var bloggroup = require('./routes/dashboard/bloggroup');
var blog = require('./routes/dashboard/blog');
var fileuploader = require('./routes/dashboard/fileuploader');
var chunkfileuploader = require('./routes/dashboard/chunkfileuploader');
var gallery = require('./routes/dashboard/gallery');
const passport = require('passport');

const tags = require('./routes/dashboard/tags');
const telegram = require('./routes/dashboard/telegram');
const setting = require('./routes/dashboard/setting');
const component = require('./routes/dashboard/component')
const usersedit = require('./routes/dashboard/users')


//View
const blogview = require('./routes/view/blogview');
const articleview = require('./routes/view/articleview');
const headerinfomation = require('./routes/view/headerinformation');
const firstpage = require('./routes/view/firstapge');
const tagview = require('./routes/view/tagviews');
// User
const newusers = require('./routes/account/registeruser')
const loginuser = require('./routes/account/login')

const e = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Soof Express Js',
      description: ' ',
      contact: {
        name: 'Afrang.dev Team',
      }
    },
  },
  server: ["http://localhost:8000"],

  apis: ["./routes/*.*", "./routes/account/*.*", "./routes/dashboard/*.*", "./routes/view/*.*"]


}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
var compression = require('compression');

var app = express();
app.use(Fingerprint({
  parameters: [
    // Defaults
    Fingerprint.useragent,
    Fingerprint.acceptHeaders,
    Fingerprint.geoip,

    // Additional parameters
    function (next) {
      // ...do something...
      next(null, {
        'param1': 'value1'
      })

    },
    function (next) {
      // ...do something...
      next(null, {
        'param2': 'value2'
      })
    },
  ]
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression()); //Compress all routes

app.use('/', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/setting', settingRouter);
app.use('/v1/auth', authRouter);
app.use('/v1/dashboard/bloggroup', passport.authenticate("admin-rule", { session: false }), bloggroup);
app.use('/v1/dashboard/blog', passport.authenticate("admin-rule", { session: false }), blog);
app.use('/v1/dashboard/filemanager', passport.authenticate(["admin-rule", "user-rule"], { session: false }), fileuploader);
app.use('/v1/dashboard/chfsubjectunkfileuploader', passport.authenticate(["admin-rule", "user-rule"], { session: false }), chunkfileuploader);
app.use('/v1/dashboard/gallery', passport.authenticate("admin-rule", { session: false }), gallery);
app.use('/v1/dashboard/tags', passport.authenticate("admin-rule", { session: false }), tags);
app.use('/v1/dashboard/telegram', passport.authenticate("admin-rule", { session: false }), telegram);
app.use('/v1/dashboard/setting', passport.authenticate("admin-rule", { session: false }), setting);
app.use('/v1/dashboard/component', passport.authenticate("admin-rule", { session: false }), component);
app.use('/v1/dashboard/usersedit', passport.authenticate("admin-rule", { session: false }), usersedit);
app.use('/v1/dashboard/colors', passport.authenticate("admin-rule", { session: false }), require('./routes/dashboard/colors.js'));
app.use('/v1/dashboard/modestyle', passport.authenticate("admin-rule", { session: false }), require('./routes/dashboard/modestyle'));
app.use('/v1/dashboard/customer', passport.authenticate("admin-rule", { session: false }), require('./routes/dashboard/customeredit.js'));
// Dashborad Froum
app.use('/v1/dashboard/fgroup', passport.authenticate("admin-rule", { session: false }), require('./routes/dashboard/fgroup'));

app.use('/v1/dashboard/fsubject', passport.authenticate("admin-rule", { session: false }), require('./routes/dashboard/fromsubjects'));
//fsubject
// Alboum
app.use('/v1/dashboard/album', passport.authenticate("admin-rule", { session: false }), require('./routes/dashboard/album'));
app.use('/v1/blog', blogview);
app.use('/v1/article', articleview);
app.use('/v1/headerinfomation', headerinfomation);
app.use('/v1/firstpage', firstpage);
app.use('/v1/tagview', tagview);
app.use('/v1/sendrequest', require('./routes/view/request'));
app.use('/v1/contactUs', require('./routes/view/contatcus'));

// Album 
app.use('/v1/album', require('./routes/view/album.js'));
app.use('/v1/fisrtpage', require('./routes/view/firstapge'));
app.use('/v1/fav', require('./routes/view/fav'));

// Froum
app.use('/v1/fgroup', require('./routes/view/fgroup'));
app.use('/v1/fsubject',require('./routes/view/fsubject'));
app.use('/v1/quiz',passport.authenticate("user-rule", { session: false }),require('./routes/view/quiz'));
app.use('/v1/fanswer',require('./routes/view/fanswer'));
app.use('/v1/fanswerquiz', passport.authenticate("user-rule", { session: false }), require('./routes/account/fanswer'));

// User 
app.use('/v1/register', newusers);
app.use('/v1/login', loginuser);
app.use('/v1/user/uploadimage', passport.authenticate("user-rule", { session: false }), require('./routes/account/uploadimage'));
app.use('/v1/user/profile', passport.authenticate("user-rule", { session: false }), require('./routes/account/profile'));
app.use('/v1/user/like', passport.authenticate("user-rule", { session: false }), require('./routes/account/likeuser'));

app.use('/v1/forgetpassword',require('./routes/account/foregetpassword'));

app.use('/v1/confrimpassword',passport.authenticate("user-rule", { session: false }),require('./routes/account/confrim'));

const customers = require('./routes/view/customers');


//
app.use('/v1/test',require('./routes/test'))
var async = require("async");

module.exports = app;
