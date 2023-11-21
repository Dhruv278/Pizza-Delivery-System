const express=require('express');
const router=express.Router();
const restaurantController=require('./../Controllers/restaurantController')
const authMiddlerware=require('../Middlerwares/authMiddleware');
const restaurantMiddleware=require('../Middlerwares/restaurnatMiddleware')

router.post('/add',authMiddlerware.isAuthenticatedUser,authMiddlerware.authorizeRole('Admin'),restaurantController.addRestaurant);
router.delete('/delete/:resId',authMiddlerware.isAuthenticatedUser,authMiddlerware.authorizeRole('Admin'),restaurantController.deleteRestaurant);
router.get('/get',authMiddlerware.isAuthenticatedUser,restaurantController.getMyAllRestaurants);
router.get('/toggleStatus/:resId',restaurantMiddleware.checkRestaurantOwner,restaurantController.toggleRestaurantStatus);


// MenuItems APIS
router.get('/:resId/menu',restaurantController.getMenu);
router.post('/:resId/menu/addItem',restaurantMiddleware.checkRestaurantOwner,restaurantController.addMenuItem);
router.put('/:resId/menu/updateItem/:slug',restaurantMiddleware.checkRestaurantOwner,restaurantController.updateMuenuItems);
router.delete('/:resId/menu/deleteItem/:slug',restaurantMiddleware.checkRestaurantOwner,restaurantController.deleteItem);


module.exports=router