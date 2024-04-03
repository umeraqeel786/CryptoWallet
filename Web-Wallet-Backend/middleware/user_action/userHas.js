const Cart = require("../../models/Cart")
const Review = require("../../models/Review")
const Order = require("../../models/Order")
const Whislist = require("../../models/WishList")

module.exports = async(product,user,type) =>{
    let hasOnCart = null
    let hasBought = null
    let hasOnWishlist = null
    let hasReviewed = null
  
    if (user) {
        //cart bahek aru ko lagi check gareko
        if (type !=='carts') {
            //has on cart?
            hasOnCart = await Cart.findOne({ user: user._id, product: product._id, isDeleted: null })
            if (!hasOnCart) hasOnCart = false
        }

      
    }
    
    return {hasBought,hasOnCart,hasOnWishlist,hasReviewed}
}