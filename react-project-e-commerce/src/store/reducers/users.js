const initialStates = {
  name: null,
  email: null,
  id: null,
  token: null,
  picture_profil: null,
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
        picture_profil: action.picture_profil,
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        name: action.name,
        email: action.email,
        id: action.id,
        token: action.token,
        picture_profil: action.picture_profil,
      };
    case "CHANGE_USER_DATA":
      let change = Object.keys(action.payload);
      change.forEach((elem) => {
        state[elem] = action.payload[elem];
      });
      return {
        ...state,
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
      return state;
  }
};

export default usersReducer;
