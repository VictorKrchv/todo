import React from 'react';
import { Checkbox, IconButton, Typography, Divider, ListItemIcon, ListItem, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';



function Todoitem({ message, isDone, id, setCheck, deleteTodo }) {
    return <>
        <ListItem onClick={() => setCheck(id)} button>
            <ListItemIcon>
                <Checkbox
                    id={id}
                    edge="start"
                    checked={isDone}
                    tabIndex={-1}
                    disableRipple
                    color='primary'
                />
            </ListItemIcon>
            <ListItemText primary={message} />
            <ListItemSecondaryAction>
                <IconButton onClick={() => deleteTodo(id)}  edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    </>

}


//             <div className="todo-item">
//     <div className="todo-input"><Checkbox id={id} size="small" className="todo-input" color='primary' onChange={() => setCheck(id)} checked={isDone} type="checkbox" /></div>
//     <div className='todo-message'>
//         <Typography variant="body1"><label htmlFor={id}>{message}</label></Typography>
//     </div>
//     <div className="delete">
//         <IconButton onClick={() => deleteTodo(id)} aria-label="delete">
//             <DeleteIcon />
//         </IconButton>
//     </div>
// </div>
export default Todoitem;
