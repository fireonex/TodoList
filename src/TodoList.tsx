import React, {ChangeEvent, KeyboardEventHandler, useRef} from "react";
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
    // const inputRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitle] = React.useState('')

    const tasksList: JSX.Element = tasks.length === 0
        ? <span>Список пуст</span>
        : <ul>
            {
                tasks.map((task: TaskType) => {
                    const removeTaskHandler = () => removeTask(task.id)
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button title={'x'} onClickHandler={removeTaskHandler}/>
                        </li>
                    )
                })
            }
        </ul>

    const addNewTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && isAddTaskPossible) {addNewTaskHandler()}
    }
    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const changeTodoListFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter
    }

    const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

    return (
        <div className='todolist'>
            <TodoListHeader title={title}/>
            <div>
                <input onKeyDown={() => onKeyDownHandler}
                       value={taskTitle}
                       onChange={setTaskTitleHandler}/>
                <Button title={'+'} onClickHandler={addNewTaskHandler} isDisabled={!isAddTaskPossible}/>
                {!taskTitle.length && <div>Please, enter title</div>}
                {taskTitle.length > 15 && <div>Task is too long</div>}
            </div>
            {tasksList}
            <div>
                <Button title={'All'} onClickHandler={changeTodoListFilterHandlerCreator('all')}/>
                <Button title={'Active'} onClickHandler={changeTodoListFilterHandlerCreator('active')}/>
                <Button title={'Completed'} onClickHandler={changeTodoListFilterHandlerCreator('completed')}/>
            </div>
        </div>
    )
}