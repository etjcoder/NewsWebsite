var db = require("../models");

module.exports = function (app) {

    //Get Data for all Articles
    app.get("/articles", function (req, res) {
        db.Article.find({}).then(function (dbArticles) {

            res.json(dbArticles);

        }).catch(function (err) {
            res.json(err);
        })
    })

    //Get Data for a specific Article
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

    //Make Comment on Sports Article
    app.post("/submit/:id", function (req, res) {

        var id = req.params.id;

        db.Comment.create(req.body)
            .then(function (dbComment) {

                return db.Article.findByIdAndUpdate({ _id: id }, { $push: { comment: dbComment._id } }, { new: true });
            })
        // .then(function(){
        //     location.reload();
        // })
        // .then(function(dbArticle) {
        //     // res.json(dbArticle)
        //     // location.reload()
        //     window.location.assign(`/comments/${req.params.id}`)
        // })
        // .catch(function() {
        //     location.reload();
        // })
    })

    //Make Comment
    app.post("/submit/politics/:id", function (req, res) {

        var id = req.params.id;

        db.Comment.create(req.body)
            .then(function (dbComment) {

                return db.Politic.findByIdAndUpdate({ _id: id }, { $push: { comment: dbComment._id } }, { new: true });
            })
        // .then(function(){
        //     location.reload();
        // })
        // .then(function(dbArticle) {
        //     // res.json(dbArticle)
        //     // location.reload()
        //     window.location.assign(`/comments/${req.params.id}`)
        // })
        // .catch(function() {
        //     location.reload();
        // })
    })

    //Delete Comment
    app.put("/comment/delete/:id", function (req, res) {

        var id = req.params.id;

        db.Comment.remove({ _id: id })
            .then(function (dbComment) {
                res.json(dbComment)
            })
            .catch(function (err) {
                res.json(err);
            })
    })

}