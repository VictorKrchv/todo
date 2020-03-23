import React from 'react';
import { Button, ButtonGroup,  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



function Filters(props) {

    return <>
        <div class="todo-filters">
            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                <Button onClick={() => props.setFilter('all')}>All</Button>
                <Button onClick={() => props.setFilter('active')}>Done</Button>
                <Button onClick={() => props.setFilter('done')}>Active</Button>
            </ButtonGroup>
            <Button onClick={props.deleteCompleted}
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                Delete Compeled
             </Button>

        </div>
        
    </>

}

export default Filters;
