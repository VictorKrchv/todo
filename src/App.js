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
    setCurrentFolder({ ...currentFolder, todos: [...currentFolder.todos, { id: Date.now().toString(), text, isDone: false }] })
}

let setIsDone = (id) => {
  setCurrentFolder({
    ...currentFolder, todos: currentFolder.todos.map(todo => {
      if (todo.id === id) todo.isDone = !todo.isDone
      return todo
    })
  })
}

useEffect(() => {
  console.log('[]')
  const raw = localStorage.getItem('folders')
  const raw1 = JSON.parse(raw)
  console.log(raw1)
  setFolders([...raw1])
}, []);

useEffect(() => {
  console.log('FOLDERS')
  localStorage.setItem('folders', JSON.stringify(folders))
}, [folders]);


let deleteTodo = (id) => {
  setCurrentFolder({ ...currentFolder, todos: currentFolder.todos.filter(todo => todo.id !== id) })
}

let deleteCompleted = () => {
  setCurrentFolder(currentFolder.todos.filter(todo => !todo.isDone))
}


useEffect(() => {
  console.log('CURRENTFOLDER')
  setFolders(folders.map(folder => {
    if (folder.id === currentFolder.id) folder = currentFolder
    return folder
  }))
}, [currentFolder]);


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
  }
}, [filterMode, currentFolder])



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
                  <FolderMenu currentFolder={currentFolder} setCurrentFolder={setCurrentFolder} />
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
