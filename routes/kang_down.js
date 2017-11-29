const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var msg = require('../message.js');


var db_config = require('../config/db_config.json');

var pool = mysql.createPool(db_config);

router.route('/')
    .get(getTemp)
    //.get(getMois)
    //.get(getGas)
    //.get(getSmo)
    //.get(getMove)

    function getTemp(req, res) {
        pool.getConnection(function(error, connection) {
            if (error) {
                console.log("getConnection error" + error);
                res.status(500).send(error);
            } else {
                var sql_Temp = 'select * From kang_live';
                connection.query(sql_Temp, 1, function(error, rows) {
                    if (error) {
                        res.status(500).send(error);
                        console.log(error);
                    } else {
                        res.status(200).send(msg(0, rows));
                    }
                });
                connection.release();
            }
        });
    }

module.exports = router;

