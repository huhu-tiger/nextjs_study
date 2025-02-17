import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { Provider } from 'react-redux';
import store from './components/redux/store';
// const a:A = {
//     a:"123"
// }

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
