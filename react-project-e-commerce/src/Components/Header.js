import { Link } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Button} from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { signOutUser } from "../store/actions/users";
import { signOutProduct } from "../store/actions/products";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      // categoryTab: [],
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
            </Nav>

            <Nav>
              <Nav.Link as={Link} to="/user">
                <img
                  height="40px"
                  width="40px"
                  alt=""
                  src={this.state.picture_profil}
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

  // async componentDidMount() {
  //   let result = await axios.get("http://localhost:8000/category");
  //   console.log(result);
  //   this.setState({ categoryTab: result.data });
  // }

  async componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      try {
        let result = await axios.get(
          `http://localhost:8000/users/${this.props.id}`
        );
        this.setState({ picture_profil: result.data[0].picture_profil });
      } catch (err) {
        console.log(err);
      }
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
});
const mapDispatchToProps = {
  signOutUser,
  signOutProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
