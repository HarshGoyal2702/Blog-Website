const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const articleRouter = require("./routes/article");
const methodOverride = require('method-override')
const PORT = process.env.PORT || 3000 ;
const app = express();
const Article = require("./models/article")

// Harsh1234
mongoose.connect("mongodb+srv://harshgoyal:Harsh1234@blogwebsite.6m81vy7.mongodb.net/?retryWrites=true&w=majority&appName=BlogWebsite").then(
    console.log("connected")
).catch((error)=>
    console.log("not connected")
)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");

app.get("/",async (req,res)=>{
    const articles = await Article.find().sort({createdAt : "desc"})
    res.render("articles/index",{articles:articles});
});


app.use(methodOverride("_method"))
app.use("/articles",articleRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}`);
})