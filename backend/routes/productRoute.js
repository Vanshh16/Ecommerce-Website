const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);

router.route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .get(getProductDetails);

router.route("/product/:id").get(getProductDetails);  

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getAllReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;
