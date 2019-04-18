const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");


// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
    dest: '../public/images/',
    limits: {
        fileSize: 10000000
    }
});

const users = require("./users.js");
const User = users.model;

const grocerySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    ingredient: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Grocery = mongoose.model('Grocery', grocerySchema);

// upload recipe
router.post("/", auth.verifyToken, User.verify, upload.single('grocery'), async (req, res) => {

    const grocery = new Grocery({
        user: req.user,
        grocery: req.body.ingredient
    });
    try {
        await grocery.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


// get my groceries
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return recipes
    try {
        let groceries = await Grocery.find({
            user: req.user,
            ingredient: {
                $exists: true
            }
        }).sort({
            created: -1
        });
        return res.send(groceries);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


module.exports = {
    model: Grocery,
    routes: router,
}
