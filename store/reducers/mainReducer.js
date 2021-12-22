// create your reducer
const initialState = {
  counter: 0,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...action.payload };
    case "INCREASE_COUNTER":
      return { ...state, counter: state.counter + action.data };
    default:
      return state;
  }
};

export default appReducer;
