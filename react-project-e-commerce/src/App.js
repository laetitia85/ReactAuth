import React, { Component } from "react";
import "./App.css";
import Header from "./Components/Header";
import MyOrders from "./Components/MyOrders"
import {BrowserRouter as Router, Switch, Route, Redirect,} from "react-router-dom";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import CreateProducts from "./Components/CreateProducts";
import ProductsList from "./Components/ProductsList";
import Profil from "./Components/Profil";
import EditProducts from "./Components/EditProducts";
import { connect } from "react-redux";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact={true} path="/user">
           
              {this.props.token ? <Profil /> : <Redirect to="/" />}
            </Route>

            <Route exact={true} path="/productslist">
           
              {this.props.token ? <ProductsList /> : <Redirect to="/" />}
            </Route>

            <Route exact={true} path="/createproducts">
           
              {this.props.token ? <CreateProducts /> : <Redirect to="/" />}
            </Route>
            <Route exact={true} path="/editproducts/:id" component={EditProducts}/>
               <Route exact={true} path="/mycart">
              {this.props.token ? <MyOrders /> : <Redirect to="/" />}
            </Route>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/sign-in" component={SignIn} />

            <Route exact={true} path="/sign-up" component={SignUp} />
            <Route path="*">
              <div className="container">404 NOT FOUND</div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.usersReducer.token,
});

export default connect(mapStateToProps)(App);
