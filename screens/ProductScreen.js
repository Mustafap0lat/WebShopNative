import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image, SafeAreaView } from "react-native";
import { CartContext } from "../CartContext";
import axios from "axios";
import EditScreen from "./EditScreen";

const ProductScreen = ({ route }) => {
  const [product, setProduct] = useState(route.params.item);

  
  const nav = useNavigation();

  const { addItemToCart } = useContext(CartContext);

  
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
      <View>     
      <Image source={{uri: product.photo}} style={styles.image}/> 
      
      <Text style={{marginTop: 10, color: "white", fontSize: 18, text:"bold", fontWeight:"bold"}}>Name: {product.productName}
      </Text>

      <Text style={styles.text}>Model: {product.productTitle}</Text>
      <Text style={{fontSize: 12, color:"white", marginTop: 10, fontStyle:"italic" }}>Description: {product.description}</Text>
      </View>      

      <View style={styles.button}>
      <Pressable style={styles.buttonBoxAdd} onPress={() => addItemToCart(product.productID)}>
        <Text style={{color:"white"}}>Add to Cart</Text>
        </Pressable>
        <Text style={{fontSize: 18, color:"yellow"}}>Price: {product.price}</Text>
        </View>

      <Pressable style={styles.buttonBoxEdit} onPress={() => nav.navigate('editscreen',{product} )}>
        <Text style={{color:"white"}}>Edit</Text>
        </Pressable>
        </SafeAreaView>

    </View>
  );
};

export default ProductScreen;
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#1c1c1c",
    padding: 20
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
    width:350,
    height:250,
    borderRadius:20
  },
  text: {
    marginTop: 10,
    color: "white",
    fontSize: 15 
  },
  button: {
    justifyContent:"space-between",
    alignItems:"center",
     flexDirection:"row",
      marginTop: 20,
  },
  
  buttonBoxAdd: {
    backgroundColor:"green",
    borderRadius: 10,
    padding: 8,
    width: 100,
    justifyContent: "center",
    alignItems:"center",
  },
  buttonBoxEdit: {
    backgroundColor:"orange",
    borderRadius: 10,
    padding: 8,
    width: 100,
    justifyContent: "center",
    alignItems:"center",
    marginTop: 10,

  },

});