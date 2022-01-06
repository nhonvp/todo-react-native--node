import React,{useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation, route}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const setData = async () => {
    if(name.length == 0) {
      Alert.alert('Warning','vui long dien day du thong tin ') 
    } else {
     try {
       var user = {
         Name : name,
         Age : age
       };
      await AsyncStorage.setItem("userData",JSON.stringify(user));
      navigation.navigate("HomeStack");
     } catch (error) {
       console.log(error);
     }
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/font/login.jpg')}
        style={styles.image}>
        <View style={styles.body}>
        <TextInput style={styles.input} placeholder='Name'
        onChangeText={value => setName(value)}
        />
        <TextInput style={styles.input} placeholder='Age' onChangeText={value =>setAge(value)}/>
          <View style={styles.form}>
            <TouchableOpacity
              onPress={setData}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{navigation.navigate("HomeStack")}}
              style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    margin: 30,
    flex: 1,
    backgroundColor: '#a9a9a9',
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '',
  },
  button: {
    height: 50,
    // backgroundColor: '#00ffff',
    alignItems: 'center',
  },
  Text: {
    fontSize: 20,
  },
  image: {
    flex: 1,
    // justifyContent: "center"
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  input : {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  }
});

export default Login;
