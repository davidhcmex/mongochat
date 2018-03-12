import React, { Component } from 'react';

import Chat  from './Chat';   //WITHOUT curly braces I am  bringing the default (connect), IMPORTANT
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger";
import reducer from './reducers/reducer';

//const reducers = combineReducers()

//very specific pattern
const myLogger = (store) => (next) => (action) => {
  console.log("Logged Action: ", action);
  next(action);
};

const store = createStore(
  reducer, {},
  applyMiddleware(thunk)
  
  //applyMiddleware(logger())
)


class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Chat />
        </Provider>
      </div>
    );
  }
}



export default App;
