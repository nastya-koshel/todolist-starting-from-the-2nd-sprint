import {FilterValuesType, TodolistType} from "../types.tsx";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

type ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "delete_todolist":
            return todolists.filter(tl => tl.id !== action.payload.id)
        case "create_todolist":
            const newTodolist: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all'
            }
            return ([...todolists, newTodolist])
        case "change_todolist_title":
            return todolists.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        case "change_todolist_filter":
            return todolists.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        default:
            return todolists;
    }
}

export const deleteTodolistAC = (id: TodolistType['id']) => ({
    type: "delete_todolist",
    // что нам нужно для удаления
    payload: {
        id: id
    }
} as const)

export const createTodolistAC = (payload: {title: TodolistType['title'], id: TodolistType['id']}) => ({
    type: "create_todolist",
    payload: payload
} as const)

export const changeTodolistTitleAC = (payload: {id: TodolistType['id'], title: TodolistType['title']}) => ({
    type: "change_todolist_title",
    payload: payload
} as const)

export const changeTodolistFilterAC = (payload: {id: TodolistType['id'], filter: FilterValuesType}) => ({
    type: "change_todolist_filter",
    payload: payload
} as const)
