import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./AppBar";
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { id: string, title: string, filter: FilterValuesType }
export type TasksType = {
    [key: string]: TaskType[]
}

function AppWithRedusers() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
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
    function removeTask(todolistID: string, taskID: string) {
        dispatchToTasks(removeTaskAC(taskID, todolistID))
    }
    // добавление таски
    function addTask(todolistID: string, title: string) {
        dispatchToTasks(addTaskAC(title, todolistID))
    }
    // смена чекбокса
    function changeStatus(todolistID: string,taskId: string, isDone: boolean) {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistID))
    }
    // смена фильтра тасок
    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatchToTodolists(changeTodolistFilterAC(todolistID, value))
    }
    // удаление тудулиста
    function removeTodolist(todolistID: string) {
        const action = removeTodolistAC(todolistID)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    // добавление тудулиста
    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function changeTaskTitle(todolistID: string, taskID: string, title: string) {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskID, title))
    }

    function changeTodolistTitle(todolistID: string, title: string) {
        dispatchToTodolists(changeTodolistTitleAC(todolistID, title))
    }

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

                    if (el.filter === "active") {
                        tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                    }
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

export default AppWithRedusers;
