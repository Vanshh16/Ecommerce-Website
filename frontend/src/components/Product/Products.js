import React, { Fragment, useEffect } from "react";
import "./Products.css";
// import Product from "./Product.js";
// import Metadata from "../layout/MetaData.js";
import Loader from "../layout/Loader/Loader.js";
import { useDispatch, useSelector } from "react-redux";
// import {useAlert} from "react-alert";
import { fetchAllProducts } from "../../store/slice/Products/productSlice.js";
import Product from "../Home/Product.js";
import {useParams} from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const {keyword} = useParams();

  const { isLoading, products, numOfProducts } = useSelector(
    (state) => state.allProducts
  );
  console.log(products);
  useEffect(() => {
    dispatch(fetchAllProducts(keyword));
  }, [dispatch, keyword]);

  // console.log(keyword);

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => {
                return <Product key={product._id} product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
