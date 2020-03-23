import React, { useState } from 'react';
import {useForm} from 'react-hook-form'
import { TextField, Button } from '@material-ui/core';
import s from './Input.module.css';


const Input = (props) => {

    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
   

    let addTodo = (e) => {
        e.preventDefault()
        if (value === '' || value.length > 30) return setError(true)
 
        props.addTodo(value)
        setValue('')
    }

    let onChange = (e) => {
        setValue(e.currentTarget.value)
    }   

    return <div className={s.header}>
        <form onSubmit={addTodo} noValidate autoComplete="off">
            <TextField  error={error} value={value} onChange={onChange} size="small" className={s.header__input} id="filled-basic" label="Write" variant="filled" />
            <Button  onClick={addTodo}  className={s.header__btn} variant="contained" color="primary">Apply</Button>
        </form>
    </div>
}

export default Input