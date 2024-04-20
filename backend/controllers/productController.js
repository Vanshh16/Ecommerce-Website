const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product --Admin
exports.createProduct  = catchAsyncError(async (req,res,next) => {
    
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    }); 
})

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req,res,next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success:true, 
        product
    });
})



// Get All Products

exports.getAllProducts = catchAsyncError(async (req,res,next) => {
    const productCount = await Product.countDocuments();
    const resultsPerPage = 8;

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultsPerPage);
    const products = await apiFeature.query;

    res.status(200).json({
        success:true, 
        products,
        productCount
    });
})

// Update Product --Admin
exports.updateProduct = catchAsyncError(async (req,res,next) => {

    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });

})

// Delete Product --Admin
exports.deleteProduct = catchAsyncError(async (req,res,next) => {

    const product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.deleteOne();
    res.status(200).json({
        success: true,
        message: "Product Deleted"
    });
})

// Create or Update Product Review
exports.createProductReview = catchAsyncError(async (req, res, next) => {

    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment: comment,
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find( (rev) =>{
        rev.user.toString() === req.user._id.toString()
    });

    if(isReviewed){
        product.reviews.forEach( (rev) => {
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let sum = 0;
    // Average rating
    product.reviews.forEach((rev) => {
        sum = sum + rev.rating;
    }) 
    product.ratings = sum / product.reviews.length;
    await product.save({validateBeforeSave: false});
    res.status(200).json({
        success: true
    });
});

// Get All Reviews
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
})

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());
    console.log(reviews);
    // Average rating
    let sum = 0;
    reviews.forEach((rev) => {
        sum = sum + rev.rating;
    }) 
    const ratings = sum / reviews.length;
    const numOfReviews = reviews.length;
    
    await Product.findByIdAndUpdate(req.query.productId, {reviews, numOfReviews, ratings})
    res.status(200).json({
        success: true,
    });
})