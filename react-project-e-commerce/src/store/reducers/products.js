const initialStates = {
      userProducts: [],
      carteProducts: [],
  };
 

const productsReducer = (state = initialStates, action) => {
  switch (action.type) {
    case 'FETCH_PRODUTS':
      return{
        ...state,
        userProducts : [...state.userProducts, action.productListe] // push tous les data dans le state
      }

    case 'ADD_PRODUCT':
      return {
          ...state,
          userProducts: [...state.userProducts, action.newProduct] // =  autre façon de faire push
      }
  case 'MODIFY_PRODUCT':
    let ModifyElem  = state.userProducts.filter(elem => elem.products_id === parseInt(action.id))
    let MyIndex = state.userProducts.indexOf(ModifyElem[0])
    let props = Object.keys(action.payload)
    
    props.forEach((elem) => {
         ModifyElem[0][elem] = action.payload[elem]
    })
    // for (let key in props) {
    //   ModifyElem[0][key] = action.payload[key]
     
  // }
      return {
          ...state,
          userProducts: [
            ...state.userProducts.slice(0, MyIndex),
            ModifyElem[0] ,
            ...state.userProducts.slice(MyIndex+1 , state.userProducts.length),
              // [action.newProduct.index]: {...action.newProduct} //pour trouver l'element dans le tableau et le changer totalement
          ]
      }

  case 'SIGN_OUT_PRODUCT' : 
      return {
        ...state,
        userProducts : [],
        carteProducts:[],
      }

  case 'DELETE_PRODUCT' :
    let elemToDelete  = state.userProducts.filter(elem => elem.id === parseInt(action.payload))
    console.log(elemToDelete)
    let index = state.userProducts.indexOf(elemToDelete[0])

  return {
    ...state,
    userProducts: [
      ...state.userProducts.slice(0, index),                 // slice (o == index 0, index == index de mon élément)
      ...state.userProducts.slice(
        index + 1,
        state.userProducts.length
      ),                                                     // slice (index+1 == index au-dessus de celui que l'on à supprimer jusqu'à la fin du tableau)
    ],

  }

  case "ADD_TOCART" :
    let elemToAdd  = state.carteProducts.filter(elem => elem.id === parseInt(action.payload.id))
    if(elemToAdd.length === 0){
      action.payload.quantity +=1
      action.payload.priceOfQuantity =  action.payload.quantity *  action.payload.price
      
      return{
        ...state,
        carteProducts : [...state.carteProducts, action.payload ]
      }
    }else{
      elemToAdd[0].quantity +=1
      elemToAdd[0].priceOfQuantity =  elemToAdd[0].quantity *  elemToAdd[0].price

      let index = state.carteProducts.indexOf(elemToAdd[0])
      return{
        ...state,
        carteProducts: [
          ...state.carteProducts.slice(0, index),
          elemToAdd[0],
          ...state.carteProducts.slice(index + 1, state.carteProducts.length),
        ],
      }
    }
    case  "DEC_QUANTITY":
    let elemTrouve  = state.carteProducts.filter(elem => elem.id === parseInt(action.payload))
    let elemIndex = state.carteProducts.indexOf(elemTrouve[0])
    elemTrouve[0].quantity -= 1
    if(elemTrouve[0].quantity > 0){
      elemTrouve[0].priceOfQuantity =  elemTrouve[0].quantity *  elemTrouve[0].price
      return{
        ...state,
        carteProducts: [
          ...state.carteProducts.slice(0, elemIndex),
          elemTrouve[0],
          ...state.carteProducts.slice(elemIndex + 1, state.carteProducts.length),
        ],
      }
    }else{
      return{
        ...state,
        carteProducts: [
          ...state.carteProducts.slice(0, elemIndex),
          ...state.carteProducts.slice(elemIndex + 1, state.carteProducts.length),
        ],
      }
    }
   
   
    case "INC_QUANTITY":
      //console.log('action.payload', action.payload);
    let elemTochange  = state.carteProducts.filter(elem => elem.id === parseInt(action.payload))
    //console.log('carte element', elemTochange);
    let myIndex = state.carteProducts.indexOf(elemTochange[0])
    elemTochange[0].quantity += 1
    elemTochange[0].priceOfQuantity =  elemTochange[0].quantity *  elemTochange[0].price

    return{
      ...state,
      carteProducts: [
        ...state.carteProducts.slice(0, myIndex),
        elemTochange[0],
        ...state.carteProducts.slice(myIndex + 1, state.carteProducts.length),
      ],
    }
    // case "ADD_USER_EMAIL":
    //   return {
    //     ...state,
    //     email: action.email,
    //   };
    //   case "ADD_USER_PASSWORD":
    //     return {
    //       ...state,
    //       password: action.password,
    //     };
    //     case "PICTURE_PROFIL":
    //       return {
    //         ...state,
    //         picture_profil: action.picture_profil,
    //       };
    default:
      return state
    
  }
};

export default productsReducer;