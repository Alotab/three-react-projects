

const TodoCard = (props) => {
  //handleDeleteTodo is a prop to TodoList and also passed from TodoList to TodoCard as a prop (prop drilling)
  const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo } = props;
 
  return (
    <div className="card todo-item">
        <p>{todo.input}</p>
        <div className="todo-button">
            <button onClick={() => handleCompleteTodo(todoIndex)}
            disabled={todo.complete}><h6>Done</h6></button>
            <button 
            onClick={() => handleDeleteTodo(todoIndex)}>
              <h6>Delete</h6>
            </button>
        </div>
    </div>
  )
}

// onClick={handleDeleteTodo(todoIndex)}

export default TodoCard;