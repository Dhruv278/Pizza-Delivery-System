const User = require('./../Schema/userSchema');
const sendToken = require('../utils/jwtToken');
const ErrorHandler = require('../errorHandling/ErrorFormate')
const catchAsync = require('../errorHandling/catchError');
const Restaurant = require('../Schema/restaurantSchema');
const APIFeatures = require('../utils/apiFeatures');
const Order = require('../Schema/orderSchema');
const createUniqueSlug = require('../utils/slug');


exports.createOrder=catchAsync(async(req,res,next)=>{
    
    const restaurant=await Restaurant.findById(req.body.restaurantId);

    if(!restaurant)return next(new ErrorHandler('Please e provide valid restaurant id',500));

    const item=restaurant.menuItems.filter(item => item.slug.toString()===createUniqueSlug(restaurant.id,req.body.itemName).toString());

 
    if(item.length===0)return next(new ErrorHandler('No item found',404));

    const order={
        buyerId:req.user.id,
        item:item[0],
        restaurantId:restaurant._id,
        quantity:req.body.quantity,
        delivery_location:{
            coordinates:req.body.delivery_location
        },
        totalPayment:Number(req.body.quantity)*item[0].itemPrice

    }
    const newOrder=await Order.create(order);
    req.user.orderHistory.push(newOrder._id);
    await req.user.save();
    res.status(200).json({
        status:'success',
        newOrder
    })
})


exports.updateOrderStatus=catchAsync(async(req,res,next)=>{
    const orderId=req.params.orderId;
    const orderStatus=req.body.status.toLowerCase();
    const orderStatusArray=['pending','accepted','preparing','dispatched','delivered']
    if(!orderStatusArray.includes(orderStatus))return next(new ErrorHandler("Pleaase provide valid status",500))
    const order=await Order.findById(orderId);
    order.status=orderStatus;
    await order.save();
    res.status(200).json({
        order
    })

})



exports.getMyOrders=catchAsync(async(req,res,next)=>{
    const user=await User.findById(req.user._id).populate('orderHistory');
    
    res.status(200).json({
        totalOrders:user.orderHistory.length,
        orderHistory:user.orderHistory
    })
})