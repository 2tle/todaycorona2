var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var main = require('./main');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ieelte',
  password : '',
  database : 'cov_db'
});
connection.connect();
/* GET home page. */

router.get('/' ,(req,res) => {
    
    res.render('ejs/main');
});

router.get('/scjList', (req,res) => {
    res.render('ejs/saibilist');
});

router.get('/worldView', (req,res) => {
    res.render('ejs/world');
});

router.get('/worldViewGETGET', (req,res) => {
    connection.query('SELECT * FROM world_tb' , (err,rows,fields) => {
        if(!err) {
            var country = rows[0].str.split('@');
            var data = rows[0].gam.split('@');
            var returntext = "";
            var count = country.length;
            for(var i = 0; i < count; i++) {
                var tmp = '<tr><th scope="row">'+country[i]+'</th><td>'+data[i]+'</td></tr>';
                returntext = returntext + tmp;
            }
            res.send(returntext);
        }
    });
    
});

router.get('/robots.txt/', (req,res) => {
    res.send('User-agent: * Allow:/');
});
router.get('/update/local/:id' ,(req,res) => {
    if(req.params.id == "ieelte") {
        res.render('ejs/update');
    } else {
        res.render('err/404');
    }
});
router.get('/uploadlocal',(req,res) => {
    var querystr = "UPDATE loca_tb SET seoul = '"+req.query.seoul+"', busan = '"+req.query.busan+"', daegu = '"+req.query.daegu+"', incheon = '"+req.query.incheon+"', gwangju = '"+req.query.gwangju+"', daejeon = '"+req.query.daejeon+"', ulsan = '"+req.query.ulsan+"', sejong = '"+req.query.sejong+"', gyeonggi = '"+req.query.gyeonggi+"', kyeongwon = '"+req.query.kyeongwon+"', chungbuk = '"+req.query.chungbuk+"', chungnam = '"+req.query.chungnam+"', jeonbuk = '"+req.query.jeonbuk+"', jeonnam = '"+req.query.jeonnam+"', kyeongbuk = '"+req.query.kyeongbuk+"', kyeongnam = '"+req.query.kyeongnam+"', jeju = '"+req.query.jeju+"', allall = '"+req.query.all+"' ";
    connection.query(querystr, (err,resulttt,fieldss) => {
        if(!err) {
            res.redirect('https://www.naver.com');
        } else {
            res.redirect('https://www.google.com');
        }
    });
});
router.get('/locaView',(req,res) => {
    connection.query("SELECT * FROM loca_tb", (err,rows,fields) => {
         if(!err) {
             res.render('ejs/loca', {
                 'seoul' : rows[0].seoul,
                 'busan' : rows[0].busan,
                 'daegu' : rows[0].daegu,
                 'incheon' : rows[0].incheon,
                 'gwangju' : rows[0].gwangju,
                 'daejeon' : rows[0].daejeon,
                 'ulsan' : rows[0].ulsan,
                 'sejong' : rows[0].sejong,
                 'gyeonggi' : rows[0].gyeonggi,
                 'kyeongwon' : rows[0].kyeongwon,
                 'chungbuk' : rows[0].chungbuk,
                 'chungnam' : rows[0].chungnam,
                 'jeonbuk' : rows[0].jeonbuk,
                 'jeonnam' : rows[0].jeonnam,
                 'kyeongbuk' : rows[0].kyeongbuk,
                 'kyeongnam' : rows[0].kyeongnam,
                 'jeju' : rows[0].jeju
             });
         }
    });
});
module.exports = router;
