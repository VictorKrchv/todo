import React from 'react';
import { Checkbox, IconButton, Typography, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



function Todoitem({ message, isDone, id, setCheck, deleteTodo }) {

    return <>
        <div className="todo-item">
            <div className="todo-input"><Checkbox id={id} size="small" className="todo-input" color='primary' onChange={() => setCheck(id)} checked={isDone} type="checkbox" /></div>
            <div className='todo-message'>
                <Typography variant="body1"><label for={id}>{message}</label></Typography>
            </div>
            <div className="delete">
                <IconButton onClick={() => deleteTodo(id)} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
        <Divider />
    </>

}

export default Todoitem;
