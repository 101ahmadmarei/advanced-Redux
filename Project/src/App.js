import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData } from "./store/index";
import { fetchCartData } from "./store/index";
import Notification from "./components/UI/Notification";
let isInitial = true;
function App() {
  const showCart = useSelector((state) => state.showCart);
  const cartItems = useSelector((state) => state.items);
  const notification = useSelector((state) => state.notification);
  const isChange = useSelector((state) => state.isChange);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isInitial) {
      dispatch(fetchCartData());
      isInitial = false;
      return;
    }
    if (isChange) {
      dispatch(sendCartData(cartItems));
    }
  }, [cartItems, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
