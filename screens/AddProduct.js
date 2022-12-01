import React, { useState } from "react";
import { TextInput, View, Pressable, Text, StyleSheet } from 'react-native';


const AddProduct = () => {
    const [input, setInput] = useState({productName:"", productTitle:"", description:"", price:"", photo:""})

    const handleChange = (name, text) => {
      console.log(name, text)
        setInput(prev => ({ ...prev, [name]: text}));
      };


    const addProduct = async () => {
        console.log("input:", input);
        await fetch("http://10.0.2.2:8080/api/product/post", {
          method: "POST",
          body: JSON.stringify(input),
          headers: {
            "Content-Type": "application/json",
          },
        })
        setInput("")
      };

  return (
    <View style={styles.container}>
      <View style={styles.box}>

         <Text style={styles.holder}></Text>
        <TextInput style={styles.holdingText}
        placeholder='Product:'
        placeholderTextColor={"black"}
        onChangeText={(text) => handleChange("productName", text)}
        />
      
        
        <TextInput style={styles.holdingText}
        placeholder='Model:'
        placeholderTextColor={"black"}
        onChangeText={(text) => handleChange("productTitle", text)}
        />
        <TextInput style={styles.holdingText}
        placeholder='Description:'
        placeholderTextColor={"black"}
        onChangeText={(text) => handleChange("description", text)}
        />
        <TextInput style={styles.holdingText}
        placeholder='Price:'
        placeholderTextColor={"black"}
        keyboardType="numeric"
        onChangeText={(text) => handleChange("price", text)}
        /> 
        <TextInput style={styles.holdingText}
        placeholder='URL:' 
        placeholderTextColor={"teal"}
        onChangeText={(text) => handleChange("photo", text)}/>
        </View>

  
        <Pressable  style={styles.submitBox}
    
        onPress={addProduct}>
            <Text style={{color:"white"}}>Submit</Text>
        </Pressable>
      
    </View>
    
  )
}

export default AddProduct;

const styles = StyleSheet.create({

  container:{
    flex:1,
      backgroundColor: "#1c1c1c",
      padding: 20,
      alignItems:"center",
  },
  box:{
    justifyContent:"center",
    alignContent:"center",
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 10,
    padding: 8,
    margin: 10,
    width:300,
    height:200,
    backgroundColor:"orange"
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
  holdingText:{
    fontWeight:"normal",
  fontSize:20,
  marginTop:5,
},
  holder:{
    fontWeight:"bold",
  fontSize:15,
},
  placement:{
    justifyContent:"flex-start",
    flexDirection:"row",
    alignItems:"center"
},
})

