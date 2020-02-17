//web scraping
const axios = require("axios");
const cheerio = require("cheerio");
const { convertArrayToCSV } = require('convert-array-to-csv');
const converter = require('convert-array-to-csv');
let linksArray = [];
var depMaps = [];
const fs = require('fs');
var count = 0;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    header: [{id:'name',title:'NAME'},
    {id:'description',title:'DESCRIPTION'},
    {id:'categories',title:'CATEGORIES'},
    {id:'version',title:'VERSION'},
    {id:'latestVersion',title:'LATEST VERSION'}],
    path: '/info.csv'
});

const fetchData = async (url) => {    
    if(!objectEmpty(url)){
        const result = await axios.get(url);
        return cheerio.load(result.data);
    }else{
        return "url not found";
    }
    
};


var infoFetcher = async(url,totalLength,artifact,version)=>{
    let objMaps =[];
    if(objectEmpty(url))
        return "url not provided";
    const $ = await fetchData(url);    
    count++;    
    var gridText = $('table.grid td');
    var gridHeader = $('table.grid th');
    var desc = $("div.im-description").text().replace(/(\r\n|\n|\r)/gm," - ");
    var categorydesc = $("td a.b.c").text();
    var latestVersion = ''; 
    tablerow.each(function(index,element){        
        //console.log(index,$(element).text());
        if(index ==0){
            latestVersion = $(element).text();
        }
    });
    var depObj = {name:artifact,description:desc,categories:categorydesc,version:version,latestVersion:latestVersion};
    depMaps.push(depObj);
    
    if(totalLength == count){            
        const csvFromArrayOfObjects = convertArrayToCSV(depMaps);
        csvWriter.writeRecords(depMaps).then(() => {
            console.log('...Done');
        });;
    }
    

}

function ObjMap(){    
    return {index:'',desc:'',text:''};
}


function objectEmpty(obj){
    return obj == undefined || obj == null || obj == '';
}


module.exports.urlSearch = urlSearch;
module.exports.infoFetcher = infoFetcher;
