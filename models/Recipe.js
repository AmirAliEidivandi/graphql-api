const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    createAt: String,
    thumbsUp: Number,
    thumbDown: Number,
});

module.exports = mongoose.model("Recipe", recipeSchema);
