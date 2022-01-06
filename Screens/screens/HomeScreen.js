import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = [
  {
    country: 'USA',
    city: 'New York',
  },
  {
    country: 'VN',
    city: 'HN',
  },
  {
    country: 'Australia',
    city: 'Sydney',
  },
  {
    country: 'ThaiLand',
    city: 'Phukhet',
  },
  {
    country: 'ThaiLand',
    city: 'Phukhet',
  },
];

const HomeScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const getData = async () => {
    try {
      await AsyncStorage.getItem('userData').then(value => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
          setAge(user.Age);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateData = async () => {
    if (name.length == 0) {
      Alert.alert('Warning', 'vui long dien day du thong tin ');
    } else {
      try {
        var user = {
          Name: name,
        };
        await AsyncStorage.mergeItem('userData', JSON.stringify(user));
        Alert.alert('Sucess', 'update success');
      } catch (error) {
        console.log(error);
      }
    }
  };
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const onpress = () => {
    navigation.navigate('Profile', {ItemName: 'Anh nhon toi day', ItemID: 12});
  };
  const navigateMap = item => {
    navigation.navigate('Map', {country: item.country, city: item.city});
  };
  const renderItemHome = ({item}) => (
    <TouchableOpacity onpress={navigateMap}>
      <View style={styles.box}>
        <Text style={[styles.title, GlobalStyle.FontGlobal]}>
          {item.country}
        </Text>
        <Text style={styles.subtitle}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      <ScrollView>
        <Button title="Go to Jane's profile" onPress={onpress} />
        <Button title="Open Map" onPress={navigateMap} />
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
        <FlatList
          data={data}
          renderItem={renderItemHome}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity onpress={navigateMap}>
          <Text style={styles.title}>
            Welcome {name} -- {age}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={value => setName(value)}
          />
          <Button title="Update" onPress={updateData}></Button>
          <Button title="Delete" onPress={removeData}></Button>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  box: {
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderWidth: 2,
    height: 100,
    backgroundColor: '#f5f5dc',
  },
  title: {
    fontSize: 30,
    margin: 10,
    color: '#dc143c',
    // fontFamily : 'SourceSans3-Italic-VariableFont_wght'
  },
  subtitle: {
    fontSize: 20,
    // fontFamily : 'SourceSans3-VariableFont_wght'
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
export default HomeScreen;
