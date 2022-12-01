import React, { useState, useEffect } from "react";
import { View, Text, Pressable , SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import MenuButtons from "../components/MenuButtons";
import ItemMenu from "../components/ItemMenu";

let urlh = "https://cdn.pocket-lint.com/r/s/970x/assets/images/157961-phones-review-hands-on-samsung-galaxy-z-fold-3-review-image1-coz70vermc-jpg.webp"



const  HomeScreen = ({navigation}) => {
  const [product, setProduct] = useState([]);
  const nav = useNavigation();


  function loadProduct(){
    axios
    .get('http://10.0.2.2:8080/api/product').then((res) => {
    setProduct(res.data);
    
  })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      loadProduct();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (


    <View style={styles.container}>
    <SafeAreaView style={{height:'100%', marginTop: 30}}>
    <Header />
    <SearchBar />
    <MenuButtons navigation={navigation}/>
    <ItemMenu />
    </SafeAreaView>
   </View>

  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
      backgroundColor: "#1c1c1c",
      padding: 20
     

  }
})