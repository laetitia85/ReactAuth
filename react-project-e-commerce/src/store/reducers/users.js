const initialStates = {
    name: "",
    email: "",
    password:"",
};

const usersReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "ADD_USER_NAME":
      return {
        ...state,
        name: action.name,
      };
    case "ADD_USER_EMAIL":
      return {
        ...state,
        email: action.email,
      };
      case "ADD_USER_PASSWORD":
        return {
          ...state,
          password: action.password,
        };
    default:
      return {
        ...state,
      };
  }
};

export default usersReducer;