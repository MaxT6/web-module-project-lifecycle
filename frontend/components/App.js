import React from 'react'
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
      todos: []
    } // sets state of todo list 
  
  componentDidMount() {
    axios.get(URL)
    .then(res => {
      const todos = res.data.data
      this.setState({
        todos
      })
    })
    .catch(err => console.error(err, "error fetching todos"))
  }

  addTodo = (e, item) => {
    axios.post(URL, {
      name: item
    })
    .then(res => {
      this.setState({
        ...this.state, // what does this do
        todos: [
          ...this.state.todos,
          res.data.data
        ]
      })
    })
    .catch(err => console.error(err, "name of todo is required"))
  }

  hideCompleted = (e) => {
    this.setState({
      todos: this.state.todos.filter(item => !item.completed)
    })
  }

  showCompleted = (e) => {
    this.setState({
      todos: this.state.todos.filter(item => item.completed)
    })
  }

  toggleTodo = (itemID) => {
    const URL = `http://localhost:9000/api/todos/${itemID}`
    axios.patch(URL)
    .then(res => {
      console.log("ID", res)
      this.setState({
        ...this.state,
        todos: this.state.todos.map(item => {
          if(itemID === item.id) {
            return {
              ...item,
              completed: !item.completed //toggles completed status of todo item
            }
          } return item;
        })
      })
    })
  }

  render() {
    return (
      <div>
        <TodoList 
          todos={this.state.todos} // Passes state of todos to TodoList
          toggleTodo={this.toggleTodo}
          />
        <Form 
          addTodo={this.addTodo}
        />
        <button
          onClick={this.hideCompleted}>
            Hide Completed
        </button>
        <button
          onClick={this.showCompleted}>
            Show Completed
        </button>
      </div>
    )
  }
}

