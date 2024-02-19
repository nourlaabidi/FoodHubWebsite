import React from "react";
import "../App.css";


const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-widget">
          <div className="widget">
            <div className="widget-heading">
              <h3>Important Link</h3>
            </div>
            <div className="widget-content">
              <ul>
                <li><a >About</a></li>
                <li><a >Contact</a></li>
                <li><a >Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className="widget">
            <div className="widget-heading">
              <h3>Information</h3>
            </div>
            <div className="widget-content">
              <ul>
                <li><a >My Account</a></li>
                <li><a >My Recipes</a></li>
              </ul>
            </div>
          </div>
          <div className="widget">
            <div className="widget-heading">
              <h3>Follow us</h3>
            </div>
            
            <div className="widget-heading">
              <h3>Subscribe for Newsletter</h3>
            </div>
            <div className="widget-content">
              <div className="subscribe">
                <form>
                  <div className="form-group">
                    <input type="text" className="form-control" name="subscribe" placeholder="Email" />
                  </div>
                </form>
              </div>						
            </div>
          </div>
        </div>
         {/* Footer Bar */}
      </div>
    </footer>
  );
};

export default Footer;
