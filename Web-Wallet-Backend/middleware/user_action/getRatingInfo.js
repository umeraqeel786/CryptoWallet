const Review = require("../../models/Review")
module.exports = async (product,newStar) => {
    // const product = req.product
    // if (!product.isVerified && product.isDeleted) {
    //     return res.status(404).json({ error: 'Product not found' })
    // }
    let stars = await Review.find({ product: product._id }).select('star');
  
}