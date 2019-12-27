const router = require('express').Router();
const Product = require('../models/product');
const upload = require('../middlewares/upload-photo');

// POST request :  Create new product
router.post("/products", upload.single("photo"), async(req, res) => {
    try {
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

// GET request: Get all products
router.get('/products', async(req, res) => {
    try {
        let products = await Product.find();
        res.json({success: true, products: products});
    } catch (err) {
        res
            .status(500)
            .json({success: false, message: err.message});
    }
});

// GET request: Get  a single product
router.get('/products/:id', async(req, res) => {
    try {
        let product = await Product.findOne({_id: req.params.id});
        res.json({success: true, product: product});
    } catch (err) {
        res
            .status(500)
            .json({success: false, message: err.message});
    }
});

// PUT request: Update  a single product
router.put('/products/:id', upload.single("photo"), async(req, res) => {

    try {
        let product = await Product.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.categoryID,
                description: req.body.description,
                photo: req.file.location,
                owner: req.body.ownerID
            }
        }, {upsert: true});

        res.json({success: true, updatedProduct: product});
    } catch (err) {
        res
            .status(500)
            .json({success: false, message: err.message});
    }
});

// DELETE request: Delete a single product
router.delete('/products/:id', async(req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({_id: req.params.id});
        res.json({success: true, message: "Product successfully deleted!"});
    } catch (err) {
        res
            .status(500)
            .json({success: false, message: err.message});
    }
});

module.exports = router;
