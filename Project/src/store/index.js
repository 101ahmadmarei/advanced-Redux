import { createSlice, configureStore } from "@reduxjs/toolkit";
const DummyItems = [
  {
    id: 1,
    title: "pizza",
    price: 6,
    description: "This is a first product - amazing!",
    quantity: 0,
  },
  {
    id: 2,
    title: "tomato",
    price: 8,
    description: "This is a second product - amazing!",
    quantity: 0,
  },
  {
    id: 3,
    title: "potato",
    price: 10,
    description: "This is a second product - amazing!",
    quantity: 0,
  },
];

const initialState = {
  showCart: false,
  items: DummyItems,
  notification: null,
  isChange: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload;
    },
    showCart(state) {
      state.showCart = !state.showCart;
    },
    increaseQuantity(state, action) {
      const existingItems = state.items.find(
        (item) => item.id === +action.payload
      );
      existingItems.quantity++;
      state.isChange = true;
    },
    decreaseQuantity(state, action) {
      const existingItems = state.items.find(
        (item) => item.id === +action.payload
      );
      existingItems.quantity--;
      state.isChange = true;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
export const cartAction = cartSlice.actions;
export const sendCartData = (cartItems) => {
  return async (dispatch) => {
    dispatch(
      cartAction.showNotification({
        status: "pending",
        title: "Sending...",
        message: "sending cart data! ",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-90082-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartItems),
        }
      );

      if (!response.ok) {
        throw new Error("Sending Cart Data Failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        cartAction.showNotification({
          status: "Success",
          title: "Success!",
          message: "sent cart data Success ",
        })
      );
    } catch (error) {
      dispatch(
        cartAction.showNotification({
          status: "Error",
          title: "Error!",
          message: "Sending Cart Data Failed",
        })
      );
    }
  };
};
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://redux-90082-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }

      const data = await response.json();
      return data;
    };
    try {
      const data = await fetchData();
      dispatch(cartAction.replaceCart(data));
    } catch (error) {
      dispatch(
        cartAction.showNotification({
          status: "Error",
          title: "Error!",
          message: "fetching Cart Data Failed",
        })
      );
    }
  };
};
const store = configureStore({ reducer: cartSlice.reducer });
export default store;
