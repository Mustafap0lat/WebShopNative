import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native'
import axios from "axios";

const ProductScreen = ({ route }) => {
  console.log(route.params.item);

  const nav = useNavigation();

  const { productID, productName, productTitle, description, price, photo } =
    route.params.item;



function deleteProduct(productID) {
 axios 
      .delete(`http://10.0.2.2:8080/api/product/${productID}`)
      .then(nav.navigate('HomeScreen'));
  }


  return (
    <View style={styles.container}>

        <View>
         <TextInput 
         placeholderTextColor="white"
         style={styles.input}
         placeholder={productName}
         />
         <TextInput 
         placeholderTextColor="white"
         style={styles.input}
         placeholder={productTitle}
         />
         <TextInput 
         placeholderTextColor="white"
         style={styles.input}
         placeholder={description}
         />
         <TextInput 
         placeholderTextColor="white"
         style={styles.input}
         placeholder={JSON.stringify(price)}
         />
         <TextInput 
         placeholderTextColor="white"
         style={styles.input}
         placeholder={photo}
         />

      <Pressable onPress={() => deleteProduct(productID)}>
        <Text>Delete</Text>
        </Pressable>
         </View>
   
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
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
