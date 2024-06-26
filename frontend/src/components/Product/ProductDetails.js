import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsDetails } from "../../store/slice/Products/productSlice.js";
import Loader from "../layout/Loader/Loader.js";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js"

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchProductsDetails(id));
  }, [dispatch, id]);
  const { product, isLoading } = useSelector((state) => state.productDetails);
//   console.log(product);
//   console.log(isLoading);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product ? product.ratings : null,
    isHalf: true,
  };
  return (
    <Fragment>
      {isLoading ? <Loader /> : (
        <div className="ProductDetails">
          <div>
            {/* {isLoading ? (
            <Loader />
          ) : ( */}
            <Carousel>
              {product.images &&
                product.images.map((item, i) => {
                  return (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`Slide ${i}`}
                    />
                  );
                })}
            </Carousel>
          </div>
          {/* )} */}
          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product #{product._id}</p>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />{" "}
              <span>({product.numOfReviews} reviews)</span>
            </div>
            <div className="detailsBlock-3">
              <h3>{`₹${product.price}`}</h3>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button>-</button>
                  <input value="1" type="number" />
                  <button>+</button>
                </div>
                <button>Add to Cart</button>
              </div>
              <p>
                Status:
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
            <div className="detailsBlock-4">
              Description: <p>{product.description}</p>
            </div>
            <button className="submitReview">Submit Review</button>
          </div>

          <h3 className="submitReview">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
            {product.reviews && product.reviews.map((review)=>{
                return <ReviewCard review={review} />
            })}
            </div>
          ): <p className="noReviews"> No Reviews Yet</p>}
          

          

        </div>
      )}
    </Fragment>
  );
};

export default ProductDetails;
