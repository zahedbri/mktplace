const router = require('express').Router();
const Owner = require('../models/owner');
const upload = require('../middlewares/upload-photo');

// POST request :  Create new owner
router.post("/owners", upload.single("photo"), async(req, res) => {
    try {
        // price: Number, stockQuantity : Number, rating: Number
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;
        owner.photo = req.file.location;

        await owner.save();

        res.json({success: true, message: "Successfully created a new owner."});

    } catch (err) {
        res
            .status(500)
            .json({success: false, message: err.message});

    }

});

router.get('/owners', async(req, res) => {
    try {
        let owners = await Owner.find();
        res.json({success: true, owners: owners});
    } catch (err) {
        res
            .status(500)
            .json({success: false, message: err.message});
    }
});

// GET request: Get all categories GET request: Get  a single owner PUT request:
// Update  a single owner DELETE request: Delete a single owner

module.exports = router;