import {TasksStateType, TaskType, TodolistType} from "../types.tsx";
import {CreateTodolistAT, DeleteTodolistAT} from "./todolists-reducer.ts";
import {v1} from "uuid";

type DeleteTaskAT = ReturnType<typeof deleteTaskAC>
type CreateTaskAT = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>
type DeleteAllTasksAT = ReturnType<typeof deleteAllTasksAC>
type ActionType = DeleteTodolistAT | CreateTodolistAT | DeleteTaskAT | CreateTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | DeleteAllTasksAT

export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "create_todolist":
            return {...tasks, [action.payload.id]: []}
        case "delete_todolist":
            const copyTasksState = {...tasks}
            delete copyTasksState[action.payload.id]
            return copyTasksState
        case "delete_task":
            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        case "create_task":
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return {...tasks, [action.payload.todolistId]: [...tasks[action.payload.todolistId], newTask]}
        case "change_task_status":
            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.newTaskStatus} : t)}
        case "change_task_title":
            return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTaskTitle} : t)}
        case "delete_all_tasks":
            return {...tasks, [action.payload]: []}
        default:
            return tasks;
    }
};

export const deleteTaskAC = (payload: { todolistId: TodolistType["id"], taskId: TaskType["id"] }) => ({
    type: "delete_task",
    payload: payload
} as const)

export const createTaskAC = (payload: {todolistId: TodolistType["id"], title: TaskType["title"]}) => ({
    type: "create_task",
    payload: payload
} as const)

export const changeTaskStatusAC = (payload: { todolistId: TodolistType["id"], taskId: TaskType["id"], newTaskStatus: TaskType["isDone"] }) => ({
    type: "change_task_status",
    payload: payload
} as const)

export const changeTaskTitleAC = (payload: { taskId: TaskType["id"], newTaskTitle: TaskType["title"], todolistId: TodolistType['id']}) => ({
    type: "change_task_title",
    payload: payload
} as const)

export const deleteAllTasksAC = (todolistId: TodolistType['id']) => ({
    type: "delete_all_tasks",
    payload: todolistId
} as const)