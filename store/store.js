import { createStore, applyMiddleware, combineReducers } from "redux";
import appReducer from "./reducers/mainReducer";
import createSagaMiddleware from "redux-saga";
import mySaga from "./saga/rootSaga";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
};

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create the saga middleware

const combinedReducer = combineReducers({
  appReducer,
});

// 1: Create the middleware
const sagaMiddleware = createSagaMiddleware();

// 2: Add an extra parameter for applying middleware:
const store = createStore(combinedReducer, bindMiddleware([sagaMiddleware]));

// 3: Run your sagas on server
store.sagaTask = sagaMiddleware.run(mySaga);

// 4: now return the store:
export default store;
