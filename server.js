const express = require('express')
const app = express()
// var loginController = require('./controller/loginController');
app.set('view-engine','ejs')
app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.render('index1.ejs')
})
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
app.get('/insight',(req,res)=>{
    res.render('insight.ejs')
})
app.get('/map',(req,res)=>{
    res.render('map.ejs')
})
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mydb");
var nameSchema = new mongoose.Schema({
    uname: String,
    email: String,
    upass: String,
    messagea: String,
    messageb: String
    
},{collection: 'Employee'});
var User = mongoose.model("User", nameSchema);

//--------------------------------------------------------------------
app.get('/insight', function(req, res){
	user.find({}, function(err, docs){
		if(err) res.json(err);
		else    res.render('insight', {users: 'ramo'});
	});
});
//--------------------------------------------------------------------------------
app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.render('insight.ejs');
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
        
});
// loginController(app);
app.listen(3000)
app.use(express.static('views'));