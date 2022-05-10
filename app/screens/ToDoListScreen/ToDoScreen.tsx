import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from '../../components/ListItem/ListItem';
import ITodo from '../../interfaces';
import styles from './styles';

interface IToDoScreen {
  textInput: string;
  todos: ITodo[];
}

export default class ToDoScreen extends Component<{}, IToDoScreen> {
  constructor(props: IToDoScreen) {
    super(props);

    this.state = {
      textInput: '',
      todos: [],
    };
  }

  componentDidMount() {
    this.getTodosFromUserDevice();
  }

  componentDidUpdate() {
    this.saveTodoToUserDevice(this.state.todos);
  }

  componentWillUnmount() {}

  saveTodoToUserDevice = async (todos: ITodo[]) => {
    try {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem('todos', stringifyTodos);
    } catch (error) {
      console.log(error);
    }
  };

  getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        this.setState({todos: JSON.parse(todos)});
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {textInput, todos} = this.state;

    const addTodo = () => {
      if (textInput == '') {
        Alert.alert('Error', 'Please Input Todo');
      } else {
        const newTodo = {
          id: Math.random(),
          task: textInput,
          completed: false,
        };

        this.setState({todos: [...todos, newTodo], textInput: ''});
      }
    };

    const markTodoComplete = (todoId: number) => {
      const newTodosItem = todos.map(item => {
        if (item.id == todoId) {
          return {...item, completed: true};
        }
        return item;
      });

      this.setState({todos: newTodosItem});
    };

    const deleteTodo = (todoId: number) => {
      const newTodosItem = todos.filter(item => item.id != todoId);
      this.setState({todos: newTodosItem});
    };

    const clearAllTodos = () => {
      Alert.alert('Confirm', 'Clear Todos?', [
        {
          text: 'Yes',
          onPress: () => this.setState({todos: []}),
        },
        {
          text: 'No',
        },
      ]);
    };

    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.appName}>TODO APP</Text>
          <Icon name="delete" size={25} color="red" onPress={clearAllTodos} />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 20, paddingBottom: 100}}
          data={todos}
          renderItem={({item}) => (
            <ListItem
              todo={item}
              markTodoComplete={markTodoComplete}
              deleteTodo={deleteTodo}
            />
          )}
        />

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={textInput}
              placeholder="Add Todo"
              onChangeText={text => this.setState({textInput: text})}
            />
          </View>

          <TouchableOpacity onPress={addTodo}>
            <View style={styles.iconContainer}>
              <Icon name="add" color="white" size={30} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
