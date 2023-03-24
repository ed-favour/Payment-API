const express = require('express')
const userController = require('../controller/userController')



const router = express.Router();

router.route('/')
.get(userController.getAllUsers)  //d. endpoint to fetch all the user
.post(userController.createUser) //a. endpoint to create user

router.route('/:id')
.get(userController.getUser)







module.exports = router