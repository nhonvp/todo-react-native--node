import React, { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity,View } from "react-native";

const Map = ({navigation,route}) => {
  const [count, setCount] = useState(0);
  const onPress = () => {setCount(prevCount => prevCount + 1)};
  const {country,city} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.countContainer}>
        <Text>Count: {count}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text>Press Here</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
      onPress={() => (navigation.goBack())}
    >
      <Text>Go back </Text>
      <Text>{country}</Text>

    </TouchableOpacity>
    <Button title="Go Home " onPress={() => {navigation.navigate('Home')}}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  }
});

export default Map;