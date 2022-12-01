import { View, Text, Pressable, TextInput, StyleSheet, SafeAreaView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
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

   

  const handleChange = (name, text) => {
    console.log(name, text)
      setProduct(prev => ({ ...prev, [name]: text}));
    };


    const editProduct = async (product) => {
      await fetch(`http://10.0.2.2:8080/api/product/${product.productID}`, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(nav.navigate("HomeScreen"))
    };


  function deleteProduct(product) {
   axios 
      .delete(`http://10.0.2.2:8080/api/product/${product.productID}`).then(nav.navigate("HomeScreen"))
 

  }
  
  
  return (
    <View style={styles.container}>
        <SafeAreaView>
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
        <TextInput style={styles.input}
        placeholder={productName}
        placeholderTextColor={"gray"}
        onChangeText={(text) => handleChange("productName", text)}
        />
        <TextInput style={styles.input}
        placeholder={productTitle}
        placeholderTextColor={"gray"}
        onChangeText={(text) => handleChange("productTitle", text)}
        />
        <TextInput style={styles.input}
        placeholder={description}
        placeholderTextColor={"gray"}
        onChangeText={(text) => handleChange("description", text)}
        />
        <TextInput style={styles.input}
        placeholder={JSON.stringify(price)}
        placeholderTextColor={"gray"}
        onChangeText={(text) => handleChange("price", text)}
        />
        <TextInput style={styles.input}
        placeholder={photo}
        placeholderTextColor={"teal"}
        onChangeText={(text) => handleChange("photo", text)}
        />

      <View style={styles.button}>
        <Pressable style={styles.buttonBoxSave} onPress={() => editProduct(product)}>
         <Text style={{color:"white"}}>Save</Text>
       </Pressable>


      <Pressable style={styles.buttonBoxDelete} onPress={() => deleteProduct(product)}>
        <Text style={{color:"white"}}>Delete</Text>
        </Pressable>
        </View>
        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
      
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    justifyContent:"center",
    alignItems:"center",
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 10,
    padding: 8,
    margin: 10,
    width:300,
    color:"white"   
  },
  buttonBoxDelete: {
    backgroundColor:"red",
    borderRadius: 15,
    padding: 8,
    width: 80,
    justifyContent: "center",
    alignItems:"center",

  },
  buttonBoxSave: {
    backgroundColor:"purple",
    borderRadius: 15,
    padding: 8,
    width: 80,
    justifyContent: "center",
    alignItems:"center",
  },
  button: {
    justifyContent:"space-between",
    alignItems:"center",
     flexDirection:"row",
      marginTop: 10,
      padding:10
  },
});
