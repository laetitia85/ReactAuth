import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Home from "./Home";
import CreateProducts from "./CreateProducts";
import ProductsList from "./ProductsList";
import Profil from "./Profil";
import Product from "./Product";
import {Button} from 'react-bootstrap'
import axios from "axios";
const jwt = require("jsonwebtoken");



class Header extends Component {
  constructor() {
    super()
    this.state = {
      picture_profil : null,
    }
  }
  render() {
    if (localStorage.getItem("myToken")) {
      return (
        <Router>
          <div>
            <Navbar bg="dark" variant="dark">
              <Nav.Link href="/user">Profil</Nav.Link>

              <Nav.Link href="/productslist">Products</Nav.Link>

              <Nav.Link href="/createproducts">Add Product</Nav.Link>

              <Nav.Link href="/user"><img height='40px' width='40px' alt='' src = {this.state.picture_profil}/></Nav.Link>
              <Nav.Link href="/">
              <Button
                className="ButtonSignOut"
                variant="primary"
                type="submit"
                onClick={this.signOut.bind(this)}>
                SignOut
              </Button>
              </Nav.Link>

            </Navbar>

            <Switch>
              <Route exact={true} path="/user" component={Profil} />

              <Route
                exact={true}
                path="/productslist"
                component={ProductsList}
              />

              <Route
                exact={true}
                path="/createproducts"
                component={CreateProducts}
              />
              <Route
                exact={true}
                path="/productlist/:productId"
                component={Product}
              />
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div>
            <Navbar bg="dark" variant="dark">
              <Nav.Link href="/">Home</Nav.Link>

              <Nav.Link href="/sign-up">Sign-up</Nav.Link>

              <Nav.Link href="/sign-in">Sign-in</Nav.Link>
            </Navbar>

            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route exact={true} path="/sign-in" component={SignIn} />

              <Route exact={true} path="/sign-up" component={SignUp} />
            </Switch>
          </div>
        </Router>
      );
    }
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("myToken");
      const decodeToken = jwt.verify(token, "x_TOKEN_SECRET");
      const userId = decodeToken.id;

      let result = await axios.get(`http://localhost:8000/users/${userId}`);
      // console.log(result)
      this.setState({ picture_profil: result.data[0].picture_profil });
      // console.log(result.data[0].picture_profil)

    } catch (err) {
      console.log(err);
    }
  }
  signOut() {
    localStorage.removeItem("myToken");
    window.location.reload();
  }
}

export default Header;
