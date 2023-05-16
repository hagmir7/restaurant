const Category = require('../models/Category');
const { paginate } = require('../utils');
const fs = require('fs');
const Product = require('../models/Product');

const path = require('path');
// Project director path
const __app = path.resolve(path.join(__dirname, '..'));


exports.create = async (req, res, next) => {
    if(!req.body.name || !req.file){
        return res.status(500).json({message: "All fields are required."});
    }

    try {
        // Check is category is exists
        const isExist = await Category.findOne({name: req.body.name});
        if(isExist){
            return res.status(400).json({message: "Category is already exits."});
        }

        const category = await Category.create({
            name: req.body.name,
            image: `/media/${req.file.filename}`
        })
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error."})
    }
}



exports.list = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1;
        const limit = req.query.limit || 15;
        const categories = await Category.find();
        const pagination = paginate(categories, limit, currentPage)
        res.json(pagination);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internl Server Error"});
    }
}



exports.update = async (req, res, next) => {
    try {
        const oldCategory = await Category.findById(req.params.id).select('image');

        const category = await Category.findOneAndUpdate({ _id: req.params.id }, {
            name: req.body.name,
            image: req.file && `/media/${req.file.filename}`
        });
        if (req.file) {
            // Remov old category image 
            fs.unlink(`${__app}/public${oldCategory.image}`, () =>  res.json(category));
        }else{
            return res.json(category)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Interval Server Error" });
    }
}


exports.delete = async (req, res, next) => {
    try{
        const category = await Category.findOneAndDelete({_id: req.params.id});
        res.json(category);
    }catch(error){
        console.log(error);
        res.status(5000).json({messsage: "Interval Server Error"});
    }
}


exports.products = async (req, res, next) => {
    const currentPage = req.query.page || 1;
    const limit = req.query.limit || 15;
    try {
        const products = await Product.find({ category: req.params.id });
        res.json(paginate(products, limit, currentPage));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Interval Server Error" });
    }
}