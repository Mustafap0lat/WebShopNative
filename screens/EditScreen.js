import { View, Text, Pressable, TextInput, StyleSheet, Button, Share } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import axios from "axios";

const EditScreen = ({ route }) => {

  const nav = useNavigation();

  const apiEndPoint = "http://10.0.2.2:8080/api/product"

  const [product, setProduct] = useState(route.params.product);

   const [productName, setProductName] = useState(route.params.product.productName);
   const [productTitle, setProductTitle] = useState(route.params.product.productTitle);
   const [description, setDescription] = useState(route.params.product.description);
   const [price, setPrice] = useState(route.params.product.price);
   const [photo, setPhoto] = useState(route.params.product.photo);
   const [data, setData] = useState({productName:"", productTitle:"", description:"", price:"", photo:""});
   

  const handleChange = (name, text) => {
    console.log(name, text)
      setProduct(prev => ({ ...prev, [name]: text}));
    };


    const editProduct = async (product) => {
      console.log("input:", data);
      await fetch(`http://10.0.2.2:8080/api/product/${product.productID}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      })
    };


  function deleteProduct(product) {
   axios 
      .delete(`http://10.0.2.2:8080/api/product/${product.productID}`)
      .then(nav.navigate('HomeScreen'));

  }
  
  
  return (
    <View style={styles.container}>
        <View>
        <TextInput
        placeholder={productName}
        onChangeText={(text) => handleChange("productName", text)}
        />
        <TextInput
        placeholder={productTitle}
        onChangeText={(text) => handleChange("productTitle", text)}
        />
        <TextInput
        placeholder={description}
        onChangeText={(text) => handleChange("description", text)}
        />
        <TextInput
        placeholder={JSON.stringify(price)}
        onChangeText={(text) => handleChange("price", text)}
        />
        <TextInput
        placeholder={photo}
        onChangeText={(text) => handleChange("description", text)}
        />
      
        <Pressable onPress={() => editProduct(product)}>
        
   <Text>Edit</Text>
   </Pressable>


      <Pressable onPress={() => deleteProduct(product)}>
        <Text>Delete</Text>
        </Pressable>
     </View>
   
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    padding: 8,
    margin: 10,
    width: 200,
  },
});
