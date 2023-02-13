//jshint esversion:6

const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose=require("mongoose")


const app=express()

//we are setting up view engine for our template ejs
app.set('view engine','ejs');

//we are going to use body-parser in order to pass our requests
app.use(bodyParser.urlencoded({extended:true}));


//we use the public directory to store our static files such as images and css code
app.use(express.static("public"));

//to connect our mongodb and database
mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

//creating our collection
const articleSchema={
    title:String,
    content:String
};
const Article=mongoose.model("Article",articleSchema);

//get request and read from a database
app.get("/articles",function(req,res){
    Article.find(function(err,foundArticles){
        if(!err){
            res.send(foundArticles)
        }else{
            res.send(err)
        }
        
    });
});


//post request
app.post("/articles",function(req,res){
   console.log(req.body.title); 
    console.log(req.body.content); 
    // const newArticle=new Article({
    //     title:req.body.title,
    //     content:req.body.content
    // })
    // newArticle.save();
});
app.listen(3000,function(){
    console.log("server is up and running");
})