import React, { useState } from 'react'
import { List, ListItem, ListItemText, ListItemIcon, Button, Input,  } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditIcon from '@material-ui/icons/Edit';


const Folders = (props) => {

    let setFolder = (e, folder) => {
        if (editMode == folder.id) return false
        props.setCurrentFolder(folder)
        props.setSortedTodo(folder.todos)
    }

    let setNewName = (id) => {
        setEditMode(null)
        if (value === "") {
            return false
        }
        props.editFolder(value, id)
    } 

    let addNewFolder = () => {
        props.addFolder()
    }

    const [editMode, setEditMode] = useState(null);
    const [value, setValue] = useState('')

    return <>
        <div className="profiles">
            <List component="nav" aria-label="secondary mailbox folders">
                {props.folders.map(folder =>
                    <ListItem key={folder.id} onClick={(e) => {
                        setFolder(e, folder) 
                        }} button>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        {folder.id !== editMode ? <ListItemText primary={folder.name} /> : <Input onChange={(e) => setValue(e.currentTarget.value)} value={value} onBlur={() => setNewName(folder.id)} autoFocus onClick={() => false} defaultValue="Hello world" />}
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => {
                                setValue(folder.name) 
                                setEditMode(folder.id)
                            }} edge="end" aria-label="delete">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => props.deleteFolder(folder.id)} style={{ marginLeft: '5px' }} edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )}
            </List>

            <div className="profile-btn">
                <Button onClick={addNewFolder} variant="contained" color="primary" startIcon={<CreateNewFolderIcon />}>
                    Create New Folder
                </Button>
            </div>
        </div>
    </>
}

export default Folders