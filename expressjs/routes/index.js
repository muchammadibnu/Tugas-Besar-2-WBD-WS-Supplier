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
    db.DB().query('SELECT namaBahan, hargaSatuan FROM bahan', function (err, rows, fields) {
      if (err) throw err;
      if(!req.query.harga){
        let result = [];
        rows.forEach(element => {
          result = [...result, element.namaBahan]
        });
        res.json({"daftarbahan" : result})
        res.end();
        return;
      }
      else if(req.query["harga"] == "true"){
        res.json({"daftarbahan": rows});
        res.end()
        return
      }
      else{
        res.status(400).json({"message" : "request content has not been found. Please check endpoint syntaxt again."})
        res.end()
      }
    });
  }
  catch(err){
    res.status(500).json({"message": err});
    return;
  }
})

router.post('/beliBahan', function(req,res,next){
  try{
    db.DB().query('SELECT * FROM bahan', function (err, rows, fields) {
      if (err){
        throw err;
      }
      if(rows.length > 0){
        if(req.body.uang && req.body.bahan){
          if(!req.body.uang){
            res.status(400).json({"message": "there is no input 'uang'"})
            res.end()
            return
          }
          else if(typeof req.body.uang != "number"){
            res.status(400).json({"message": "error type of 'uang' must be number"})
            res.end()
            return
          }
          var uang = req.body.uang;
          let check = true;
          if(req.body.bahan){
            for (bahan of req.body.bahan){
              if(typeof bahan["nama"] == "string"){
                check = true;
                for (row of rows){
                  if(row["namaBahan"] == bahan["nama"]){
                    if(typeof bahan.jumlah == "number"){
                      uang -= row.hargaSatuan * bahan.jumlah;
                      check = false;
                    }
                    else{
                      res.status(400).json({"message": "error type of jumlah must be number"})
                      res.end()
                      return
                    }
                  }
                }
                if (check){
                  res.status(406).json({"message": "bahan "+bahan.nama+" tidak ditemukan"});
                  res.end();
                  return;
                }
              }
              else{
                res.status(400).json({"message":"error type of 'nama' must be string"})
                res.end()
                return
              }
            }
          }
          else{
            res.status(400).json({"message": "there is no input 'bahan'"})
            res.end()
            return
          }
        }
        else{
          if(typeof req.body == "object"){
            res.status(400).json({"message": "there is no input 'uang' and 'bahan'"})
            res.end()
            return
          }
          else{
            res.status(400).json({"message": "type of body request must be object"})
            res.end()
            return
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
