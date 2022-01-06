import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Color from '../components/Color';
import Data from '../components/Data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import {setTodo,getData} from '../redux/actions.js';
import {useSelector, useDispatch} from 'react-redux';

const Task = ({navigation}) => {
  const background = [
    '#00ffff',
    '#a9a9a9',
    '#00ced1',
    '#adff2f',
    '#f0e68c',
    '#90ee90',
    '#ffe4b5',
  ];
  const {task} = useSelector(state => state.Todo);
  const dispatch = useDispatch();
  const [color, setcolor] = useState(background[0]);
  const [checklist, setchecklist] = useState(task)
  const [title, settitle] = useState('');
  const renderItemColor = () =>
    background.map(color => (
      <TouchableOpacity
        style={[styles.colorItem, {backgroundColor: color}]}
        onPress={() => {
          setcolor(color);
        }}
      />
    ));
  const createTodo = async () => {
    if (title.length == 0) {
      Alert.alert('Warning!', 'Vui long dien task');
    } else {
      try {
        var Task = JSON.stringify({
          "name": title,
          "color": color,
        });
        let newtask = [{...task,Task}];
        AsyncStorage.setItem('task', JSON.stringify(Task))
          .then(() => {
            dispatch(setTodo(Task));
            dispatch(getData());
            Alert.alert('Success', 'Create Task checklist Success');
          })
          .catch(err => console.log(err));
          navigation.navigate('TodoList',{newtask : newtask});
      } catch (error) {
        console.log(error);
      } 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> My Task </Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={value => settitle(value)}></TextInput>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        {renderItemColor()}
      </View>
      <TouchableOpacity
        style={[styles.createtask, {backgroundColor: color}]}
        onPress={createTodo}>
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    paddingTop: 10,
  },
  createtask: {
    borderWidth: 1,
    borderColor: Color.blue,
    borderRadius: 4,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.blue,
    fontSize: 24,
    marginTop: 10,
  },
  colorItem: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
export default Task;
