import React from "react";
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";

export type TodoListPropsType = {
    title: string;
    tasks: TaskType[]

}

export type TaskType = {
    title: string;
    isDone: boolean;
    id: number
}

export const TodoList = ({title, tasks}: TodoListPropsType) => {

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
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    )
}