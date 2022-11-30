import React, { useContext, useState, useEffect } from "react";
import { View, Text, Pressable, Button, Alert, ToastAndroid } from "react-native";
import { CartContext } from "../CartContext";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

const ShoppingCartScreen = () => {
  const { items, getTotalPrice } = useContext(CartContext);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  let [total, setTotal] = useState("");

  useEffect(() => {
    setTotal(getTotalPrice());
  }, []);

  

  const BASE_URL = "http://10.0.2.2:8080/api/stripe"

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${BASE_URL}/create-payment-intent`, {
            method: 'POST',
            body: JSON.stringify({price: `${total}`}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { clientSecret: paymentIntent } = await response.json(); //plockar ut clientscret och renamr
        console.log("A", paymentIntent)

        return {
            paymentIntent,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent
        } = await fetchPaymentSheetParams();

        const { error } = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            paymentIntentClientSecret: paymentIntent,
            // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
            //methods that complete payment after a delay, like SEPA Debit and Sofort.
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            }
        });
    };

    const openPaymentSheet = async () => {
        await initializePaymentSheet();

        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
    };

  return (
    <StripeProvider
    publishableKey="pk_test_51M9ox9JCbTZh5qBt8HNeqJa9zgzHCXZgBxrRr9yzJWsEUfNwFIK1uDjAIBjXGB1uuplS3nYSbxBCRvScw3Vgtk7v00msl2FTiI"
    >
    <View>
      {items.map((product, key) => (
        <View key={key} >
          <Text>ProductName: {product.product.productName}</Text>
          <Text>ProductPrice: {product.product.price}</Text>
          <Text>Quiantiy: {product.qty}</Text>
        </View>
      ))}
      <Pressable>
      <Text>TotaltPrice: {total}</Text>
      <Button
        variant="primary"
        title="Checkout"
        onPress={openPaymentSheet}
      />
      </Pressable>
    </View>
  </StripeProvider>
    
  );
};

export default ShoppingCartScreen;
