import React, {useRef} from "react";
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";


export type TodoListPropsType = {
    title: string;
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}


export type TaskType = {
    title: string;
    isDone: boolean;
    id: string;
    // newTask: TaskType
}

export const TodoList = ({title, tasks, removeTask, changeTodoListFilter, addTask}: TodoListPropsType) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const tasksList: JSX.Element = tasks.length === 0
        ? <span>Список пуст</span>
        : <ul>
            {
                tasks.map((task: TaskType) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title={'x'} onClickHandler={() => removeTask(task.id)}/>
                        </li>
                    )
                })
            }
        </ul>

    const addNewTask = () => {
        if (inputRef.current) {
            addTask(inputRef.current.value)
            inputRef.current.value = ''
        }
    }


    return (
        <div className='todolist'>
            <TodoListHeader title={title}/>
            <div>
                <input ref={inputRef}/>
                <Button title={'+'} onClickHandler={addNewTask}/>
            </div>
            {tasksList}
            <div>
                <Button title={'All'} onClickHandler={() => changeTodoListFilter('all')}/>
                <Button title={'Active'} onClickHandler={() => changeTodoListFilter('active')}/>
                <Button title={'Completed'} onClickHandler={() => changeTodoListFilter('completed')}/>
            </div>
        </div>
    )
}