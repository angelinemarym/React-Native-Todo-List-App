/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import ToDoScreen from './app/screens/ToDoListScreen/ToDoScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ToDoScreen />
    </SafeAreaView>
  );
};

export default App;
