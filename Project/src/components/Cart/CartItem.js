import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/index";

const CartItem = (props) => {
  const { title, quantity, total, price, itemId } = props.item;
  const dispatch = useDispatch();
  const addToCart = (e) => {
    dispatch(cartAction.increaseQuantity(e.currentTarget.id));
  };
  const removeFromCart = (e) => {
    dispatch(cartAction.decreaseQuantity(e.currentTarget.id));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button id={itemId} onClick={removeFromCart}>
            -
          </button>
          <button id={itemId} onClick={addToCart}>
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
