import React, {Component} from 'react';
import {Button, Text, View,StyleSheet, FlatList} from 'react-native';

const TodoModal = ({list}) => {
  return (
    <View style={styles.container}>
     <Text>Modal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent :"center",
        alignItems : "center"
    }
})

export default TodoModal;
