import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";


//create, read, update, delete

function App() {
    const todoListTitle_1 = 'What to learn'
    const todoListTitle_2 = 'What to buy'


    const tasks_1: TaskType[] = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "React & Redux", isDone: false},
    ]

    const tasks_2: TaskType[] = [
        // {id: 4, title: "Water", isDone: false},
        // {id: 5, title: "Milk", isDone: true},
        // {id: 6, title: "Bread", isDone: true},
        // {id: 7, title: "Bread", isDone: true}
    ]

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={tasks_1}/>
            <TodoList title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;
