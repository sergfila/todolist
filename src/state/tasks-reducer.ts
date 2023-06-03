import {TasksType} from "../App";
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer'
import {v1} from "uuid";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | changeTaskTitleActionType
    | RemoveTodolistActionType
    | AddTodolistActionType

const InitialState: TasksType = {}

export const tasksReducer = (state = InitialState, action: ActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID]
                    .filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, isDone: false }
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        case 'CHANGE-STATUS-TASK':
            return {...state, [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)}
        case 'CHANGE-TITLE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID]
                    .map(el => el.id === action.taskId ? {...el, title: action.title} : el)}
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistID]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
            // let {[action.id]: [], ...rest} = state
            // return rest
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistID: string) => {
    return { type: 'REMOVE-TASK', taskId, todolistID} as const
}
export const addTaskAC = (title: string, todolistID: string) => {
    return { type: 'ADD-TASK', todolistID, title} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return { type: 'CHANGE-STATUS-TASK', todolistID, isDone, taskId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistID: string) => {
    return { type: 'CHANGE-TITLE-TASK', todolistID, title, taskId} as const
}