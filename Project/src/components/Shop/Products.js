import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useSelector, useDispatch } from "react-redux";

const Products = (props) => {
  const items = useSelector((state) => state.items);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {items.map((item, i) => (
          <ProductItem
            key={i}
            title={item.title}
            price={item.price}
            description={item.description}
            itemId={item.id}
            quantity={item.increaseQuantity}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
