import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StyleSheet, TextInput } from "react-native"
import AddProduct from './screens/AddProduct';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from "./screens/ProductScreen";
import { CartProvider } from './CartContext';
import EditScreen from './screens/EditScreen';




function Navigation() {
  const Stack = createStackNavigator();


  
  
    return (
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={HomeScreen}>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Add"
              component={AddProduct}
              options={{
                headerStyle: {
                  backgroundColor: "#1c1c1c",
                },
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="productscreen"
              component={ProductScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#1c1c1c",
                },
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="editscreen"
              component={EditScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#1c1c1c",
                },
                headerTintColor: "white",
                headerTitleAlign: "center",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    );
}

export default Navigation

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical:20,
    paddingHorizontal:10
  }})
