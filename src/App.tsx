import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {Todolist} from './Todolist'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {
    const [filter, setFilter] = useState<FilterValues>('all')

    const [tasks, setTasks] = useState<Task[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    //CRUD - Create Redact Update Delete

    const deleteTask = (taskId: string) => {
        const filteredTasks = tasks.filter(task => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    const changeTaskStatus = (taskId: Task["id"], newTaskStatus: Task["isDone"]) => {
        const nextState = tasks.map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        setTasks(nextState)
    }

    const changeFilter = (filter: FilterValues) => {
        setFilter(filter)
    }

    const getFilteredTasks = (tasks: Task[]) => {
        let filteredTasks = tasks
        if (filter === 'active') {
            filteredTasks = tasks.filter(task => !task.isDone)
        }
        if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.isDone)
        }
        return filteredTasks
    }


    const createTask = (title: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
        //краткая запись: setTasks([...tasks,{id:1, title:title, isDone: false}])
    }

    const deleteAllTasks = () => {
        setTasks([])
    }

    return (
        <div className="app">
            <Todolist title="What to learn"
                      tasks={getFilteredTasks(tasks)}
                      deleteTask={deleteTask}
                      filter={filter}
                      changeTaskStatus={changeTaskStatus}
                      changeFilter={changeFilter}
                      createTask={createTask}
                      deleteAllTasks={deleteAllTasks}
            />
        </div>
    )
}
