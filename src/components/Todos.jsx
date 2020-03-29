import React from "react"
import Input from './Input/Input';
import TodoItem from './TodoItem';
import Filters from './Filters';
import { Typography, List} from '@material-ui/core';



const Todos = (props) => {
    return <>
        <Input addTodo={props.addTodo} />
        <div className="todos">
            {props.sortedTodo.length > 0
                ? <List>
                    {props.sortedTodo.map(todo => <TodoItem key={todo.id} id={todo.id} message={todo.text} isDone={todo.isDone} setCheck={props.setIsDone} deleteTodo={props.deleteTodo} />)}
                </List>
                : <Typography style={{ marginTop: '10px' }} align="left" variant="subtitle1" gutterBottom >List is clear</Typography >}
        </div>
        {props.sortedTodo.length > 0 ? <Filters setFilter={props.setFilterMode} deleteCompleted={props.deleteCompleted} /> : null}
    </>
}

export default Todos
