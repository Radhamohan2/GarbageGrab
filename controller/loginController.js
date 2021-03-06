var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';
module.exports = (function(app){
  
// Login TO DB==================================================================
  app.post('/demo',urlencodedParser,function(req,res){
   MongoClient.connect(url, function(err, db) {
   db.collection('Employee').findOne({ name: req.body.name}, function(err, user) {
             if(user ===null){
               res.end("Login invalid");
            }else if (user.name === req.body.name && user.pass === req.body.pass){
            res.render('completeprofile',{profileData:user});
          } else {
            console.log("Credentials wrong");
            res.end("Login invalid");
          }
   });
 });
});
//register to DB================================================================
app.post('/regiterToDb',urlencodedParser,function(req,res){
 var obj = JSON.stringify(req.body);
 var jsonObj = JSON.parse(obj);
     res.render('index1.ejs',{loginData:req.body});
  });
  
//register profile to MongoDB================================================================
  app.post('/completeprofile',urlencodedParser,function(req,res){
   var obj = JSON.stringify(req.body);
   console.log("Final reg Data : "+obj);
   var jsonObj = JSON.parse(obj);
      MongoClient.connect(url, function(err, db) {
      db.collection("Employee").insertOne(jsonObj, function(err, res) {
     if (err) throw err;
     console.log("1 document inserted");
     db.close();
      });
       res.render('index1.ejs',{profileData:req.body});
      });
    });
});