import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { BrowserRouter, Link, Route } from "react-router";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import Gameroom from "./js/pages/Gameroom";
import Layout from "./js/pages/Layout";
import Nav from './js/components/layout/Nav'


import Contact from "./js/pages/Contact";
import Home from './js/pages/Home'
import About from './js/pages/About'
import Error from './js/pages/Error'
import Game from './js/pages/Game'
import Users from './js/pages/Game'

const app = document.getElementById('root')




  const LayoutRoute = ({component: Component, ...rest}) => {
    return (
      <Route {...rest} render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )} />
    )
  };




ReactDOM.render(
    <BrowserRouter>
        <div>
            <Nav />
            <Switch>
                    <LayoutRoute path='/' component={Home} exact/>
                    <LayoutRoute path='/contact' component={Contact} />
                    <LayoutRoute path='/about' component={About} />
                    <LayoutRoute path='/users' component={Users} />
                    <LayoutRoute path='/game/:id' component={Game}/>
                    <Route path='/events' />
                    <LayoutRoute component={Error} />
            </Switch>
        </div>
    </BrowserRouter>, app);

