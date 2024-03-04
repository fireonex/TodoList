import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";


//create, read, update, delete

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    const todoListTitle_1 = 'What to learn'
    //const todoListTitle_2 = 'What to buy'




    const [tasks, setTasks] = React.useState( [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "JS & TS", isDone: true},
        {id: 3, title: "React & Redux", isDone: false},
    ])

    const [filter, setFilter] = React.useState<FilterValuesType>('all')


    // const tasks = resultArr[0] //variable get current state
    // const setTasks = resultArr[1] //func for set next state

    // const removeTask = (taskId: number) => {
    //     tasks.pop()
    //     setTasks([...tasks])
    // }

    const removeTasks = (taskId: number) => {
        const updatedState = tasks.filter(task => task.id !== taskId)
        setTasks(updatedState)
    }

    const changeTodoListFilter = (filter: FilterValuesType) => setFilter(filter);


    const getFilteredTasks = (allTasks: Array<TaskType>, currentFilter: FilterValuesType): Array<TaskType> => {
        switch (currentFilter) {
            case 'active':
                return allTasks.filter(t => t.isDone === false)
            case 'completed':
                return allTasks.filter(t => t.isDone === true)
            default:
                return allTasks;
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)


    // const tasks_2: TaskType[] = [
    //     // {id: 4, title: "Water", isDone: false},
    //     // {id: 5, title: "Milk", isDone: true},
    //     // {id: 6, title: "Bread", isDone: true},
    //     // {id: 7, title: "Bread", isDone: true}
    // ]

    return (
        <div className="App">
            <TodoList title={todoListTitle_1} tasks={filteredTasks} removeTask={removeTasks} changeTodoListFilter={changeTodoListFilter}/>

        </div>
    );
}

export default App;
