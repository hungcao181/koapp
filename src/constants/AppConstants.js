var keyMirror = require('keymirror');

let actionConstants = {

  ActionTypes: keyMirror({
    ADD_ROOM: null,
    UPDATE_ROOM: null,
    DEL_ROOM: null,
    OK200: null
  }),
  CartActionTypes: keyMirror({
  CART_ADD: null,       // Adds item to cart
  CART_REMOVE: null,    // Remove item from cart
  CART_VISIBLE: null,   // Shows or hides the cart
  SET_SELECTED: null,   // Selects a product option
  RECEIVE_DATA: null    // Loads our mock data
  })
};

export default actionConstants;
export const ActionTypes = actionConstants.ActionTypes;
export const CartActionTypes = actionConstants.CartActionTypes;  