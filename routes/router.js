//to define routes for client requests

//1. import express
const express = require('express')

//4. import product controller
const productController = require('../controllers/productContoller')
//import wishlist controller
const wishlistController = require ('../controllers/wishlistController')
//iimport cartController
const cartController = require('../controllers/cartController')

//2. using express create object for router class inorder to setup path
const router = new express.Router()

//3. use router object to resolve  client request

  //get all products api request

router.get('/products/all-products',productController.getAllProducts)


//get a particular product details
router.get('/products/view-product/:id',productController.viewProduct)

//add a new product to the wishlist
router.post('/wishlists/add-to-wishlist',wishlistController.addToWishlist)

//add to cart
router.post('/carts/add-to-cart',cartController.addToCart)

//view all wishlist items
router.get('/wishlists/view-all-wishlists',wishlistController.getWishlistItems)

//delete particular product
router.delete('/wishlists/delete-wishlist-product/:id',wishlistController.deleteProduct)

//get cart products
router.get('/carts/get-cart',cartController.getCart)

//delete cart products
router.delete('/cart/delete-product/:id',cartController.deleteCartProduct)

//increment product
router.get('/cart/increment-product/:id',cartController.incrementProductCount)

//decrement product
router.get('/cart/decrement-product/:id',cartController.decrementProductCount)

//5. export rotes
module.exports = router 