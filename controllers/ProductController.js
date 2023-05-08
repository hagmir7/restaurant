const Product = require('../models/Product');


exports.create = async (req, res) => {
    const { name, price, Oldprice, description, body, status, category } = req.body;

    const images = req.files.map(file => `/media/${file.filename}`);

    try {
        const newProduct = await Product.create({
            user: req.user.id,
            name,
            price,
            Oldprice,
            description,
            body,
            status,
            images,
            category
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