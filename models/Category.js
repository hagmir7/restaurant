const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category must have a name"],
        unique: true,
        maxlength: 100
    },

    image: {
        type: String,
        required: [true, "Category must have an image."]
    }
}, {
    timestamps: true
})

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;
