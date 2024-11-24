import TodoCard from "./TodoCard";



const TodoList = (props) => {
  const { todos, selectedTab } = props;

  
  const filterTodosList = selectedTab === 'All' ?
      todos :
      selectedTab === 'Completed' ?
      todos.filter(val => val.complete) :
      todos.filter(val => !val.complete)
  return (
      <>
        {
          filterTodosList.map((todos, todoIndex) => {
            return (
              // pass down all the props from TodoList to TodoCard
              <TodoCard 
              key={todoIndex}
              todoIndex={todoIndex}
              {...props}
              todo={todos}/>
            )
          })
        }
      </>
  )
}

export default TodoList;