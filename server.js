require("dotenv").config();
var express = require("express");
// var logger = require("morgan");
var exphbs = require("express-handlebars");
var db = require("./models");
var app = express();
var PORT = 3000;
var router = express.Router();

// var bodyParser = require("body-parser");
var path = require("path");

var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");


// app.use(logger("dev"));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
    "handlebars", 
    exphbs({ 
        defaultLayout: "main" 
    })
);
app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// require("./routes/apiRoutes")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsWebsite";

mongoose.connect(MONGODB_URI);


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



/// HTML ROUTES ///


app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!")
})

module.exports = app;