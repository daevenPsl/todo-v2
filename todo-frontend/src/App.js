import React, {useState, useEffect} from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';
import {DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableSelectRow , TableContainer, Button} from 'carbon-components-react';


const localStorageKey="react-todos"

function App() {

  const [todos, setTodos]= useState([]);

  useEffect(() => {
   // const storedTodos= JSON.parse(localStorage.getItem(localStorageKey));

   // if(storedTodos){
   //   setTodos(storedTodos);  
   // }

    //change
    axios.get(`http://localhost:3001/todo`)
      .then(res => {
        const notes = res.data;
        setTodos(notes);
        console.log(notes);
      })

  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(todos));
   
  }, [todos])

  //adds todo to an array of todos
  function addTodo(todo){
    setTodos([...todos, todo]);

    //change
    axios.post(`http://localhost:3001/todo`, { ...todo })
      .then(res => {
       // setTodos([todo, ...todos]);
        console.log(res);
        console.log(res.data);
      })
  }

  function toggleComplete(id){
    setTodos(todos.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    }))

    axios.put(`http://localhost:3001/todo/${id}`)
      .then(res => {
        console.log(res);
        //console.log(res.data);
      })

  }

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id !== id))

    axios.delete(`http://localhost:3001/todo/${id}`)
      .then(res => {
        console.log(res);
        //console.log(res.data);
      })
  }




  const headers = [
    {
      key: 'completed',
      header: 'Completed',
    },
    {
      key: 'task',
      header: 'Task',
    },
    
  ];

  function deleteRow(evt){
    
      const id=evt.target.value;
     // console.log("buttonCalled " + evt.target.value);
      setTodos(todos.filter(todo => todo.id !== id))

      axios.delete(`http://localhost:3001/todo/${id}`)
      .then(res => {
        console.log(res);
        //console.log(res.data);
      })
  }


  return (  
    <div className="App">
      <header className="App-header">
      <p>ToDo</p>
      <TodoForm addTodo={addTodo}/>


<DataTable
        rows={todos}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getSelectionProps,
          selectAll,
          selectedRows
        }) => (
          <React.Fragment>
            <TableContainer>
              <Table>
                
                <TableBody>
                  {rows.map(row => (
                    <TableRow key={row.id}>
                      <TableSelectRow   {...getSelectionProps({ row, onClick: () => toggleComplete(row.id) })} />
                      {row.cells.map(cell => {
                        //console.log(row);
                       // console.log(cell.value);
                       if(row.isSelected === true)
                          return <TableCell style={{color: "white", textDecoration: cell.value ? "line-through" : null}}  key={cell.id}>{cell.value}</TableCell>

                        return <TableCell   key={cell.id}>{cell.value}</TableCell>
                       })}
                                          
                   <Button onClick={deleteRow} value={row.id}>Delete</Button>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </React.Fragment>
        )}
      />


      </header>
    </div>
  );
}

export default App;
