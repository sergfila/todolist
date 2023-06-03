import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {SuperCheckBox} from "./components/SuperCheckBox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
}

export function TodolistWithRedux(props: PropsType) {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])

    const dispatch = useDispatch()

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistID, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistID, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.todolistID, "completed"))
    const removeTodolistHandler = () => {
        const action = removeTodolistAC(props.todolistID)
        dispatch(action)
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todolistID))
    }
    const onChangeTitleHandler = (newValue: string) => {
        dispatch(changeTodolistTitleAC(props.todolistID, newValue))
    }

    if (props.filter === "active") {
        tasks = tasks.filter(tasks => !tasks.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(tasks => tasks.isDone);
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} onChange={onChangeTitleHandler} />
            <IconButton aria-label="delete"
                        onClick={removeTodolistHandler}
            >
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, props.todolistID))
                    const onChangeStatusHandler = (isChecked: boolean, e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(t.id, isChecked, props.todolistID))
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, props.todolistID))
                    }

                    return <li key={t.id} className={`list-container ${t.isDone ? "is-done" : ""}`}>
                        <SuperCheckBox onChange={(isChecked, e) => onChangeStatusHandler(e.currentTarget.checked, e)} checked={t.isDone} />
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <IconButton aria-label="delete"
                                    onClick={onClickHandler}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button color={'secondary'} variant={props.filter === 'all' ? 'outlined' : "text"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={'secondary'} variant={props.filter === 'active' ? 'outlined' : "text"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={'secondary'} variant={props.filter === 'completed' ? 'outlined' : "text"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

