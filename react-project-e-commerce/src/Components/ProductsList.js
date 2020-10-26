import React, { Component } from 'react';
import axios  from 'axios'
import Product from './Product'
// import  { Link } from 'react-router-dom'


class ProductsList extends Component {
    constructor(){
        super();
        this.state= {
          items: [],
          item: [],
          redirect: false,
          id: null,
          categoryTab: [],
        }
      }
    render() {
         if ( this.state.items !== null && this.state.redirect === false) {
            return (
                <div>
                <select className="select" onChange={this.selectCategory.bind(this)}>
                <option value= "">Choose your category</option>
                {this.state.categoryTab.map((elem) => {
                  return <option  value={elem.category}>{elem.category}</option>;
                })}
              </select>
                <div className="container list">
                    {this.state.items.map(item => (
                        <div key={item.id} className="productList" >
                            {/* <Link to={`/productslist/${item.id}`}> */}
                                
                          <img  src={item.picture} alt='click here for more details' height='200px' width='200px' id={item.id} onClick={this.displayProduct.bind(this)} />
                            {/* </Link> */}
                            <div className="productNamePrice">
                                <b>{item.name}</b>
                                <br></br>
                                <b>{item.price}</b>
                            </div>
                        </div>
                    )
                    )}
                </div>
                </div>
            )
        } else if(this.state.redirect === true){
            return (
                <div className="container">

                   <Product productID={this.state.id} />
                 
                </div>
            )
        }
    }
    async componentDidMount() {
        
        try {
          let result = await axios.get(`http://localhost:8000/products`)
          
          this.setState({
           items: result.data
            
        }) 
          
          let resultat = await axios.get("http://localhost:8000/category");
        //   console.log(resultat);
          this.setState({ categoryTab: resultat.data 
        
        });

        } catch (error) {
          console.log(error);
        }
        
    }

    async selectCategory(e) {
        if(e.target.value === '') {
            this.componentDidMount()
        }else {
        console.log(e.target.value)
        let result = await axios.get(`http://localhost:8000/category/${e.target.value}`)
        this.setState({items : result.data})
    }}
    
    displayProduct(e){

        console.log('event target: =>' , e.target.id);
        // let productID = parseInt(e.target.id)
        // let oneItem = this.state.items.filter( elem => elem.id === productID)
        // console.log( 'ID to oneItem::::',oneItem[0].id);
        // console.log( 'i am oneItem id:::', typeof oneItem[0].id);

        this.setState({
            redirect: true,
            // item: this.state.item.push(oneItem[0]),
            id:  parseInt(e.target.id)
        })

        // console.log('my item in the state:::::',typeof this.state.item);
        // console.log('my redirect in the state::::',this.state.redirect);
        // console.log(' my id::::', this.state.id);
        }

}

export default ProductsList;