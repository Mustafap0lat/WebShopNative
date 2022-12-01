import React,{ useState, useEffect }  from 'react'
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView, ScrollView } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font';


  function ItemMenu() {
    const [product, setProduct] = useState([]);


    let nav = useNavigation();


    function GetItems(){
        axios
        .get('http://10.0.2.2:8080/api/product').then((res) => {
        setProduct(res.data.reverse());
        console.log(res.data);
      })
      }

      useEffect(() => {
        const interval = setInterval(() => {
          GetItems();
        }, 1000);
        return () => clearInterval(interval);
      }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <SafeAreaView>
          {product.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => nav.navigate("productscreen", { item })}
            >
              <View style={styles.row}>
                <Image source={{ uri: item.photo }} style={styles.image} />
                <View key={index} style={styles.headerInfo}>
                  <Text style={styles.header}>{item.productName}</Text>
                  <Text style={styles.text}>{item.productTitle}</Text>
                </View>
                <View style={styles.priceInfo}>
                  <Text style={styles.price}>{item.price}:-</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}

export default ItemMenu

const styles = StyleSheet.create({
 
  container:{
    marginTop: 25,
    marginBottom: 50,
    paddingBottom: 10,
    borderBottomColor: "#1F1F1F",
    borderBottomWidth: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  
  row:{
      flexDirection:"row",
      marginTop:20,
      alignItems:"center"
  },

  text: {
    color:"white",
    paddingLeft:15,
    fontSize:10,
    marginBottom:30
  },
  header: {
    color:"white",
    paddingLeft:15,
    fontSize:20,
    
  },
  headerInfo: {
    color:"white",
    paddingLeft:15,
    fontSize:20,
    marginBottom:80
  },
  image: {
    width:150,
    height:150,
    borderRadius:20
  },
  
    buttonContainer:{
      paddingLeft: 6,
      alignItems: "center",
      justifyContent:"center",
      fontWeight: "30",

      
    },
    button: {
      width: 100,
      height: 30,
      borderRadius: 10,
      paddingTop:4,
      marginTop: 10,
      textAlign:"center",
      justifyContent: "center",
      alignItems:"center",
      backgroundColor:"orange"
    },
    menuText:{
      color:"#858585",
      fontSize: 12,
      paddingTop: 12,
      fontWeight: "600"
    },
    price:{
      color:"yellow",
      paddingLeft:15,
      fontSize:20,
  
    },
    priceInfo:{
    position: "absolute",
    left: 265,
    top: 120
  
      
  
    }
  })

