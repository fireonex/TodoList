import React from "react";
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;
import {FilterValuesType} from "./App";

export type TodoListPropsType = {
    title: string;
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    title: string;
    isDone: boolean;
    id: number
}

export const TodoList = ({title, tasks, removeTask, changeTodoListFilter}: TodoListPropsType) => {

    // let tasksList;
    // if (tasks.length === 0) {
    //     <span>Список пуст</span>
    // } else {
    //     <ul>
    //         {
    //             tasks.map((task: TaskType) => {
    //                 return (
    //                     <li key={task.id}>
    //                         <input type="checkbox" checked={task.isDone}/>
    //                         <span>{task.title}</span>
    //                     </li>
    //                 )
    //             })
    //         }
    //     </ul>
    // }


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


    return (
        <div className='todolist'>
            <TodoListHeader title={title}/>
            <div>
                <input/>
                <Button title={'+'}/>
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