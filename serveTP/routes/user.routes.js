const express = require('express')
const router = express.Router()
const {getUser, createUser} = require('../controller/user.controller')
const uploadMulter = require("../multer.config");
const {ValidateUser}= require("../models/user.model")

router.get('/',getUser)
router.post('/',[uploadMulter.single('image'),ValidateUser],createUser)

module.exports = router
