import React, { useState } from 'react';
import { Text, TextInput, View, FlatList, StyleSheet,Button } from 'react-native';
// import { Provider as PaperProvider, Appbar, Button } from 'react-native-paper';
const init = [
  {id:"1",title:"todo1"},
  {id:"2",title:"todo2"}
]

const App = () => {
  const [todos, setTodos] = useState(init);
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [curEditId, setCurEditId] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const addTodo = () => {
    if (text.trim() !== '') {
      setTodos([...todos, { id: Date.now(), title: text }]);
      setText('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (item) => {
    setIsEditing(true);
    setCurEditId(item.id);
    setEditText(item.title);
  };

  const saveEdit = () =>{
     setTodos((pre)=>pre.map((v)=>{
      if(v.id === curEditId){
         return {id:curEditId,title:editText}
      }
      return v;
    }))
    setIsEditing(false);
  }

  return (
    // <Provider>
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={isEditing ? setEditText:setText}
        value={isEditing ? editText:text }
        placeholder="Enter todo name"
      />
      <Button title={isEditing?"Save":"Add Todo"} onPress={isEditing?saveEdit:addTodo} />
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todo}>
            <Text>{isEditing && curEditId === item.id?editText:item.title}</Text>
            {
              isEditing && curEditId === item.id?(<View style={styles.button__group}>
                <Button title="Cancel" onPress={() => {setIsEditing(false)}} />
              </View>):(<View style={styles.button__group}>
              <Button title="Edit" onPress={() => editTodo(item)} />
              <Button style={styles.delete__button} title="Delete" onPress={() => deleteTodo(item.id)} />
            </View>)
            } 
          </View>
        )}  
      />
    </View>
    // </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 230,
    paddingRight: 230,
    paddingTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button__group:{
    flexDirection: 'row',
    gap:10
  },
  delete__button:{
    backgroundColor: 'red'
  }
});


export default App;
