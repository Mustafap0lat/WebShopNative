import React,{ useState, useEffect }  from 'react'
import { View, Text, StyleSheet, Image, Pressable } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

  function ItemMenu() {

    const [product, setProduct] = useState([]);


    let nav = useNavigation();


    function GetItems(){
        axios
        .get('http://10.0.2.2:8080/api/product').then((res) => {
        setProduct(res.data);
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
    <View style={styles.container}>
      {product.map((item, index) => (
        <View key={index} style={styles.row}>
          <Image source={{uri: item.photo}} style={styles.image} />
            <View>
   
          <View key={index} style={styles.column}>
          <Text style={styles.text}>
            {item.productName}
            </Text>
          <Text style={styles.text}>
            {item.productTitle}
            </Text>
          <Text style={styles.text}>
            {item.description}
            </Text>
          <Text style={styles.text}>
            {item.price}
            </Text>
            </View>  
    
           <Pressable style={styles.buttonContainer}
           onPress={() => nav.navigate('productscreen', {item})}>

        <Text style={styles.button}>Whatever</Text>
        </Pressable>
        </View>
        </View>
      ))}


    </View>
  );
}

export default ItemMenu

const styles = StyleSheet.create({
  row:{
      flexDirection:"row",
      marginTop:20,
      alignItems:"center"
  },
  starredIcon:{
      backgroundColor:"#333333",
      width:55,
      height:55,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:20
  },
  text: {
    color:"white",
    paddingLeft:15,
    fontSize:20
  },
  image: {
    width:150,
    height:150,
    borderRadius:20
  },
  
    container:{
      marginTop: 25,
      paddingBottom: 10,
      borderBottomColor: "#1F1F1F",
      borderBottomWidth: 1,
      flexDirection: "column",
      justifyContent: "space-between"
      
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
    }
  })

