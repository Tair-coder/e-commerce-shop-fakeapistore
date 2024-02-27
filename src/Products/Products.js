import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";
function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://fakestoreapi.com/products")
        .then((data) => data.json())
        .then((json) => setData(json))
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <ul className={styles.products__list}>
      {data.map((item) => (
        <ProductItem item={item} key={item.id} />
      ))}
    </ul>
  );
}

export default Products;
