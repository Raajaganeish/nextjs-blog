const initialState = {
  loggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_SUCCESS_REGISTER":
      return {
        ...state,
        loggedIn: true,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
