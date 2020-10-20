const initialStates = {
    name: '',
    category: '',
    price: '',
    description: '',
    picture: '',
    userProducts: [],
 
};

const productsReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        name: action.name,
        category: action.category,
        price: action.price,
        description: action.description,
        picture: action.picture,
        userProducts: state.userProduts.push(action.productList),
  
      };
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