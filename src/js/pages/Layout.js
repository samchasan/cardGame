import React from "react";
// import { Link } from "react-router";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

class Layout extends React.Component {
  render() {
    const { children  } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };
    console.log("layout");
    return (
      <div>
          <Header/>
              <div class="container" style={containerStyle}>
              {children}                                     
              </div>
          <Footer/>
      </div>
    );
  }
}
export default Layout