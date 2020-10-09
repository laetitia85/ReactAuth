import React, { Component } from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Home from './Home';


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
          <Route  path="/sign-in" component={SignIn}/>
          
          <Route path="/sign-up">
            <SignUp/>
          </Route>
        </Switch>
      </div>
    </Router>
  
    );
  };
}
export default Header;