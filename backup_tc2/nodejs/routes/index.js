var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var main = require('./main');
var requestll = require('./request');
var tqqqq = require('events');
tqqqq.EventEmitter.defaultMaxListeners = 51;
/* GET home page. */

router.use('/',main);
router.use('/request',requestll);

module.exports = router;
