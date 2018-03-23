const express = require('express');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const user = require('./model/users.js');
const {app,tokenRoutes} = require('./apiSetup.js')(express,bodyParser,helmet,morgan,jwt);
require('./controller/login.js')(app,user,tokenRoutes);
require('./controller/user.js')(tokenRoutes,user);