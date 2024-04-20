import React from "react";
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import logo from "../../../images/logo.png";
import "./Footer.css";
function Footer() {
    return <footer id="footer">
    <div className="leftFooter">
        <h4>Download our App</h4>
        <p>For Android or IOS mobile phone</p>
        <img src={playstore} alt="PlayStore"></img>
        <img src={appstore} alt="AppStore"></img>
    </div>
    <div className="midFooter">
        <img src={logo} alt="Logo"></img>
        <p>High quality is our first priority</p>
        <p>Copyrights Vansh Nigam 2024 &copy;</p>
    </div>
    <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com">Instagram</a>
        <a href="http://youtube.com">Youtube</a>
        <a href="http://facebook.com">Facebook</a>
    </div>
    </footer>
}
export default Footer;