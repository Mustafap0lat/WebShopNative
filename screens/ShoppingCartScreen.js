import React, { useContext, useState, useEffect } from "react";
import { View, Text, Pressable, Button, Alert, StyleSheet, Image, SafeAreaView } from "react-native";
import { CartContext } from "../CartContext";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import axios from "axios";

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
      <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      {items.map((product, key) => (
        <View key={key} style={styles.row}>

     
          <Image source={{ uri: product.product.photo }} style={styles.image} />
          <View style={styles.cardText}>
          <Text style={styles.text}>Product: {product.product.productName}</Text>
          <Text style={styles.text}>Price: {product.product.price}</Text>
          <Text style={styles.text}>Quantity: {product.qty}</Text>
          <Text style={styles.text}>Total Price: {total}</Text>
          </View>
          

        </View>
      ))}
      <View style={{justifyContent:"center", alignItems:"center"}}>
      <Pressable style={styles.submitBox} onPress={openPaymentSheet}>
        <Text style={{color:"white"}}>
           Continue to Checkout
        </Text>
        </Pressable>
        </View>
    </View>
    </SafeAreaView>
  </StripeProvider>
    
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
      backgroundColor: "#1c1c1c",
      padding: 20,
     
  },
  buttonBox:{
    marginTop:50,
  },
  submitBox:{
    justifyContent:"center",
    alignItems:"center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    margin: 10,
    width:300,
    backgroundColor:"green"
  },
  image: {
    width:100,
    height:100,
    borderRadius:20
  },
  cardText:{
    paddingLeft: 20,
    marginBottom:17

  },
  row:{
    flexDirection:"row",
    marginTop:20,
    alignItems:"center",
},
  text:{
    color:"white",
    marginTop:5,
 
},
})