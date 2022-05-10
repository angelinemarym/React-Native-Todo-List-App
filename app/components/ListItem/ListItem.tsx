import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ITodo from '../../interfaces';
import styles from './styles';

interface IListItemProps {
  todo: ITodo;
  markTodoComplete: any;
  deleteTodo: any;
}
const COLORS = {primary: '#1f145c', white: '#fff'};

export default class ListItem extends Component<IListItemProps> {
  constructor(props: IListItemProps) {
    super(props);
  }

  render() {
    const {todo, markTodoComplete, deleteTodo} = this.props;
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: todo?.completed ? 'line-through' : 'none',
            }}>
            {todo?.task}
          </Text>
        </View>
        {!todo?.completed && (
          <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
            <View style={[styles.actionIcon, {backgroundColor: 'green'}]}>
              <Icon name="done" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <View style={styles.actionIcon}>
            <Icon name="delete" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
