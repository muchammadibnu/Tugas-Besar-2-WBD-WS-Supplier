var express = require('express');
const { RequestHeaderFieldsTooLarge } = require('http-errors');
var db = require('../db/db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getdaftarBahan', function(req,res,next){
  try{
    db.DB().query('SELECT * FROM bahan', function (err, rows, fields) {
      if (err) throw err;
      res.json({"daftarbahan": rows});
    });
  }
  catch(err){
    res.status(500).json({"message": err});
    return;
  }
})

router.post('/beliBahan', function(req,res,next){
  var uang = req.body.uang;
  let check = true;
  try{
    db.DB().query('SELECT * FROM bahan', function (err, rows, fields) {
      if (err){
        throw err;
      }
      if(rows.length > 0){
        for (bahan of req.body.bahan){
          check = true;
          for (row of rows){
            if(row["namaBahan"] == bahan["nama"]){
              uang -= row.hargaSatuan * bahan.jumlah;
              check = false;
            }
          }
          if (check){
            res.status(406).json({"message": "bahan "+bahan.nama+" tidak ditemukan"});
            res.end();
            return;
          }
        }
      }
      if (uang < 0){
        res.status(400).json({"uang" : uang*-1, "message": "gagal"});
        res.end();
        return;
      }
      
      res.json({"uang" : uang, "message": "berhasil"});
      res.end();
    })
  }
  catch (err){
    res.status(500).json({"message": err});
    res.end();
    return;
  }
})

module.exports = router;
