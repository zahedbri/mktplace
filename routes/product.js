const router = require('express').Router();
const Product = require('../models/product');
const upload = require('../middlewares/upload-photo');

// POST request :  Create new product
router.post("/products", upload.single("photo"), async(req, res) => {
    try {
        // price: Number, stockQuantity : Number, rating: Number
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();

        res.json({success: true, message: "Successfully added!"});

    } catch (err) {
        res
            .status(500)
            .json({success: false, message: err.message});

    }

});

// GET request: Get all products GET request: Get  a single product PUT request:
// Update  a single product DELETE request: Delete a single product

module.exports = router;