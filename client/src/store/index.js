import { combineReducers, createStore } from 'redux';
import { loadCart } from '../utils/localStorage.js';

// Load cart from local storage
const persistedState = loadCart();
// Define initial state
const popupState = { product: {}, showPopUp: false };
const authState = { user: {}, isAuth: false };
const cartState = { listCart: [], cartTotal: 0, persistedState };
// Define popup reducer
const popupReducer = (state = popupState, action) => {
  switch (action.type) {
    // Show popup with product detail
    case 'SHOW_POPUP':
      return { product: action.payload, showPopUp: true };
    case 'HIDE_POPUP':
      return { ...state, showPopUp: false };
    default:
      return state;
  }
};
// Define auth reducer
const authReducer = (state = authState, action) => {
  switch (action.type) {
    // When user login successfully then set isAuth to true and save user info
    case 'ON_LOGIN':
      return { isAuth: true, user: action.payload.username };
    // When user logout then set isAuth to false and remove user info
    case 'ON_LOGOUT':
      return { isAuth: false, user: null };
    case 'SET_AUTH':
      return { ...state, isAuth: action.isAuth };
    default:
      return state;
  }
};
// Define cart reducer
const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case 'ADD_CART': {
      // check if item already exist in cart
      // then combine the quantity
      const addedProduct = action.payload.product;
      const addedQuantity = action.payload.quantity;
      const addedTotal = addedProduct.price * addedQuantity;
      // Check if the product already exists in cart
      const exist = state.listCart.find((item) => item.product._id === action.payload.product._id);
      if (exist) {
        // If the product already exists in cart, then update the quantity and total
        const updatedList = state.listCart.map((item) => {
          if (item.product._id === action.payload.product._id) {
            const updatedQuantity = item.quantity + action.payload.quantity;
            const updatedTotal = item.product.price * updatedQuantity;

            return {
              ...item,
              quantity: updatedQuantity,
              total: updatedTotal,
            };
          }
          return item;
        });
        return {
          ...state,
          listCart: updatedList,
          // Calculate the total price of the cart
          cartTotal: updatedList.reduce((total, item) => total + item.total, 0),
        };
      }
      // If the product does not exist in cart, then add it to cart
      return {
        ...state,
        listCart: [...state.listCart, { product: addedProduct, quantity: addedQuantity, total: addedTotal }],
        cartTotal: state.cartTotal + addedTotal,
      };
    }
    case 'UPDATE_CART': {
      // Update the quantity and total of the product in cart
      let updatedList = state.listCart.map((item) => {
        // Check if the product is exist in cart then update the quantity and total
        if (item.product._id === action.payload.product._id) {
          const updatedQuantity = action.payload.quantity;
          const updatedTotal = action.payload.product.price * updatedQuantity;

          return {
            ...item,
            quantity: updatedQuantity,
            total: updatedTotal,
          };
        }
        return item;
      });
      // If the product is not exist in cart then add it to cart
      return {
        ...state,
        listCart: updatedList,
        cartTotal: updatedList.reduce((total, item) => total + item.total, 0),
      };
    }
    case 'DELETE_CART': {
      // Get the product id that need to be deleted
      const deletedProductId = action.payload.productId;
      // Find the product that need to be deleted
      const deletedItem = state.listCart.find((item) => item.product._id === deletedProductId);
      // Remove the product from cart
      const updatedCart = state.listCart.filter((item) => item.product._id !== deletedProductId);

      return {
        ...state,
        listCart: updatedCart,
        cartTotal: state.cartTotal - deletedItem.total,
      };
    }
    case 'RESET_CART': {
      // Reset the cart to its initial state
      return {
        ...state,
        listCart: [],
        cartTotal: 0,
      };
    }
    default:
      return state;
  }
};
// Combine all reducers
const rootReducer = combineReducers({
  popup: popupReducer,
  auth: authReducer,
  cart: cartReducer,
});

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
