// import React, { Component } from 'react';
// import CreateProducts from './CreateProducts'
// import ProductsList from './ProductsList'
// import Navbar from 'react-bootstrap/Navbar'
// import Nav from 'react-bootstrap/Nav'
// import Profil from './Profil'
// import {Button} from 'react-bootstrap'



// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
// } from "react-router-dom";


// class ConnectedHeader extends Component {
//   constructor() {
//     super()
//     this.state = {
//       redirect: false,
//     }
//   }
//   render() {
//     return (
//       <Router>
//       <div>
//       <Navbar bg="dark" variant="dark">
         
//             <Nav.Link href="/user">Profil</Nav.Link>
       
//             <Nav.Link href="/productslist">Products</Nav.Link>
          
//             <Nav.Link href="/createproducts">Add Product</Nav.Link>

//             <Button className ="ButtonSignOut" variant="primary" type="submit" onClick={this.signOut.bind(this)}>SignOut</Button>
        
//           </Navbar>

//         {/* A <Switch> looks through its children <Route>s and
//           renders the first one that matches the current URL. */}
//         <Switch>
//           <Route exact={true} path="/user">
//           <Profil/>
//           </Route>
//           <Route  exact={true} path="/productslist" component={ProductsList}/>
          
//           <Route exact={true} path="/createproducts">
//             <CreateProducts/>
//           </Route>
//         </Switch>
//       </div>
//     </Router>
  
//     );
//   };
//   signOut() {
//     localStorage.removeItem("myToken")
    
//   }
// }


// export default ConnectedHeader;
