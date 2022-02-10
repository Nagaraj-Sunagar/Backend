const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extends:true}));

app.get("/",function(req,res){
    //we gonna make our server more responsive to to other locations other than Bengaluru 
    //first divide a api url to the components like qurey(which is the component to required for locations)
    //api id which is inperson id when they sign in to the perticular free api website
    //metric that is what the key to converte getting temperature in the form of celsius

    res.sendFile(__dirname+"/index.html");
   
})

app.post("/",function(req,res){
var qurey=req.body.cityName;
var apiKey="c802de4a4577e85cd77416bf1df374ce";
var units="metric";
var url="https://api.openweathermap.org/data/2.5/weather?q="+qurey+"&units="+units+"&appid="+apiKey+"";
https.get(url,function(response){
 //The above one https.get This is the function which will help to get data from the respective DATA in the fromof (raw json), 
 //that is can be logged and can be used to manipulated our website by converting it into json format.
//  console.log(response.statusCode);
 
 response.on("data",function(data){
     //by using json.parse method we accutally converting the data 
     //that we getting form the api into json formate so that is 
     // very useful in getting the required component from that data
     const weatherData=JSON.parse(data);
     const temp=Number(weatherData.main.temp);
     const disc=weatherData.weather[0].description;
     const img=weatherData.weather[0].icon;
     res.write("<h1>The temperature of "+qurey+" is "+temp +"degree celsius</h1>");
     res.write("<p>The Weather Condition now is "+disc+"</p>");
     res.write("<img src=http://openweathermap.org/img/wn/"+img+"@2x.png >");
     res.send();
 })
})
})

/*var qurey="Bengaluru";
var apiKey="c802de4a4577e85cd77416bf1df374ce";
var units="metric";
var url="https://api.openweathermap.org/data/2.5/weather?q="+qurey+"&units="+units+"&appid="+apiKey+"";
https.get(url,function(response){
 //The above one https.get This is the function which will help to get data from the respective DATA in the fromof (raw json), 
 //that is can be logged and can be used to manipulated our website by converting it into json format.
 console.log(response.statusCode);
 
 response.on("data",function(data){
     //by using json.parse method we accutally converting the data 
     //that we getting form the api into json formate so that is 
     // very useful in getting the required component from that data
     const weatherData=JSON.parse(data);
     const temp=Number(weatherData.main.temp);
     const disc=weatherData.weather[0].description;
     const img=weatherData.weather[0].icon;
     res.write("<h1>The temperature of Bengaluru is "+temp +"</h1>");
     res.write("<p>The Weather Condition now is "+disc+"</p>");
     res.write("<img src=http://openweathermap.org/img/wn/"+img+"@2x.png >");
     res.send();
 })
})*/




app.listen(3000,function(){
    console.log("Server is started at 3000");
})