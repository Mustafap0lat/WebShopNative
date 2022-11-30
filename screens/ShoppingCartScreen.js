import React, { useContext, useState, useEffect  } from 'react';
import { View, Text} from 'react-native';
import { CartContext } from '../CartContext';

const ShoppingCartScreen = () => {

  const {items, getItemsCount, getTotalPrice} = useContext(CartContext);

    let [total, setTotal] = useState(0);

    useEffect(() => {
      setTotal(getTotalPrice());
    });


  return (
    <View>
      {items.map((product) => (
        <View>
        <Text>ProductName: {product.product.productName}</Text>
        <Text>ProductPrice: {product.product.price}</Text>
        <Text>Quantity: {product.qty}</Text>
        </View>
      ))}
      <Text>{total}</Text>
    </View>
);
}


export default ShoppingCartScreen;