import React, { useState, useEffect } from 'react';
import './App.css';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import FolderMenu from './components/FolderMenu';
import Todos from './components/Todos';
import Folders from './components/Folders';


function App() {

  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState({})
  const [sortedTodo, setSortedTodo] = useState([]);
  const [filterMode, setFilterMode] = useState('all')


  let addTodo = (text) => {
    setFolders(folders.map(folder => {
      if (folder.id === currentFolder.id) {
        folder.todos = [...folder.todos, { id: Date.now().toString(), text, isDone: false }]
      }
      return folder
    }))
  }

  let setIsDone = (id) => {
    setFolders(folders.map(folder => {
      if (folder.id === currentFolder.id) {
        folder.todos.map(todo => {
          if (todo.id === id) todo.isDone = !todo.isDone
          return todo
        })
      }
      return folder
    }))
  }

  let deleteTodo = (id) => {
    setFolders(folders.map(folder => {
      if (folder.id === currentFolder.id) {
        folder.todos = folder.todos.filter(todo => {
          return todo.id !== id
        })
      }
      return folder
    }))
  }

  let deleteCompleted = () => {
    setFolders(folders.map(folder => {
      if (folder.id === currentFolder.id) {
        folder.todos = folder.todos.filter(todo => !todo.isDone)
      }
      return folder
    }))
  }

  useEffect(() => {
    const raw = localStorage.getItem('folders')
    setFolders(JSON.parse(raw))
  }, []);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders))
  }, [folders]);




  useEffect(() => {
    switch (filterMode) {
      case 'all': {
        setSortedTodo(currentFolder.todos)
        break;
      }
      case 'active': {
        setSortedTodo(currentFolder.todos.filter(todo => todo.isDone))
        break;
      }
      case 'done': {
        setSortedTodo(currentFolder.todos.filter(todo => !todo.isDone));
        break;
      }
      default: return 
    }
  }, [filterMode, folders, currentFolder.todos])



  let deleteFolder = (id) => {
    setFolders(folders.filter(folder => folder.id !== id))
  }

  let addFolder = () => {
    setFolders([...folders, { name: "New folder", id: Date.now().toString(), todos: [] }])
  }

  let editFolder = (value, id) => {
    setFolders(folders.map(folder => {
      if (folder.id === id) {
        folder.name = value
      }
      return folder
    }))
  }

  function isEmpty(obj) {
    for (let key in obj) {
      return true
    }
    return false
  }

  return (
    <div className="App">
      <div className="todo-app">
        <div className="container">
          <Card className="todo-app__inner">
            <header className="header">
              <div><Typography variant="h4">TODO APP</Typography></div>

              <div className="header-right">
                {isEmpty(currentFolder)
                  ? <div className="header-right__form">
                    <FolderMenu setFilterMode={setFilterMode} currentFolder={currentFolder} setCurrentFolder={setCurrentFolder} />
                  </div>

                  : null}
              </div>
            </header>


            {isEmpty(currentFolder)
              ? <Todos deleteTodo={deleteTodo} addTodo={addTodo} sortedTodo={sortedTodo} deleteCompleted={deleteCompleted} setIsDone={setIsDone} setFilterMode={setFilterMode} />
              : <Folders setFilterMode={setFilterMode} addFolder={addFolder} setSortedTodo={setSortedTodo} editFolder={editFolder} deleteFolder={deleteFolder} folders={folders} setCurrentFolder={setCurrentFolder} />}
          </Card>

        </div>

      </div>

    </div >
  );
}

export default App;
