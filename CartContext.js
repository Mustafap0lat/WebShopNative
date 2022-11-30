import React, { createContext, useState} from "react";

export const CartContext = createContext();

export const CartProvider = (props) => {
  const [items, setItems] = useState([]);

  const addItemToCart = async (id) => {
    const data = await fetch("http://10.0.2.2:8080/api/product")
    const productList = await data.json()
    const product = productList.find((product) => (product.productID == id));
    console.log("Denna produkt", product)
        setItems((prevItems) => {
          const item = prevItems.find((item) => item.id == id);
          if (!item) {
            return [
              ...prevItems,
              {
                id,
                qty: 1,
                product,
                totalPrice: product.price,
              },
            ];
          } else {
            return prevItems.map((item) => {
              if (item.id == id) {
                item.qty++;
                item.totalPrice += product.price;
              }
              return item;
            });
          }
        } );
  };

  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        getItemsCount,
        addItemToCart,
        getTotalPrice
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};