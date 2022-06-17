const { response } = require("express");
var express=require("express");//require 
var app=express()//app-server making
app.listen(process.env.PORT||3000,()=>{console.log("Server is running at 3000");})
//setting template engine

var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true})) //for decoding form data

app.set("view engine","ejs"); //for ejs engine
app.use(express.static("public")); //for static files
//request-response
app.get("/",(req,res)=>{
    //res.send("hello world")
 NewArticle.find({},(err,data)=>{
    //     console.log("found---"+data);

    if(!err){
        res.render(__dirname+"/views/home.ejs",{d:data})
    }
    else{
        res.send("some error occured");
    }
    }).limit(3).sort("-times")
    
})

//creating database

var mongoose=require("mongoose");
const res = require("express/lib/response");
mongoose.connect("mongodb+srv://abhi0408:abhi0408@cluster0.appa7wy.mongodb.net/myusers").then((e)=>{
    console.log("Db connected")})//port setting for database


//creating schema
const schema=mongoose.Schema({
    heading:String,
    subheading:String,
    fpara:String,
    mpara:String,
    epara:String,
    times:String,

})
const NewArticle=mongoose.model("article",schema)


app.get("/write",(req,res)=>{
    res.render(__dirname +"/views/write.ejs")
    
})
app.get("/articles",(req,res)=>{
    NewArticle.find({},(err,data)=>{
    //  console.log(data);

    if(!err){
        res.render(__dirname+"/views/allarticle.ejs",{obj:data})
    }
    else{
        res.send("some error occured");
    }
    })
})
// app.get("/articles",(req,res)=>{
//     res.render(__dirname +"/views/allarticle.ejs")
// })

app.post("/newarticle",(req,res)=>{
    //console.log(req.body);
    // var obj={
    //     h:req.body.heading,
    //     sh:req.body.subheading,
    //     fp:req.body.fpara,
    //     mp:req.body.mpara,
    //     ep:req.body.epara,

    // }
    // res.render(__dirname+"/views/article",obj)
    var obj={
           heading:req.body.heading,
           subheading:req.body.subheading,
            fpara:req.body.fpara,
            mpara:req.body.mpara,
             epara:req.body.epara,
             times:Date.now(),
    }

    var article=NewArticle(obj);
    article.save();
    res.send(`<h1>Your Article is saved</h1>`)


});         
// app.get("/articles",(req,res)=>{
//     NewArticle.find({},(err,data)=>{
//     //     console.log("found---"+data);

   //     if(!err){
//         res.render(__dirname+"/views/allarticles.ejs",{d:data})
//     }
//     else{
//         res.send("some error occured");
//     }
//     })
// })

