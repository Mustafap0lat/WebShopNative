import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Pressable } from "react-native"
import Entypo from "react-native-vector-icons/Entypo"


function Header() {

  const nav = useNavigation();


  return (
    <View style={styles.container}>
      <Entypo name="login" size={30} color="#efefef" />
      <Text style={styles.heading}>Black Everyday</Text>
      <Pressable onPress={() => {nav.navigate("shoppingcartscreen")}}>
      <Entypo name="shopping-cart" size={30} color="#efefef" />
      </Pressable>
    </View>
  );
}

export default Header

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical:20,
    paddingHorizontal:10
  },
  heading: {
    color: "#efefef",
    fontSize:20,
    fontWeight: "700"
  }


})