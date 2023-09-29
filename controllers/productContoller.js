//logic for getting all products from mongoDB 

//1. import product collection
const products = require('../models/productSchema')

//3. create a function for getting  all products
exports.getAllProducts = async(req,res)=>{
    //get all products from mongoDB
    try{
      const allProducts = await products.find()
      res.status(200).json(allProducts) //response send back to client
    }
    catch(error){
      res.status(401).json(error) //error message send back to client
    }
}

//view particular product details
exports.viewProduct = async(req,res) => {
  //get productid from the request
  const id = req.params.id;
  try {
    //check if product id is present in the db
    const product = await products.findOne({id})
    if (product){ //if product is present
      res.status(200).json(product) //pass details to frontend
    }
    else { //if product is not present
      res.status(404).json('Product not found')
    }
  }
  catch(error) {
    res.status(404).json(error)
  }
}