import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {Todolist} from './Todolist'
import {FilterValuesType, TasksStateType, TaskType, TodolistType} from "./types.tsx";
import {getFilteredTasks} from "./utilites.tsx";



export const App = () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()


    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistId_2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    //CRUD - Create Redact Update Delete

    const deleteTask = (taskId: string, todolistId: TodolistType['id']) => {
        // 1 Создаем новый state иммутабельно
        const newState = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        //(для себя) [todolistId] мы пишем в [] потому что это переменная в которой содержится индекс
        //2 Сетаем newState
        setTasks(newState)
    }

    const createTask = (title: string, todolistId: TodolistType['id']) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }

        // 1 Создаем новый state иммутабельно
        const newState = {
            ...tasks,
            [todolistId]: [...tasks[todolistId], newTask]
        }
        //2 Сетаем newState
        setTasks(newState)
        delete tasks[todolistId]
    }

    const changeTaskStatus = (taskId: TaskType["id"], newTaskStatus: TaskType["isDone"], todolistId: TodolistType['id']) => {
        // 1 Создаем новый state иммутабельно
        const newState= {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        }
        //2 Сетаем newState
        setTasks(newState)
    }

    const changeFilter = (filter: FilterValuesType, todolistId: TodolistType['id']) => {
        const newState = todolists.map (tl => tl.id === todolistId ? {...tl, filter: filter} : tl)
        setTodolists(newState)
    }

    const deleteAllTasks = (todolistId: TodolistType['id']) => {
        // 1 Создаем новый state иммутабельно
        const newState = {...tasks, [todolistId]: []}
        //2 Сетаем newState
        setTasks(newState)
    }

    const deleteTodolist = (todolistId: TodolistType['id']) => {
        // 1 Создаем новый state иммутабельно
        const newState = todolists.filter(tl => tl.id !== todolistId)
        //2 Сетаем newState
        setTodolists(newState)
    }

    const todolistComponents = todolists.map(tl => {
        return (
            <Todolist
                key={tl.id}
                id={tl.id}
                title = {tl.title}
                tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                deleteTask={deleteTask}
                deleteTodolist={deleteTodolist}
                filter={tl.filter}
                changeTaskStatus={changeTaskStatus}
                changeFilter={changeFilter}
                createTask={createTask}
                deleteAllTasks={deleteAllTasks}
            />
        )
    })

    return (
        <div className="app">
            {todolistComponents}
        </div>
    )
}
