import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../../store/index";
const ProductItem = (props) => {
  const { title, price, description, itemId } = props;
  const dispatch = useDispatch();
  const addToCart = (e) => {
    dispatch(cartAction.increaseQuantity(e.currentTarget.id));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button id={itemId} onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
