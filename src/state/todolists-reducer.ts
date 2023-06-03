import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType

const InitialState: Array<TodolistsType> = []

export const todolistReducer = (state = InitialState, action: ActionsType): Array<TodolistsType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            return [...state, {id: action.todolistID, title: action.title, filter: "all"}]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistID} as const
}
export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', title, todolistID: v1() } as const
}
export const changeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistID, title: title} as const
}
export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistID, filter: filter} as const
}