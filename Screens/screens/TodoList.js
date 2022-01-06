import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  Modal,
  SectionList,
  Alert,
} from 'react-native';
import Color from '../components/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
import data from '../components/Data.js';
// import TodoModal from './TodoModal';
import {useSelector, useDispatch} from 'react-redux';
import {getData, deletechecklist,detailchecklist} from '../redux/actions.js';

const TodoList = ({navigation,route}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [isloading, setisloading] = useState(false);
  const {newtask} = route.params ? route.params : [];
  const {task} = useSelector(state => state.Todo);
  
  const dispatch = useDispatch();
  const handleDelete = id => {
    dispatch(deletechecklist(id));
    dispatch(getData());
    Alert.alert('success', 'Delete checklist success');
  };
  useEffect(() => {
    dispatch(getData());
  },[]);

  const renderItemList = ({item}) => {
    const remaining = item.todos.filter(todo => todo.completed == false).length;
    const finised = item.todos.length - remaining;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddTodo', {item: item, itemId: item._id});
          }}
          style={[styles.listcontainer, {backgroundColor: item.color}]}>
          <Text style={{textTransform: 'uppercase', fontSize: 20}}>
            {item.name}
          </Text>
          <View style={styles.process}>
            <Text style={styles.subtitle}>Process</Text>
            <Text style={styles.count}>{remaining}</Text>
            <Text style={styles.subtitle}>Finised</Text>
            <Text style={styles.count}>{finised}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              handleDelete(item._id);
            }}>
            <Icon name="trash" size={25} color={Color.mediumturquoise}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const toggleListModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        onRequestClose={toggleListModal}
        visible={modalVisible}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.closeicon}>
          <Icon name="times" size={30} color={Color.blue}></Icon>
        </TouchableOpacity>
      </Modal>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.divider} />
        <Text style={styles.tittle}>
          Todo
          <Text style={{fontWeight: '300', color: Color.blue}}> Lists</Text>
        </Text>
      </View>
      <View style={{marginVertical: 40}}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => {
            navigation.navigate('Task');
          }}>
          <Icon name="plus" size={20} color={Color.blue}></Icon>
        </TouchableOpacity>
        <Text style={styles.add}>Add Lists</Text>
      </View>
      <View style={{height: 250, paddingLeft: 32}}>
        <FlatList
          data={task}
          renderItem={renderItemList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item.ID}
          keyboardShouldPersistTaps = "always"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: Color.lightblue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  tittle: {
    fontSize: 30,
    fontWeight: '600',
    paddingHorizontal: 64,
    color: Color.black,
  },
  addList: {
    borderWidth: 1,
    borderColor: Color.blue,
    borderRadius: 4,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  add: {
    fontSize: 20,
    color: Color.blue,
    fontWeight: '600',
    marginTop: 8,
  },
  listcontainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    margin: 10,
    borderRadius: 6,
    width: 180,
    alignItems: 'center',
    backgroundColor: '#00ffff',
  },
  modalcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  process: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: Color.white,
    paddingTop: 4,
  },
  count: {
    fontSize: 20,
    color: Color.white,
  },
  closeicon: {
    alignItems: 'flex-end',
    padding: 10,
    color: Color.blue,
    borderWidth: 1,
  },
});
export default TodoList;
