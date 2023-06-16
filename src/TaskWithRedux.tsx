import {useDispatch} from "react-redux";
import React, {ChangeEvent, useCallback} from "react";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {SuperCheckBox} from "./components/SuperCheckBox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./TodolistWithRedux";

export type TaskPropsType = {
    task: TaskType
    todolistID: string
}
export const Task = React.memo(({task, todolistID}: TaskPropsType) => {
    const dispatch = useDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskAC(task.id, todolistID)), [task.id, todolistID])
    const onChangeStatusHandler = useCallback((isChecked: boolean, e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, isChecked, todolistID))
    }, [task.id, todolistID])
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistID))
    }, [task.id, todolistID])

    return <li key={task.id} className={`list-container ${task.isDone ? "is-done" : ""}`}>
        <SuperCheckBox onChange={(isChecked, e) => onChangeStatusHandler(e.currentTarget.checked, e)}
                       checked={task.isDone}/>
        <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
        <IconButton aria-label="delete"
                    onClick={onClickHandler}
        >
            <DeleteIcon/>
        </IconButton>
    </li>
})