import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";

function TodoForm({addTodo}){

    const [todo, setTodo]=useState({
        id: "",
        task: "",
        completed: false
    });

    function handleTaskInputChange(e){
        setTodo({...todo, task: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        //only gets called if task not empty
        //trim removes whitespace from string
        if(todo.task.trim()){

            console.log("add called")
            //add id before passing it to app.js using uuid
            addTodo({...todo, id: uuidv4()});

            //reset tasktodo with empty string
            setTodo({...todo, task: ""});
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <input name="task" type="text" value={todo.task} onChange={handleTaskInputChange}></input>
            <button type="submit"> Add</button>
        </form>
    )
}

export default TodoForm;