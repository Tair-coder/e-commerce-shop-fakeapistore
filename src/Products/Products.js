import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import styles from "./Products.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchSlideAction } from "../store/fetch-slice";

const fetchData = async (setLoader, user, filterData) => {
  setLoader(false);
  try {
    const productsFetch = await fetch("https://fakestoreapi.com/products");
    const productsData = await productsFetch.json();
    const cartFetch = await fetch(
      `https://e-commerce-shop-d6bd3-default-rtdb.firebaseio.com/users/${user}/cart.json`
    );
    await cartFetch.json().then((data) => filterData(productsData, data));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
function Products() {
  const newData = useSelector((state) => state.fetch.data);
  // const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.fetch.uid);
  const dispatchFunction = useDispatch();
  useEffect(() => {
    const filterData = (productsData, cartData) => {
      if (cartData == null) {
        // setData(productsData);
        dispatchFunction(fetchSlideAction.setData({ data: productsData }));
        return setLoader(true);
      }
      let arr = [];
      for (const key of Object.values(cartData)) {
        arr.push(key.id);
      }
      console.log(arr.length);
      dispatchFunction(fetchSlideAction.addAmount({ number: arr.length }));
      let updatedData = productsData;
      // let arr = Object.keys(cartData);
      for (let i = 0; i < updatedData.length; i++) {
        if (arr.includes(updatedData[i].id)) {
          updatedData[i].disabled = true;
        }
      }
      // setData(updatedData);
      dispatchFunction(fetchSlideAction.setData({ data: updatedData }));

      setLoader(true);
    };
    fetchData(setLoader, user, filterData);
  }, []);
  return (
    <ul className={styles.products__list}>
      {!loader ? (
        <p>Loading...</p>
      ) : (
        newData.map((item) => <ProductItem item={item} key={item.id} />)
      )}
    </ul>
  );
}

export default Products;
