var express = require('express'); 
var app = express(); 
var config =  require("./configReader");
var webscraper = require("./webscraper");
var parser = require("./xmlParser");
var pathReader = require("./pathReader");
var fs = require("fs");
var http = require('http');
var path = require("path");
const router = express.Router();
app.use(express.static(path.join(__dirname, '/public')));
// Creates a server which runs on port 3000 and  
// can be accessed through localhost:3000 
app.listen(3001, function() { 
    console.log('server running on port 3000'); 
    console.log(path.join(__dirname, '/public'));
} ) 
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '//index.html'));
});
router.get('/info',fileRead);

function fileRead(req, res){
    //res.writeHead(200, {'Content-Type': 'application/json'}); 
    const csv=require('csvtojson')
        csv()
        .fromFile("D://adbuth//info.csv")
        .then((jsonObj)=>{
            
            res.send(jsonObj); 
            res.end();
        })
}  

app.use('/', router);
