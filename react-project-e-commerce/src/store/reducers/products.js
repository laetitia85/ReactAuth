const initialStates = {
    
    userProducts: [],
 
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
      return {
          ...state,
          userProducts: {
              [action.newProduct.index]: {...action.newProduct} //pour trouver l'element dans le tableau et le changer totalement
          }
      }

  case 'SIGN_OUT_PRODUCT' : 
      return {
        ...state,
        userProducts : []
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
      return {
        ...state,
      };
  }
};

export default productsReducer;