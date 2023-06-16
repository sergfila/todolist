import React, {useCallback, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./AppBar";
import Paper from '@mui/material/Paper';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { id: string, title: string, filter: FilterValuesType }
export type TasksType = {
    [key: string]: TaskType[]
}

function App() {
    console.log('App render')

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // удаление таски
    const removeTask = useCallback((todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
    }, [tasks])
    // добавление таски
    const addTask = useCallback((todolistID: string, title: string) => {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [task,...tasks[todolistID]]})
    }, [tasks])
    // смена чекбокса
    const changeStatus = useCallback((todolistID: string,taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})
    }, [tasks])
    // смена фильтра тасок
    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }, [todolists])
    // удаление тудулиста
    const removeTodolist = useCallback((todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }, [todolists])
    // добавление тудулиста
    const addTodolist = useCallback((title: string) => {
        const todolist:TodolistsType = {id: v1(), title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks,[todolist.id]: []})
    }, [todolists])
    // изменение имени таски
    const changeTaskTitle = useCallback((todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID]
                .map(el => el.id === taskID ? {...el, title} : el)})
    }, [tasks])
    // изменение имени тудулиста
    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title} : el))
    }, [todolists])

    return (
        <div className="App">
            <ButtonAppBar />
            <div className={'title-container'}>
                <h3>Add TodoList</h3>
                <AddItemForm addItem={addTodolist} />
            </div>
            <div className={'wrapper'}>

                {todolists.map(el => {
                    let tasksForTodolist = tasks[el.id];

                    return (
                        <Paper key={el.id} elevation={2} style={{padding: '15px'}}>
                            <Todolist
                                changeTaskTitle={changeTaskTitle}
                                key={el.id}
                                todolistID={el.id}
                                title={el.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={el.filter}
                                removeTodolist={removeTodolist}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    )
                })}
            </div>
        </div>
    );
}

export default App;
