import React, { Component } from 'react';
import axios  from 'axios' 
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import {  addToCart } from "../store/actions/products";

class Product extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            userName: '',
            productName: '',
            picture: '',
            price: '',
            description: '',
            category: '',
            quantity : 0,
            priceOfQuantity : 0,
        }
    }
    render() {
        if (this.state !== null) {
            return (
                <div>
                    <h2>{this.state.productName}</h2>
                    <div key={this.state.id} className="productElement">
                        <img src={this.state.picture} alt='' height='20%' width='20%'></img>
                    
                        <div className="description">
                             <b>proposed by: {this.state.userName}</b>
                            <p><b>the price is:</b> {this.state.price ||'There is no price'}</p>
                            <p><b>Category: </b>{this.state.category || 'There is no category'}</p>
                            <p><b>description:</b><br></br>{this.state.description || 'There is no description'}</p>
                        </div>
                    </div>
                    <Button className ="Buttons" variant="primary" type="submit" onClick={this.add.bind(this)}>Add to Basket</Button>
                </div>
            )
        } else {
            return (
                <div>
                   There is no information 
                </div>
            )
        }
    }

    add(e){
        e.preventDefault();
        this.props.addToCart(this.state)
    }

    async componentDidMount() {
        // console.log('in the product component');
        // console.log(this.props.productID);

        try {
            let productData = await axios.get(`http://localhost:8000/products/${this.props.productID}`)
            console.log(productData.data[0]);
            this.setState({
                id: productData.data[0].id,
                userName: productData.data[0].name,
                productName: productData.data[0].products_name,
                picture: productData.data[0].picture,
                price: productData.data[0].price,
                description: productData.data[0].description,
                category: productData.data[0].category
            })
        } catch (error) {
            console.log(error);
        }

    }
}

    const mapDispatchToProps = {
        addToCart
      };

     

export default connect(null, mapDispatchToProps)(Product);
