const express=require('express');
const globalerror=require('./Middlerwares/GlobalError')
const authRouter=require('./Routers/authRouters')
const restaurantRouter=require('./Routers/restaurantRouters')
const orderRouter=require('./Routers/orderRouters')
const app=express();
const path=require('path');
const cookieparser=require('cookie-parser')

app.use(cookieparser())
app.use(express.json({ limit: '10kb' }));




app.use('/v1/auth',authRouter);
app.use('/v1/restaurant',restaurantRouter);
app.use('/v1/order',orderRouter);

app.use(globalerror)


module.exports=app