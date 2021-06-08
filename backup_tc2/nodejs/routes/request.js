var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var urlencode = require('urlencode');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '',
  password : '',
  database : 'cov_db'
});
connection.connect();

router.get('/covdata', (req,res) => {
    connection.query("SELECT * FROM main_tb", (err,rows,fields) => {
        if(!err) {
            var rearr = JSON.stringify(rows);
            res.json(rearr);
        }
    });
});
router.get('/saibiL/:address' , (req,res) => {
    var t = urlencode.decode(req.params.address);
    console.log(t);
    connection.query("SELECT * FROM scj_tb WHERE address LIKE '%"+t+"%'", (err, rows, fields) => {
        if(!err) {
	    console.log(rows);
	    var rearr = JSON.stringify(rows);
            res.json(rearr);
        } else {
	    console.log(err);
	}
    });
});
router.get('/chart', (req,res) => {
    connection.query("SELECT * FROM internal_chart_tb", (err,rows,fields) => {
        if(!err) {
            var tmp = JSON.stringify(rows);
            res.json(tmp);
        }
    });
});


module.exports = router;
