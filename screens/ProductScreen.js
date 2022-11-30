import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from "react-native";
import { CartContext } from "../CartContext";
import axios from "axios";
import EditScreen from "./EditScreen";

const ProductScreen = ({ route }) => {
  const [product, setProduct] = useState(route.params.item);
  
  const nav = useNavigation();

  const { addItemToCart } = useContext(CartContext);

  
  return (
    <View>
      <View>     
      <Text>Name: {product.productName}</Text>
      <Text>Title: {product.productTitle}</Text>
      <Text>Description: {product.description}</Text>
      <Text>Price: {product.price}</Text>
      <Image source={{uri: product.photo}} style={styles.image}/> 
      </View>
      <Pressable onPress={() => nav.navigate('editscreen',{product} )}>
        <Text>Edit</Text>
        </Pressable>
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
  image: {
    width:150,
    height:150,
    borderRadius:20
  },

});