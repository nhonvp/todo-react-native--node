import React from 'react'
import { View,Text,StyleSheet, Button,Pressable} from 'react-native';

const BScreen = ({ navigation, route }) => {
   
    const {ItemName,ItemID} = route.params;
    const onpressB = () =>{
      // navigation.goBack();
    navigation.setParams({ItemID : 100,ItemName:"cc"})  
  }
  const pressable = ()=>{ 
    navigation.goBack();
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings!</Text>
      <Button title='Go to Screen A' onPress={onpressB}></Button>
      <Text>{ItemName}</Text>
      <Text>{ItemID}</Text>
      <Pressable
      onPress = {() => {navigation.goBack()}}
      >
      <Text style ={styles.text}>Go Back A</Text>
      </Pressable>
    </View>
    )
    
  };
  
const styles = StyleSheet.create({
  body : {
    flex : 1,
    backgroundColor : "#7fffd4",
    alignItems :"center",
    justifyContent : "center"
  },
  text : {
    fontSize : 40,
    
  }
})
export default BScreen;

