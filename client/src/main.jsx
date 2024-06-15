import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store/index.js';
import { saveCart } from './utils/localStorage.js';

// Subscribe to the store to save the current state of cart
// any time an action is dispatched and the state may have changed
// and store in local storage
store.subscribe(() => {
  saveCart({
    cart: {
      listCart: store.getState().cart.listCart,
      cartTotal: store.getState().cart.cartTotal,
    },
  });
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
