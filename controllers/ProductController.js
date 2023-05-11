const Product = require('../models/Product');
const { paginate } = require('../utils');


exports.create = async (req, res) => {
    const { name, price, oldPrice, description, body, status, category } = req.body;
    const images = req.files.map(file => `/media/${file.filename}`);

    try {
        const newProduct = await Product.create({
            user: req.user.id, name, price,
            oldPrice,  description, body,
            status, images, category
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};


exports.update = async (req, res, next) => {
    const { name, price, oldPrice, description, body, status, category } = req.body;
    const images = req.files.map(file => `/media/${file.filename}`);

    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, {
            user: req.user.id, name, price,
            oldPrice, description, body,
            status, images, category
        }, {new: true});

        res.status(201).json({
            success: true,
            message: 'Product updated successfully',
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
}




exports.list = async (req, res, next)=>{
    try{
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const products = await Product.find({});
        res.json(paginate(products, limit, page))
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"})
    }
}