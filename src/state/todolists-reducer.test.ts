import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './todolists-reducer'
import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";

describe('todolistReducer', () => {
    let todolistID1: string;
    let todolistID2: string;
    let startState: Array<TodolistsType>;

    beforeEach(() => {
        todolistID1 = v1();
        todolistID2 = v1();

        startState = [
            {id: todolistID1, title: 'What to learn', filter: 'all'},
            {id: todolistID2, title: 'What to buy', filter: 'all'},
        ]
    })

    test('todolist remover',() => {
        const endState = todolistReducer(startState, removeTodolistAC(todolistID1))

        expect(endState.length).toBe(1)
        expect(endState[0].id).toBe(todolistID2)
    })

    test('add todolist', () => {
        let newTodolistTitle = 'NewTodolist'

        const endState: Array<TodolistsType> = todolistReducer(startState, addTodolistAC(newTodolistTitle))

        expect(endState.length).toBe(3)
        expect(endState[2].title).toBe(newTodolistTitle)
        expect(endState[2].filter).toBe('all')
    })

    test('correct change todolist name', () => {
        let newTodolistTitle = 'New Title'

        const action = changeTodolistTitleAC(todolistID2, newTodolistTitle)

        const endState: Array<TodolistsType> = todolistReducer(startState, action)

        expect(endState[0].title).toBe('What to learn')
        expect(endState[1].title).toBe(newTodolistTitle)
    })

    test('correct change of todolist filter', () => {
        let newFilter: FilterValuesType = 'active'

        let action = changeTodolistFilterAC(todolistID2, newFilter)

        const endState: Array<TodolistsType> = todolistReducer(startState, action)

        expect(endState[0].filter).toBe('all')
        expect(endState[1].filter).toBe(newFilter)
    })
})
