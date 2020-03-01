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

router.get('/parse',infoFetcher);
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

function infoFetcher(req, res){
    console.log(req.query.p);
    var files = pathReader.getAllFiles(req.query.p);
    var urls = [];

    parser.req(files,function(urlsreturn){
        urls = urlsreturn;    
        var line ="";
        for(var i=0;i<urls.length;i++){        
            //webscraper.infoFetcher(urls[i].url,urls.length,urls[i].artifact,urls[i].version);
            line = line+urls[i].artifact+","+urls[i].url+","+urls[i].version+"\r\n";
                
        }
        fs.writeFile("mvnurls.txt",line,function(err){
            if(err){
                throw err;
            }
            console.log("saved!");
        })
        //webscraper.infoFetcher(urls[0].url,1,urls[0].artifact,urls[0].version);
    });
    javaFetch(req, res);
}

function javaFetch(req, res){
    var exec = require('child_process').exec, child;
    var req= req;
    var res  = res;
    child = exec('java -jar D:\\adbuth\\jsoupscraper-1.0-SNAPSHOT.jar',function(error, stdout, stderr){
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        fileRead(req,res);
        if(error !== null){
        console.log('exec error: ' + error);
        }
    });    
}  



function javaFetch2(req, res){
    var spawn = require("child_process").spawn; 
	var process = spawn('java',["-jar", "D:\\adbuth\\jsoupscraper-1.0-SNAPSHOT.jar"] );     
    process.stdout.on('data', function(data) { 
        //res.send(data.toString()); 
    } )
    process.stdout.on('close',function(){
        console.log(res);
        console.log("process complete");
    })
}  
app.use('/', router);
