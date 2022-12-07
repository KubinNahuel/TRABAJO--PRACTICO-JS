const {Model, DataTypes} = require('sequelize')
const sequelize = require('../database/db')
const Joi = require('joi')
const validateRequest = require('../middlewares/validateRequest')
const { text } = require('express')

class User extends Model {}
User.init({
    name: {
        type: DataTypes.STRING,
        validate:{
            isAlpha:{
                args: true,
                msg: "El nombre solo puede contener letras"
            }
        },
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image:{
        type: DataTypes.TEXT,
        defaultValue: null
    },
    role:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    sequelize,
    modelName:"user"
})
const ValidateUser = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required()
            .messages({
                'string.empty': "Ingresa el Nombre  del producto",
                'string.min': "El nombre del producto debe ser mayor a 5 caracteres",
                'any.required': "Ingresa el Nombre  del producto"
            }),
        email: Joi.string().min(5).max(100).required()
            .messages({
                'string.empty': "Ingresa el email",
                
                'any.required': "Ingresa el email"
            }),
        password: Joi.string().min(3).max(20).required()
            .messages({
                'string.empty': "Ingresa la categoria del producto",
                'string.min': "La contraseña debe ser mayor a 3 caracteres",
                'string.max': "La contraseña debe ser menor a 20 caracteres",
                'any.required': "Ingresa una contraseña"
            })
    });
    validateRequest(req, res, next, schema);
};

module.exports = {
    User,
    ValidateUser,
}

