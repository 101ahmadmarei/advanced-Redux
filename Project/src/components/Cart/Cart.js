import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../../store/index";
const Cart = (props) => {
  const item = useSelector((state) => state.items);
  // console.log(item);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {item.map((data, i) =>
          data.quantity !== 0 ? (
            <CartItem
              key={i}
              item={{
                title: data.title,
                quantity: data.quantity,
                total: data.quantity * data.price,
                price: data.price,
                itemId: data.id,
              }}
            />
          ) : (
            ""
          )
        )}
      </ul>
    </Card>
  );
};

export default Cart;
