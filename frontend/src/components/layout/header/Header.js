import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { FaShoppingCart, FaSearch, FaUserAlt } from "react-icons/fa";
import logo from "../../../images/logo.png";

function Header() {
    return <ReactNavbar burgerColor="#eb4034" burgerColorHover="#a62d24"
        logo={logo}
        logoWidth="20vmax"
        navColor1="white"
        logoHoverSize="10px"
        logoHoverColor="#eb4034"
        link1Text="Home"
        link2Text="Product"
        link3Text="Contact"
        link4Text="About"
        link1Url="/"
        link2Url="/products"
        link3Url="/contact"
        link4Url="/about"
        link1Size="1.3vmax"
        link1Color="rgba(35,35,35,0.8)"
        nav1justifyContent="flex-end"
        nav2justifyContent="flex-end"
        nav3justifyContent="flex-start"
        nav4justifyContent="flex-start"
        link1ColorHover="#eb4034"
        link2ColorHover="#eb4034"
        link3ColorHover="#eb4034"
        link4ColorHover="#eb4034"
        link2Margin="1vmax"
        link3Margin="1vmax"
        link4Margin="1vmax"
        cartIcon={true}
        profileIcon={true}
        searchIcon={true}
        CartIconElement={FaShoppingCart}
        ProfileIconElement={FaUserAlt}
        SearchIconElement={FaSearch}
        cartIconColor="rgba(35,35,35,0.8)"
        searchIconColor="rgba(35,35,35,0.8)"
        profileIconColor="rgba(35,35,35,0.8)"
        profileIconColorHover="#eb4034"
        searchIconColorHover="#eb4034"
        cartIconColorHover="#eb4034"
        cartIconMargin="1vmax"
        profileIconSize="2vmax"
    />;
}

export default Header;