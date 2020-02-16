// import express JS module into app 
// and creates its variable. 
var express = require('express'); 
var app = express(); 
var webscraper = require("./webscraper");
var parser = require("./xmlParser");
var pathReader = require("./pathReader");
// Creates a server which runs on port 3000 and  
// can be accessed through localhost:3000 
app.listen(3000, function() { 
    console.log('server running on port 3000'); 
} ) 
  
var files = pathReader.getAllFiles();
var urls = [];

parser.req(files,function(urlsreturn){
    urls = urlsreturn;    
    for(var i=0;i<urls.length;i++){        
        webscraper.infoFetcher(urls[i].url,urls.length,urls[i].artifact,urls[i].version);
    }    
        
});

