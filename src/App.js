import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import { Container, Typography } from '@material-ui/core';
import Input from './components/Input/Input';
import TodoItem from './components/TodoItem';
import Filters from './components/Filters';
import Card from '@material-ui/core/Card';




function App() {

  const [todos, setTodos] = useState([])

  let addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, isDone: false }])
  }

  let setIsDone = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id == id) todo.isDone = !todo.isDone
      return todo
    }))
  }

  let deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id != id))
  }

  let deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.isDone))
  }

  useEffect(() => {
    const raw = localStorage.getItem('todos')
    setTodos(JSON.parse(raw))

  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    setSortedTodo([...todos])
  }, [todos]);

  const [sortedTodo, setSortedTodo] = useState([]);

  const [filterMode, setFilterMode] = useState('')

  useEffect(() => {
    switch (filterMode) {
      case 'all': {
        setSortedTodo([...todos])
        break;
      }
      case 'active': {
        setSortedTodo(todos.filter(todo => todo.isDone))
        break;
      }
      case 'done': {
        setSortedTodo(todos.filter(todo => !todo.isDone));
        break;
      }
    }
  }, [filterMode, todos])

  
  return (
    <div className="App">
      <h1>TODO</h1>

      <div className="todo-app">
        <div className="container">
          <Card className="todo-app__inner">

            <Input addTodo={addTodo} />
            <div className="todos">
              {sortedTodo.length > 0 
              ? sortedTodo.map(todo => <TodoItem key={todo.id} id={todo.id} message={todo.text} isDone={todo.isDone} setCheck={setIsDone} deleteTodo={deleteTodo} />) 
              : <Typography variant="h3" gutterBottom >Nothing</Typography >}
            </div>

            <Filters setFilter={setFilterMode} deleteCompleted={deleteCompleted} />

          </Card>

        </div>
        
      </div>

    </div>
  );
}

export default App;
