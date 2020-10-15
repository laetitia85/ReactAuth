import React, { Component } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
const jwt = require("jsonwebtoken");

class Profil extends Component {
  constructor() {
  super()
  this.state = {
    name: '',
    email:'',
    picture_profil: '',
    product_name: [],
    products_id: [],

  }
  }
  render() {
    return (
      <div className="container">
   
    <h1>Welcome {this.state.name}</h1>

    <div><img height='40px' width='40px' alt='' src={this.state.picture_profil}/></div>

    <h5>Coordonnées</h5>
    <p>name : {this.state.name}</p>
    <p>email : {this.state.email}</p>

    <h5>Infos Produits</h5>
    
    <div className='ul'>
   

        <ul>
        <h6>Name Products</h6>
          {this.state.product_name.map(product => 
            <li key={product} data-letter={product} onClick={this.handleClick}>
              {product}
            </li>
          )}
        </ul>
      
  
        <ul>
        <h6>Products</h6>
          {this.state.products_id.map(productId => 
            <li key={productId} data-letter={productId} onClick={this.handleClick}>
              {productId}
            </li>
          )}
        </ul>
        </div>

        <Button className ="Buttons" variant="primary" type="submit" onClick={this.Delete}>Delete</Button>

      </div>
    );
  }

  async componentDidMount() {
    try {
      let token = localStorage.getItem("myToken");
      const decodeToken = jwt.verify(token, "x_TOKEN_SECRET");
      const userId = decodeToken.id;

      let result = await axios.get(`http://localhost:8000/users/${userId}`);
      console.log(userId)
      console.log(result.data)
      // console.log(result)
      const tabNameProduct = result.data.map(x => x.name)
      // console.log(tabNameProduct)

      const tabIdProduct = result.data.map(y => y.products_id)
      // console.log(tabIdProduct)
       
      
      this.setState({ name: result.data[0].user_name, email: result.data[0].email, password:result.data[0].password, picture_profil: result.data[0].picture_profil,  product_name: tabNameProduct, products_id: tabIdProduct });
 
      // console.log(result.data)

     
    } catch (err) {
      console.log(err);
    }
  }
}

export default Profil;