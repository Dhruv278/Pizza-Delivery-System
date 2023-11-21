const express=require('express');
const mongoose=require('mongoose')
const app=require('./app')


const dotenv=require('dotenv')

dotenv.config({path:'./config.env'});
const db=process.env.DATABASE;
mongoose.connect(db,{ 
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(con => console.log('database is connected'));



const port=process.env.PORT ||3000;

const server=app.listen(port,()=>{
    console.log(`server is listing on port ${port}`);
})