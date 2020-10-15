import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import CreateProducts from "./Components/CreateProducts";
import ProductsList from "./Components/ProductsList";
import Profil from "./Components/Profil";
import Product from "./Components/Product";


class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Router>
          <Switch>
            <Route exact={true} path="/user" component={Profil} />

            <Route exact={true} path="/productslist" component={ProductsList} />

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
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/sign-in" component={SignIn} />

            <Route exact={true} path="/sign-up" component={SignUp} />
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App;
