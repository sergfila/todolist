import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {Task} from "./TaskWithRedux";

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

export const TodolistWithRedux = React.memo((props: PropsType) => {
    console.log('TodolistRedux render')
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistID])

    const dispatch = useDispatch()

    const onAllClickHandler = useCallback (() => dispatch(changeTodolistFilterAC(props.todolistID, "all")), [props.todolistID])
    const onActiveClickHandler = useCallback (() => dispatch(changeTodolistFilterAC(props.todolistID, "active")), [props.todolistID])
    const onCompletedClickHandler = useCallback (() => dispatch(changeTodolistFilterAC(props.todolistID, "completed")), [props.todolistID])
    const removeTodolistHandler = useCallback(() => {
        const action = removeTodolistAC(props.todolistID)
        dispatch(action)
    }, [props.todolistID])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolistID))
    },[props.todolistID])
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTodolistTitleAC(props.todolistID, newValue))
    },[props.todolistID])

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
                tasks.map(t => <Task key={t.id} task={t} todolistID={props.todolistID}/>)
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
})


