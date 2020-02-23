package com.jsoup.scraper;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import java.io.File;
import java.util.ArrayList;
import java.util.Scanner;
import java.io.FileNotFoundException;  //
import java.io.FileWriter;
/**
 * Hello world!
 *
 */
public class App 
{

	public static ArrayList<String> urls = new ArrayList<String>();
	public static String version = "";
	public static String artifactName = "";
	
	public static void main( String[] args )
    {
		writeFile("NAME,DESCRIPTION,CATEGORIES,VERSION,LATEST VERSION");
        readFile();
        for(int i =0;i<urls.size();i++) {
        	scrapeUrl(urls.get(i).toString());
        }
    }
    
    public static void scrapeUrl(String url) {
    	try {
            // Here we create a document object and use JSoup to fetch the website
    		String[] dataStr = url.split(",");
            Document doc = Jsoup.connect(dataStr[1]).get();                        
            String desc = doc.select("div.im-description").text().replace("\n", "").replace(",", ";");
            String categorydesc = doc.select("td a.b.c").text();            
            String latestVersion = doc.select("table.grid.versions tr:first-child td:nth-child(2)").get(0).text();
            // With the document fetched, we use JSoup's title() method to fetch the title
            System.out.printf("Title: %s\n %s", desc,categorydesc+",v="+latestVersion);
            writeFile(dataStr[0]+","+desc+","+categorydesc+","+dataStr[2]+","+latestVersion);
          // In case of any IO errors, we want the messages written to the console
          } catch (IOException e) {
            e.printStackTrace();
          }
    }
    
    public static void readFile() {
    	 try {
	      File myObj = new File("D://adbuth//mvnurls.txt");
	      Scanner myReader = new Scanner(myObj);
	      
	      while (myReader.hasNextLine()) {
	        String data = myReader.nextLine();
	        String[] dataStr = data.split(",");
	        version = dataStr[2];
	        artifactName = dataStr[0];
	        System.out.println(dataStr[0]+","+dataStr[1]+","+dataStr[2]);
	        urls.add(dataStr[0]+","+dataStr[1]+","+dataStr[2]);
	      }
	      myReader.close();
	    } catch (FileNotFoundException e) {
	      System.out.println("An error occurred.");
	      e.printStackTrace();
	    }
    }
    public static void writeFile(String data) {
    	 try {
    	      FileWriter myWriter = new FileWriter("D://adbuth//info.csv",true);
    	      myWriter.write(data);    	   
    	      myWriter.write("\n");
    	      myWriter.close();
    	      System.out.println("Successfully wrote to the file.");
    	    } catch (IOException e) {
    	      System.out.println("An error occurred.");
    	      e.printStackTrace();
    	    }
    }
}
