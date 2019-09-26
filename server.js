var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");

var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
var path = require("path")

var PORT = 3000;

var app = express();

// app.use(logger("dev"));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/apiRoutes");
require("./routes/htmlroutes");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsWebsite";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", function (req, res) {

    axios.get("https://phillysportsnetwork.com/").then(function (response) {

        var $ = cheerio.load(response.data);



        $("article").each(function (i, element) {

            // console.log(element);
            var result = {};

            result.title = $(this).find("a").text();
            result.link = $(this).find("a").attr("href");
            result.summary = $(this).find("p").text();

            // result.summary = $(this).children("div").text();

            console.log(result);
            db.Article.create(result).then(function (dbArticle) {

                console.log(dbArticle);
            })
                .catch(function (err) {
                    console.log(err);
                });
        });

        res.send("Scrape Complete");
    })
})

app.get("/articles", function (req, res) {
    db.Article.find({}).then(function (dbArticles) {

        res.json(dbArticles);

    }).catch(function (err) {
        res.json(err);
    })
})

app.get("/articles/:id", function (req, res) {

    db.Article.findById(req.params.id)
        .populate("comment")
        .then(function (dbArticles) {
            res.json(dbArticles)
        })
        .catch(function (err) {
            res.json(err);
        })
});

//Make Comment
app.post("/submit/:id", function(req, res) {

    var id = req.params.id;

    db.Comment.create(req.body)
    .then(function(dbComment) {

        return db.Article.findByIdAndUpdate({_id: id}, { $push: { comment: dbComment._id } }, {new: true});
    }).then(function(){
        location.reload();
    })
    // .then(function(dbArticle) {
    //     // res.json(dbArticle)
    //     // location.reload()
    //     window.location.assign(`/comments/${req.params.id}`)
    // })
    .catch(function() {
        location.reload();
    })
})

//Delete Comment
app.put("/comment/delete/:id", function(req, res) {

    var id = req.params.id;

    db.Comment.remove({_id: id})
        .then(function(dbComment) {
            res.json(dbComment)
        })
        .catch(function(err){
            res.json(err);
        })
})

/// HTML ROUTES ///

app.get("/news", function (req, res) {
    console.log("welcome to article page")
    var articleArray = [];

    var hbsObject = {
        articles: articleArray
    }

    db.Article.find({}).then(function (data) {
        // console.log(data)
        for (i = 0; i < 10; i++) {
            articleArray.push(data[i]);
        }

        // console.log(hbsObject)

        setTimeout(function () {
            res.render("index", hbsObject);
        }, 500);

    })
});

app.get("/comments/:id", function(req, res) {

    var articleArray = [];
    var commentArray = [];


    var hbsObject = {
        articles: articleArray,
        comments: commentArray
    }

    db.Article.findById(req.params.id)
        .populate("comment")
        .then(function(data) {
           console.log(data);
            articleArray.push(data)
            
            for ( i = 0; i < data.comment.length; i ++) {
                commentArray.push(data.comment[i]);
            }
            // commentArray.push(data.comment)
            // db.Comment.find({})
            // console.log(hbsObject)
            console.log(hbsObject.articles);
            console.log(hbsObject.comments)
            res.render("comments", hbsObject)
        })
})


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!")
})

module.exports = app;