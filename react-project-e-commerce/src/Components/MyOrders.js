import React, { Component } from "react";
import { connect } from "react-redux";
import { incQuantity, decQuantity } from "../store/actions/products";
import { Button } from "react-bootstrap";

class MyOrders extends Component {
  componentDidMount() {
    console.log(this.props.carteProducts);
  }
  render() {
    if (this.props.carteProducts.length >= 1) {
      return (
        <div className="container">
          <h1>My Cart</h1>
          {this.props.carteProducts.map((item) => (
            <div key={item.id} className="productElement">
              <img src={item.picture} alt="" height="200px" width="200px" />
              <div className="description">
                <b>The name of this product: </b>
                {item.productName}
                <p></p>
                <b>The price: </b>
                {item.price}
                <br></br>
                <br></br>
                <b>Quantity: </b> {item.quantity}
                <br></br>
                <br></br>
                <b>Sub Total: </b> {item.priceOfQuantity}
                <br></br>
                <br></br>
                <div className="sb">
                  <button
                    type="submit"
                    onClick={this.decrement.bind(this)}
                    name={item.id}
                    className="Beutton"
                  >
                    -
                  </button>

                  <button
                    type="submit"
                    id={item.id}
                    onClick={this.increment.bind(this)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <hr></hr>

          <b>The total = </b>
          {this.props.carteProducts.length >= 2
            ? this.props.carteProducts.reduce((a, b) => {
                return a.priceOfQuantity + b.priceOfQuantity;
              })
            : this.props.carteProducts.length === 1
            ? this.props.carteProducts[0].priceOfQuantity
            : 0}
          <Button className="Buttons" variant="primary" type="submit">
            Buy
          </Button>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>My Cart</h1>
          <b>You don't have any products</b>
        </div>
      );
    }
  }

  decrement(e) {
    e.preventDefault();
    let productID = e.target.name;
    this.props.decQuantity(productID);
  }
  increment(e) {
    e.preventDefault();
    console.log(" i am in myorder", e.target.id);
    this.props.incQuantity(e.target.id);
  }
}
const mapStateToProps = (state) => ({
  carteProducts: state.productsReducer.carteProducts,
  totalPrice: state.productsReducer.totalPrice,
});
const mapDispatchToProps = {
  incQuantity,
  decQuantity,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
