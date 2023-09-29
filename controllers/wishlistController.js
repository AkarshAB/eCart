//logic for wishlist

//import wishlist  form model

const wishlists = require('../models/wishlistSchema')

//logic for adding wishlist item
exports.addToWishlist = async (req,res) => {
  //get product details

  //using destructuring here
  const {id, title, price, image} = req.body //destructuring syntax

  //logic
 try {
 //check if the prduct is already present in wishlist  
 const item= await wishlists.findOne({id})
 if(item){
   res.status(403).json('Product is already in wishlist')
 }
 else {
   //add the product to wishlist
   const newProduct = new wishlists({id, title, price, image})
   //store new product in the wishlist
   await newProduct.save() //to mongoDB
   //send response to the client
   res.status(200).json('Product added successfully')
 }
 }
 catch(error) {
  res.status(401).json(error)
 }
}

//get all wishlist products
exports.getWishlistItems = async(req,res) =>{
  //logic
  try {
    const allWishlists = await wishlists.find()
    res.status(200).json(allWishlists)  //all wishlist prduct details
  }
  catch(error){
    res.status(404).json(error)
  }
}

//delete particular product from wishlists
exports.deleteProduct = async (req,res) => {
  //logic - get id - delete - fetch remaining products
  //get id from request
  const {id} = req.params
  try {
    const removeProduct = await wishlists.deleteOne({id})
    //get remaining product details after deleting  a particular product
    if(removeProduct){
      const allItems = await wishlists.find()
      res.status(200).json(allItems)
    }
  }
  catch(error) {
    res.status(404).json(error)
  }
}