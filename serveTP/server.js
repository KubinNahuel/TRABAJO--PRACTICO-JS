const express = require('express')
const app = express()
const port= process.env.PORT  || 5050
const sequelize = require('./database/db')
const cors= require('cors')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user',require('./routes/user.routes'));




app.get('/', function(req,res){
    res.send('Hola mundo');
   });
app.listen(port,function(){
    console.log('Servidor corriendo por puerto'+port);
sequelize.sync({force: false}).then(()=>{
    console.log("Nos conectamos a la base de datos");
}).catch(error =>{
    console.log('Se ha producido un error',error);
}) 

})
