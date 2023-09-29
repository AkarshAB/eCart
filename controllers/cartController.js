//import carts model
const carts = require('../models/cartSchema')

//add to cart collection
exports.addToCart = async (req, res) => {

  //get product details from the request
  const { id, title, price, image, quantity } = req.body;

  try {
    //check if the product is already in cart
    const products = await carts.findOne({ id })

    if (products) {
      //if product exists already, update its quantity and price accordingly
      products.quantity += 1

      //update total
      products.grandTotal = products.price * products.quantity

      //save changes to db
      products.save()

      //send response back to the client
      res.status(200).json('Product details added to cart')

    }
    else {
      //product not present in the cart
      const newProduct = new carts({
        id, title, price, image, quantity, grandTotal: price
      })
      //save new products details
      newProduct.save()

      //send response back to client
      res.status(200).json('Product added successfully')
    }
  }
  catch (error) {
    res.status(403).json(error)
  }
}

//get cart products
exports.getCart = async (req,res) => {
  try {
    const allCart = await carts.find ()
    res.status(200).json(allCart)
  }
  catch (error) {
    res.status(404).json(error)
  }

}

const products = carts.find()

//delete particular product from cart
exports.deleteCartProduct = async (req,res) => {
  //logic - get id - delete - fetch remaining products

  //get product id from request by destructuring
  const {id} = req.params
  try {
    const removeCartProduct = await carts.deleteOne({id}) //product deleted
    //get remaining product details after deleting  a particular product
    if(removeCartProduct.deleteCount != 0){
      //then get all remaining porducts
      const allItems = await carts.find()
      res.status(200).json(allItems)
    }
  }
  catch(error) {
    res.status(404).json(error)
  }
}

//increment quantity
exports.incrementProductCount = async (req,res) => {
  const {id} = req.params
  try{
        //if the product is already in the cart then the quantity will be incremented by 1
        //then update the grand total
    const product = await carts.findOne({id})
    if(product){
      product.quantity+=1
      product.grandTotal=product.price*product.quantity
      //save changes to db
      await product.save()
      //after the product has been saced, update the content into the client side
      const allCart = await carts.find()
      res.status(200).json(allCart)
    }
    else{
      res.status(401).json("Product not found")
    }
  }
  catch(error) {
    res.status(404).json(error)
  }
}

//decrement quantity
exports.decrementProductCount = async (req,res) => {
  const {id} = req.params
  try {
    const product = await carts.findOne({id})

    if(product){
      product.quantity -= 1
      if(product.quantity == 0){
        //remove product if quantity is 0
        await carts.deleteOne({id})
        //remaining product will be send back
        this.allItems = await carts.find()
        res.status(200).json(this.allItems)
      }

      else {
      product.grandTotal = product.quantity*product.price
        //save to db
      await product.save()
      const allCart = await carts.find()
      res.status(200).json(allCart)
      }
    }
  }
  catch(error) {
    res.status(401).json(error)
  }
}