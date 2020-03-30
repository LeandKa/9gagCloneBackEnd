require("dotenv").config();


//Requires

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();


//Routes Requires
const adminRoutes = require('./Routers/admin');
const auth = require('./Routers/auth');
const gets = require('./Routers/gets');



//BodyParser
app.use('/img',express.static('img'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


//Routes
app.use(adminRoutes);
app.use(auth);
app.use(gets);

//MongoDb Config

mongoose.connect(`${process.env.MONGODBKEY}`,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result =>{
     console.log('ok')
})
.catch(err =>{
    console.log(err)
})


//NodeJs Connections

const Port = '3000';

app.listen(Port,()=>{
    console.log('OK');
})

module.exports = app