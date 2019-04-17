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

const recipeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    path: String,
    title: String,
    instructions: String,
    ingredients: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// upload recipe
router.post("/", auth.verifyToken, User.verify, upload.single('recipe'), async (req, res) => {
    // check parameters
    if (!req.file)
        return res.status(400).send({
            message: "Must upload a file."
        });

    const recipe = new Recipe({
        user: req.user,
        path: "/images/" + req.file.filename,
        title: req.body.title,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients
    });
    try {
        await recipe.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all recipes
router.get("/all", async (req, res) => {
    try {
        let recipes = await Recipe.find().sort({
            created: -1
        }).populate('user');
        return res.send(recipes);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get my recipes
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
    // return recipes
    try {
        let recipes = await Recipe.find({
            user: req.user
        }).sort({
            created: -1
        });
        return res.send(recipes);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});


module.exports = {
    model: Recipe,
    routes: router,
}
