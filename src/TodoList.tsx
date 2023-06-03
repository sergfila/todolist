import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import {SuperCheckBox} from "./components/SuperCheckBox";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTask = (title: string) => {
        props.addTask(props.todolistID, title)
    }

    const onChangeTitleHandler = (newValue: string) => {
        props.changeTodolistTitle(props.todolistID, newValue);
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
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeStatusHandler = (isChecked: boolean, e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, isChecked);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(props.todolistID, t.id, newValue);
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

