const {User} = require('../models/User.model');
const jwt = require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
require('dotenv').config()
const generateAcessToken =(user)=>{
    return jwt.sign(user,process.env.SECRET,{expiresIn: '5m'})
 }
 

const getUser = async(req, res) =>{
    const response = await User.findAll().then((data)=>{
        const res ={error:false, data: data}
        return res;
    }).catch((error)=>{
        const res ={error:true, message:error}
        return res;
    });
    res.json(response);
}

const createUser = async (req, res) =>{
    try{
        let rol = 0;
        let urlImage
        if (req.file == undefined) {
            urlImage= null
        }else{
            const url = req.protocol + '://' + req.get('host')
            urlImage = url + '/uploads/' + req.file.filename;
            rol = 1
        }
        
        
    const modelData={
        name: req.body.name,
        email: req.body.email,
        image:urlImage,
        password: bcryptjs.hashSync(req.body.password),
        role: rol
    }
    const acessToken= generateAcessToken(modelData)
    const response =  User.create(modelData).then((data)=>{
        const res ={error:false,token:acessToken, message:"Usuario creado"}
        return res;
    }).catch((error)=>{
        const res ={error:true, message:error}
        return res;
    });
    res.json(response);
} catch (e){
    console.log(e)
}
} 


module.exports ={createUser, getUser}