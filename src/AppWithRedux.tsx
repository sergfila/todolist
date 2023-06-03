import React from 'react';
import './App.css';
import {TaskType, TodolistWithRedux} from './TodolistWithRedux';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./AppBar";
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { id: string, title: string, filter: FilterValuesType }
export type TasksType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    let state = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    const dispatch = useDispatch()

    // добавление тудулиста
    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    return (
        <div className="App">
            <ButtonAppBar />
            <div className={'title-container'}>
                <h3>Add TodoList</h3>
                <AddItemForm addItem={addTodolist} />
            </div>
            <div className={'wrapper'}>
                {state.map(el => {

                    return (
                        <Paper key={el.id} elevation={2} style={{padding: '15px'}}>
                            <TodolistWithRedux
                                todolistID={el.id}
                                title={el.title}
                                filter={el.filter}
                            />
                        </Paper>
                    )
                })}
            </div>
        </div>
    );
}

export default AppWithRedux;