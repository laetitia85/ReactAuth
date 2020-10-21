const initialStates = {
<<<<<<< HEAD
  email: null,
  id:null,
  token: null,

=======
    email: null,
    id:null,
    token: null,
 
>>>>>>> 1bd06566151de772e8a9c83db284851865c8fbfd
};

const usersReducer = (state = initialStates, action) => {
switch (action.type) {
  case "SIGNIN_USER":
    return {
      ...state,
      email: action.email,
      id: action.id,
      token: action.token,
  
    }
    case "SIGNOUT_USER":
      return{
        ...state,
        email: action.email,
        id: action.id,
<<<<<<< HEAD
        token: action.token, 
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
=======
        token: action.token,
    
      }
      case "SIGNOUT_USER":
        return{
          ...state,
          email: action.email,
          id: action.id,
          token: action.token, 
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
>>>>>>> 1bd06566151de772e8a9c83db284851865c8fbfd
};

export default usersReducer;