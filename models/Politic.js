var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PoliticSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
]
});


var Politic = mongoose.model("Politic", PoliticSchema);

module.exports = Politic;