const User=require('./../Schema/userSchema');
const sendToken=require('../utils/jwtToken');
const ErrorHandler=require('../errorHandling/ErrorFormate')
const catchAsync=require('../errorHandling/catchError');
const crypto=require('crypto');
const jwt=require('jsonwebtoken');
const Email=require('./../utils/email');

exports.signup=catchAsync(async(req,res,next)=>{
    const user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        city:req.body.city.toLowerCase()
        
    })
    try{
        // to send welcome mail to users
        await new Email(user).welcomeMail()
    }catch(err){
        console.log(err)
    }
    sendToken(user,200,res)
})



exports.signin=catchAsync(async(req,res,next)=>{
    const {email,password}=req.body;

    
    if(!email ||!password){
        return next(new ErrorHandler('Please enter deatils',404))

    }


    const user=await User.findOne({email}).select('+password');
    console.log(user)

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401))

    }

    // checking if password is correct 
    const isPasswordMatched=await user.comparePassword(password,user.password) ;
    console.log(isPasswordMatched)
    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401));

    }


    sendToken(user,200,res);


})






// Extra Api for Logout
exports.logout=catchAsync(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        status:true,
       
    })

})


