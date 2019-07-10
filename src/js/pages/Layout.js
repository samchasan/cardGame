import React from "react";
// import { Link } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";


class Layout extends React.Component {

  constructor() {
    super();

  }

  render() {
    const { children  } = this.props;
    const containerStyle = {
      marginTop: "60px"
    };

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