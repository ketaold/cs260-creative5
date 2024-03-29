const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipes', {
    useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const recipes = require("./recipes.js");
app.use("/api/recipes", recipes.routes);

const groceries = require("./groceries.js");
app.use("/api/groceries", groceries.routes);

app.listen(3002, () => console.log('Server listening on port 3002!'));
