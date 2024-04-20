import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import Metadata from "../layout/MetaData.js";
import Loader from "../layout/Loader/Loader.js";
// import { getProduct } from "../../actions/productAction.js";
import { useDispatch, useSelector } from "react-redux";
import {useAlert} from "react-alert";
import { fetchAllProducts } from "../../store/slice/Products/productSlice.js";

// const product = {
//   name: "Blue Tshirt",
//   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//   price: "3000",
//   _id: "abhishek",
// };

const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const {isLoading, products, error} = useSelector((state) => {
    return state.allProducts;
  });

  console.log(products);
  useEffect(() => {

    if(error){
      return alert.error(error);
    }
    dispatch(fetchAllProducts());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {isLoading ? <Loader /> : <Fragment>
      <Metadata title="ECOMMERCE" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products && products.map(function (product) {
            return <Product product={product} />;
          })}
      </div>
    </Fragment>}
    </Fragment>
  );
};

export default Home;
