var db = require("../models");

var path = require("path");



module.exports = function (app) {

    app.get("/", function (req, res) {
        var articleArray = [];
        var politicsArray = [];
        var hbsObject = {
            articles: articleArray,
            politics: politicsArray
        }

        db.Article.find({}).then(function (data) {
            // console.log(data)
            var articles = data.slice(1).slice(-5)
            console.log(articles)
            for (i = 0; i < articles.length; i++) {
                articleArray.unshift(articles[i]);
            }

            // console.log(hbsObject)
            db.Politic.find({}).then(function (data) {
                var politics = data.slice(1).slice(-5)
                console.log(politics)
                for (j = 0; j < politics.length; j++) {
                    politicsArray.unshift(politics[j])
                }
            })
            setTimeout(function () {
                res.render("index", hbsObject);
            }, 1250);
        })
    })


    app.get("/archives", function (req, res) {
        var articleArray = [];
        var politicsArray = [];

        var hbsObject = {
            articles: articleArray,
            politics: politicsArray
        }

        db.Article.find({}).then(function (data) {
            // console.log(data)
            // var articles = data.slice(1).slice(-5)
            // console.log(articles)
            for (i = 0; i < data.length; i++) {
                articleArray.unshift(data[i]);
            }

            // console.log(hbsObject)
            db.Politic.find({}).then(function (data) {
                var politics = data.slice(1).slice(-5)
                console.log(politics)
                for (j = 0; j < politics.length; j++) {
                    politicsArray.unshift(politics[j])
                }
            })


            setTimeout(function () {
                res.render("archive", hbsObject);
            }, 1250);

        })
    })


    app.get("/news2", function (req, res) {
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

    app.get("/comments/:id", function (req, res) {

        var articleArray = [];
        var commentArray = [];


        var hbsObject = {
            articles: articleArray,
            comments: commentArray
        }

        db.Article.findById(req.params.id)
            .populate("comment")
            .then(function (data) {
                console.log(data);
                articleArray.push(data)

                for (i = 0; i < data.comment.length; i++) {
                    commentArray.push(data.comment[i]);
                }

                // commentArray.push(data.comment)
                // db.Comment.find({})
                // console.log(hbsObject)
                console.log(hbsObject.articles);
                console.log(hbsObject.comments)
                res.render("comments", hbsObject)
            })
    });


    app.get("/comments/politics/:id", function (req, res) {

        var articleArray = [];
        var commentArray = [];


        var hbsObject = {
            articles: articleArray,
            comments: commentArray
        }

        db.Politic.findById(req.params.id)
            .populate("comment")
            .then(function (data) {
                console.log(data);
                articleArray.push(data)

                for (i = 0; i < data.comment.length; i++) {
                    commentArray.push(data.comment[i]);
                }

                // commentArray.push(data.comment)
                // db.Comment.find({})
                // console.log(hbsObject)
                console.log(hbsObject.articles);
                console.log(hbsObject.comments)
                res.render("commentsPolitics", hbsObject)
            })
    })


};
