const router = require('express').Router();
const Category = require('../models/category');

// POST request :  Create new category
router.post("/categories", async(req, res) => {
    try {
        let category = new Category();
        category.type = req.body.type;

        await category.save();

        res.json({success: true, message: "Successfully created a new category."});

    } catch (err) {
        res
            .status(500)
            .json({success: false, message: err.message});
    }

});

// GET request: Get all categories
router.get('/categories', async(req, res) => {
    try {
        let categories = await Category.find();
        res.json({success: true, categories: categories});
    } catch (err) {
        res
            .status(500)
            .json({success: false, message: err.message});
    }
});

//  GET request: Get  a single category PUT request: Update  a single category
// DELETE request: Delete a single category

module.exports = router;
