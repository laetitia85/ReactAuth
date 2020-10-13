import React, { Component } from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Home from './Home';
import CreateProducts from './CreateProducts'
import ProductsList from './ProductsList'
import Profil from './Profil'


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class Header extends Component {
  render() {
    return (
      <Router>
      <div>
      <Navbar bg="dark" variant="dark">
         
            <Nav.Link href="/">Home</Nav.Link>
       
            <Nav.Link href="/sign-up">Sign-up</Nav.Link>
          
            <Nav.Link href="/sign-in">Sign-in</Nav.Link>
        
          </Navbar>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route exact={true} path="/">
          <Home/>
          </Route>
          <Route  exact={true} path="/sign-in" component={SignIn}/>
          
          <Route exact={true} path="/sign-up">
            <SignUp/>
          </Route>
          <Route exact={true} path="/user">
          <Profil/>
          </Route>
          <Route  exact={true} path="/productslist" component={ProductsList}/>
          
          <Route exact={true} path="/createproducts">
            <CreateProducts/>
          </Route>
        </Switch>
      </div>
    </Router>
  
    );
  };
}
export default Header;