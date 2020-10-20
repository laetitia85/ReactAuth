const initialStates = {
    name: "",
    email: "",
    id:null,
    token: null,
 
};

const usersReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
        name: action.name,
        email: action.email,
        id: action.id,
        token: action.token,
    
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

export default usersReducer;