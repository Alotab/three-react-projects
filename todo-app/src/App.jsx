import { useState } from "react"
import Header from "./components/Header"
import Tabs from "./components/Tabs"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() {
  // const todos = [
  //   { input: 'Hello! Add your first todo!', complete: true },
  //   { input: 'Get the groceries!', complete: false },
  //   { input: 'Learn how to web design', complete: false },
  //   { input: 'Say hi to gran gran', complete: true },
  // ]

  const [todos, setTodos] = useState([
    {input: 'Hello! Add your first todo!', complete: true}
  ]);

  const [ selectedTab, setSelectedTab ] = useState('All')
 
  function handleAddTodo(newTodo) {
    // Replicate or add a new Todo to the old todo and then set it back to the Todos
    const newTodoList = [...todos, {input: newTodo, complete: false }]
    setTodos(newTodoList)
  }

  function handleCompleteTodo(index){
    //update/edit/modify
    let newTodoList = [...todos] //create a duplicate of the todos
    let completedTodo = todos[index] // access the todo we are completing by using it index
    completedTodo['complete'] = true   // modify the status of the todo 
    newTodoList[index] = completedTodo  // save the modified todo to the deuplicated todos
    setTodos(newTodoList)  //overrride the state to match the duplicate todo list

  }

  function handleDeleteTodo(index){
    let newTodoList = todos.filter((val, valueIndex) => {
      return valueIndex !== index
    })
    setTodos(newTodoList);
  }

 return (
    <>
      <Header todos={todos} />
      <Tabs 
        todos={todos}
        selectedTab={selectedTab} 
        setSelectedTab={setSelectedTab}
      />
      <TodoList 
        handleCompleteTodo={handleCompleteTodo}
        handleDeleteTodo={handleDeleteTodo} 
        selectedTab={selectedTab} 
        todos={todos}
      />
      <TodoInput 
        handleAddTodo={handleAddTodo}
      />

    </>
 )
 
}

export default App
