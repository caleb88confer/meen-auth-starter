//DEPENDANCIES========================================
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

//New (registration page)

//Create (registration route)
userRouter.post('/', (req, res) => {
    //overwrite the user password with the hashed password
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    //the create method on the User model from the schema creation, is what creates our entry in the database. ie. MongoDB
    User.create(req.body, (error, createdUser) => {
        res.redirect('/');
    });
});

//EXPORT USER ROUTE===================================
module.exports = userRouter;