import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from 'react'
import {FilterValuesType, TodolistType} from "./types.tsx";


type TodolistPropsType = {
    id: string,
    title: string
    tasks: Array<Task>
    filter: FilterValuesType
    deleteTask: (taskId: Task['id'], todolistId: TodolistPropsType["id"]) => void
    changeFilter: (filter: FilterValuesType, todolistId: TodolistPropsType["id"]) => void
    createTask: (title: string, todolistId: TodolistPropsType["id"]) => void
    changeTaskStatus: (taskId: Task["id"], newTaskStatus: Task["isDone"], todolistId: TodolistPropsType["id"]) => void
    deleteTodolist : (todolistId: TodolistType['id']) => void
    deleteAllTasks: (todolistId: TodolistPropsType["id"]) => void
}

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
}

//Самое новое *ниже*
export const Todolist = (
    {
        id,
        title,
        tasks,
        filter,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        deleteAllTasks
    }: TodolistPropsType) => {


    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(taskTitle, id)
        } else {
            setError('Title is required')
        }
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    }

    const tasksList = tasks.length === 0
        ? <p>Tasks list is empty</p>
        : <ul>
            {
                tasks.map(task => {
                        return (
                            <li key={task.id} className={task.isDone ? 'task-done' : ''}>
                                <input
                                    onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, id)}
                                    type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button
                                    value="x"
                                    onClick={() => {
                                        deleteTask(task.id, id)
                                    }}
                                />
                            </li>
                        )
                    }
                )
            }
        </ul>

    return (
        <div>
            <div className="wrapper-title">
                <h3>{title}</h3>
                <Button value={"x"} onClick={() => deleteTodolist(id)} />
            </div>

            <div>
                <input className={error ? 'error' : ''}
                    placeholder={"Enter task title"}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                <Button
                    value="+"
                    disabled={taskTitle === "" || taskTitle.length > 15}
                    onClick={createTaskHandler}
                />
                {error && <div className={'error-message'}>{error}</div>}
                {taskTitle && taskTitle.length <= 15 && <div>max 15 characters</div>}
                {taskTitle.length > 15 && <div className={"error-message"}>! title is too long !</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button value="All" onClick={() => changeFilter("all", id)}
                        className={filter === "all" ? "btn-filter-active" : " "}/>
                <Button value="Active" onClick={() => changeFilter("active", id)}
                        className={filter === "active" ? "btn-filter-active" : " "}/>
                <Button value="Completed" onClick={() => changeFilter("completed", id)}
                        className={filter === "completed" ? "btn-filter-active" : " "}/>
                <Button value="Delete all tasks" onClick={() => deleteAllTasks(id)}/>
            </div>
        </div>
    )
}