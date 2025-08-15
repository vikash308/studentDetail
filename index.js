import dotenv from 'dotenv';
dotenv.config();

const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')
let port = 3000;

app.use(methodOverride('_method'))
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))


app.listen(port,()=>{
    console.log(`server is listen on ${port}`);
})

let posts = [
    {
        id:uuidv4(),
        title:"vikash308",
        content:"for living best life do coding"
    }
]
app.get("/posts",(req,res)=>{
    res.render("home",{posts})
})

app.get("/posts/add",(req,res)=>{
    res.render("create")
})

app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {title , content} = req.body;
    let post = {id ,title,content }
     posts.push(post);
     res.redirect("/posts")
})

app.get("/post/:id", (req,res)=>{
    let id = req.params.id;
    let post = posts.find((p) =>{ return id ===p.id})
    console.log(post)
    res.render("post", {post})
})

app.get("/post/:id/edit",(req,res)=>{
    let id = req.params.id;
    let post = posts.find((p)=>{ return id === p.id})
    res.render("edit",{post} )
})

app.patch("/post/:id",(req,res)=>{
    let id = req.params.id;
    let newContent = req.body.content;
    let post = posts.find((p)=>{ return id === p.id})
    post.content = newContent;
    res.redirect("/posts")
})

app.delete("/post/:id",(req,res)=>{
    let id = req.params.id;
    posts = posts.filter((p)=>{return id !== p.id })
    res.redirect("/posts")
})
