import React from "react";
import { NavLink } from "react-router-dom";

export default class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }


  render() {
    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <NavLink to="/"> Home | </NavLink>
        <NavLink to="/about"> About | </NavLink>
        <NavLink to="/contact"> Contact</NavLink>
      </nav>
    );
  }
}
