import React from "react";
import {Checkbox, Button} from 'carbon-components-react';

function Todo({todo, toggleComplete, removeTodo}){

    function handleCheckboxClick(){
        toggleComplete(todo.id);
    }

    function handleRemoveClick(){
        removeTodo(todo.id);
    }
    /*
    return(
        <div style={{display: "flex"}}>
        <input type="checkbox" onClick={handleCheckboxClick}></input>
        <li style={{color: "white", textDecoration: todo.completed ? "line-through" : null}}> {todo.task} </li>
        <button onClick={handleRemoveClick}>X</button>
        
        </div>
    )
    */

    

    return(
        <div style={{display: "flex"}}>
        <Checkbox onClick={handleCheckboxClick}/>
        <li style={{color: "white", textDecoration: todo.completed ? "line-through" : null}}> {todo.task} </li>
        <Button onClick={handleRemoveClick}>X</Button>
        </div>
    )
}

export default Todo;