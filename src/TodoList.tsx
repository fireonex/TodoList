import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {TodoListHeader} from "./TodoListHeader";
import {FilterValuesType} from "./App";


export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

export type TaskType = {
    title: string;
    isDone: boolean;
    id: string;
    // newTask: TaskType
}

export const TodoList = ({title, tasks, removeTask, changeTodoListFilter, addTask, changeTaskStatus, filter}: TodoListPropsType) => {

    // const inputRef = useRef<HTMLInputElement>(null)

    const [taskTitle, setTaskTitle] = React.useState('')

    const [inputError, setInputError] = useState<boolean>(false)

    const tasksList: JSX.Element = tasks.length === 0
        ? <span>Список пуст</span>
        : <ul>
            {
                tasks.map((task: TaskType) => {
                    const removeTaskHandler = () => removeTask(task.id)

                    const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)

                    return (
                        <li key={task.id} className={task.isDone ? 'task-done' : 'task'}>
                            <input type="checkbox" checked={task.isDone} onChange={changeStatusHandler}/>
                            <span>{task.title}</span>
                            <Button title={'x'} onClickHandler={removeTaskHandler}/>
                        </li>
                    )
                })
            }
        </ul>

    const addNewTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            addTask(taskTitle)
        } else {
            setInputError(true)
            setTimeout(() => setInputError(false), 2000)
        }
        setTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && isAddTaskPossible) {
            addNewTaskHandler()
        }
    }

    const setTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        inputError && setInputError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const changeTodoListFilterHandlerCreator = (filter: FilterValuesType) => {
        return () => changeTodoListFilter(filter)
    }


    const isAddTaskPossible = taskTitle.length && taskTitle.length <= 15

    return (
        <div className='todolist'>
            <TodoListHeader title={title}/>
            <div>
                <input onKeyDown={onKeyDownHandler}
                       value={taskTitle}
                       onChange={setTaskTitleHandler}
                       className={inputError ? 'input-error' : ''}/>
                <Button title={'+'} onClickHandler={addNewTaskHandler} isDisabled={!isAddTaskPossible}/>

                {!taskTitle.length && <div style={{color: inputError ? "red" : 'black'}}>Please, enter title</div>}
                {taskTitle.length > 15 && <div>Task is too long</div>}
            </div>
            {tasksList}
            <div>
                <Button
                    title={'All'}
                    onClickHandler={changeTodoListFilterHandlerCreator('all')}
                    classes={filter === 'all' ?'btn-active' : ''}
                />
                <Button
                    title={'Active'}
                    onClickHandler={changeTodoListFilterHandlerCreator('active')}
                    classes={filter === 'active' ?'btn-active' : ''}
                />
                <Button
                    title={'Completed'}
                    onClickHandler={changeTodoListFilterHandlerCreator('completed')}
                    classes={filter === 'completed' ?'btn-active' : ''}
                />
            </div>
        </div>
    )
}