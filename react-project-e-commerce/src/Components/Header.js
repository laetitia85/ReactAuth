import { Link } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button} from "react-bootstrap";
import { connect } from "react-redux";
import { signOutUser } from "../store/actions/users";
import { signOutProduct } from "../store/actions/products";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      picture_profil: null,
    };
  }
  render() {
    if (this.props.token) {
      return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/user">
                Profil
              </Nav.Link>

              <Nav.Link as={Link} to="/productslist">
                Products
              </Nav.Link>

              <Nav.Link as={Link} to="/createproducts">
                Add Product
              </Nav.Link>

              <Nav.Link as={Link} to="/myorders">
               My Orders
              </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link as={Link} to="/user">
                <img
                  height="40px"
                  width="40px"
                  alt=""
                  src={this.props.picture_profil}
                />
              </Nav.Link>

              <Nav.Link as={Link} to="/">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.signOut.bind(this)}
                >
                  SignOut
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar>
        </div>
      );
    } else if (this.props.token == null) {
      return (
        <div>
          <Navbar bg="dark" variant="dark">
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/sign-up">
                Sign-up
              </Nav.Link>

              <Nav.Link as={Link} to="/sign-in">
                Sign-in
              </Nav.Link>
            </Nav>
          </Navbar>
        </div>
      );
    }
  }

  signOut() {
    this.props.signOutUser();
    this.props.signOutProduct();
  }
}

const mapStateToProps = (state) => ({
  token: state.usersReducer.token,
  id: state.usersReducer.id,
  picture_profil: state.usersReducer.picture_profil,
});

const mapDispatchToProps = {
  signOutUser,
  signOutProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
