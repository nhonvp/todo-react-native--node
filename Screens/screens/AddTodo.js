import React, {Component, useState, useEffect,useRef} from 'react';
import {
  Button,
  Text,
  View,
  FlatList,
  CheckBox,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../components/Color';
import {useSelector, useDispatch} from 'react-redux';
import {setJob,editcompleted, getData,detailchecklist,deletetask} from '../redux/actions.js';

const AddTodo = ({navigation, route}) => {
  const [todo, settodo] = useState('');
  const todosdetails = useSelector(state => state.TodoDetails);
  const dispatch = useDispatch();
  const {itemId} = route.params;
  const {name,color,todos} = route.params.item;

  const todolengh = todos.length;
  const completed = todos.filter(todo => todo.completed).length;

  const tododetailsSave = useSelector(state => state.TodoDetailsSave);
  const editcompletedSave = useSelector(state => state.EditCompleted);
  const deleteTaskReducer = useSelector(state => state.DeleteTask);

  useEffect(() => {
    dispatch(detailchecklist(itemId));
  }, [tododetailsSave,editcompletedSave,deleteTaskReducer])

  const updateTask = (item) =>{
    var completed = JSON.stringify({
      completed : true
    });
    dispatch(editcompleted(completed,itemId,item._id));
    Alert.alert('Update completed success');
  }
  const handledeletetask = (item) =>{
    dispatch(deletetask(itemId,item._id));
    Alert.alert('Delete success');
  }

  const rendertodo = ({item}) => (
    <View style={styles.todocontainer}>
      <TouchableOpacity onPress={()=>{updateTask(item)}}>
        <Icon
          name={item.completed ? 'check-square-o' : 'square-o'}
          size={20}
          color={Color.darkgray}
          style={{paddingTop: 4}}></Icon>
      </TouchableOpacity>
      <Text style={styles.todo}>{item.title}</Text>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
        <TouchableOpacity>
          <Icon name="pencil" size={25} color={Color.mediumturquoise} style={{marginRight: 7}}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>{handledeletetask(item)}}>
          <Icon name="trash" size={25} color={Color.mediumturquoise}></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
  const Add = async () => {
    if (todo.length == 0) {
      Alert.alert('Warning', 'Vui long dien day du todo');
    } else {
      var todotask = JSON.stringify({
        title: todo,
        completed: false,
      });
      // todos.push({
      //   title: todo,
      //   completed: false,
      // });
      dispatch(setJob(todotask, itemId));
      settodo('');
      Alert.alert('Success', 'Create task success');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>
          {completed} / {todolengh}
        </Text>
      </View>
      <FlatList data={todosdetails.todos.todos} renderItem={rendertodo} />
      <KeyboardAvoidingView style={styles.footer}>
        <TextInput
          placeholder="Add todo"
          style={[styles.AddTodo, {borderColor: color}]}
          onChangeText={value => settodo(value)}
          value={todo}
          ></TextInput>
        <TouchableOpacity
          style={[styles.plus, {backgroundColor: color}]}
          onPress={Add}>
          <Icon name="plus" size={20} color={Color.white}></Icon>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 16,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomWidth: 3,
    marginLeft: 64,
    borderBottomColor: Color.lightblue,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Color.blue,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 15,
    paddingBottom: 10,
  },
  AddTodo: {
    flex: 1,
    height: 50,
    borderRadius: 6,
    marginRight: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    marginLeft: 10,
  },
  plus: {
    borderRadius: 5,
    padding: 16,
    marginRight: 4,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  todocontainer: {
    flexDirection: 'row',
    padding: 16,
  },
  todo: {
    paddingLeft: 15,
    fontSize: 18,
    fontWeight: '300',
  },
});
export default AddTodo;
