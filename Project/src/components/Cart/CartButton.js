import classes from "./CartButton.module.css";
import { cartAction } from "../../store/index";
import { useSelector, useDispatch } from "react-redux";
const CartButton = (props) => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  let quantityItems = 0;
  for (let i = 0; i < items.length; i++) {
    quantityItems += items[i].quantity;
  }
  return (
    <button
      className={classes.button}
      onClick={() => dispatch(cartAction.showCart())}
    >
      <span>My Cart</span>
      <span className={classes.badge}>{quantityItems}</span>
    </button>
  );
};

export default CartButton;
