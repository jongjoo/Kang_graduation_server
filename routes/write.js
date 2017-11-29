var express = require('express');
var router = express.Router();
var async = require('async');
var mysql = require('mysql');
var msg = require('../message.js');

var db_config = require('../config/db_config.json');
var pool = mysql.createPool(db_config);

router.post('/write', function(req, res, next){
         pool.getConnection(function(err,con){
           if (err) {
             console.log("getConnection Error" + err);
             res.sendStatus(500);
         } else {
                   console.log("호스팅완료");
			console.log(req.body);
                 var sqlForInsert = "insert into test (test) values(?)";
                 con.query(sqlForInsert, [req.body], function(err, result){
                         if(err){
                                 console.log('insert error: ', err.message);
                         }
			else{
                                 res.redirect('/');
                 }
		});
         }
         });
});

module.exports = router;
