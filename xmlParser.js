const xml2js = require('xml2js');

var fs = require('fs');
var parseString = require('xml2js').parseString;
let dependecies = [];
let depInfoArray = [];
let urls =[];

function requestReport(url,callback) {
    console.log(url);
    parseString(fs.readFileSync(url, 'utf8'),callback);
}

function req(files,callbackreq){
    for(var i=0;i<files.length;i++){
        var url = files[i];
        requestReport(url,function(err, result) {            
            if (err) return console.error(err);        
            dependecies  = result.project.dependencies;
            dependencyExtractor();            
        });
    }    
    callbackreq(urls);  
}



function dependencyExtractor(){    
    for(var i=0;i<dependecies.length;i++){    
        for(var j=0;j<dependecies[i].dependency.length;j++)
            buildUrl(dependecies[i].dependency[j]);    
    }
}

function buildUrl(dep){
    var mainUrl = "";//TODO provide url//"https://mvnrepository.com/artifact";
    urls.push({url:mainUrl+"/"+dep.groupId+"/"+dep.artifactId,
                version:dep.version,
            artifact:dep.artifactId});
}

module.exports.req = req;