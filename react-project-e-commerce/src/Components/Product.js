import React, { Component } from 'react';
import axios  from 'axios' 
import  { Link } from 'react-router-dom'

class Product extends Component {
    constructor() {
        super()
        this.state = {
            items : [],
        }
    }
    render() {

        return (
            <div className="container">
                {this.state.items.map(item => (
                    <div key={item.id} className="productList" onClick={this.showDetail.bind(this)} id={item.id}>
                        <Link to={`/productslist/${item.id}`}>

                       <img height='200px' width='200px' alt='' src= {item.picture}></img>
                        </Link>
                        <div className="productNamePrice">
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                        </div>
                    </div>
                )
                )}
            </div>
        )
}


    async componentDidMount() {
        try {
          let result = await axios.get('http://localhost:8000/products')
          console.log('aaaaaaaaaaaaa')
          console.log(result.data);
          this.setState({
           items: result.data
    
          })
        } catch (error) {
          console.log(error);
        }
    }
}
export default Product;
