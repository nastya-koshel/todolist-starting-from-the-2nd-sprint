import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from 'react'

type TodolistPropsType = {
    title: string
    tasks: Array<Task>
    // или tasks: Task[] (чаще)
    filter: FilterValues
    deleteTask: (taskId: Task['id']) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
    changeTaskStatus: (taskId: Task["id"], newTaskStatus: Task["isDone"]) => void
    deleteAllTasks: () => void
}

export type Task = {
    id: string;
    title: string;
    isDone: boolean;
}

//Самое новое *ниже*
export const Todolist = (
    {
        title,
        tasks,
        filter,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteAllTasks
    }: TodolistPropsType) => {


    const [taskTitle, setTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null)

    //Старое
    // const  title = props.title;
    // const tasks = props.tasks;

    //Более новое
    // const {title, tasks} = props
    // const {title1:title2, tasks1:tasks2} = props
    // Мы берем title1 и кладем в title2, но если мы хотим оставить такие же имена, то можно написать как выше

    // const inputRef = useRef<HTMLInputElement>(null);

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            createTask(taskTitle)
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
        ? <span>Tasks list is empty</span>
        : <ul>
            {
                tasks.map(task => {
                        return (
                            <li key={task.id} className={task.isDone ? 'task-done' : ''}>
                                <input
                                    onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                                    type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button
                                    value="x"
                                    onClick={() => {
                                        deleteTask(task.id)
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
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''}
                    placeholder={"Enter task title"}
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={createTaskOnEnterHandler}
                />
                {/*<input ref={inputRef} />*/}
                <Button
                    value="+"
                    disabled={taskTitle === "" || taskTitle.length > 15}
                    onClick={createTaskHandler}
                    // onClick={() => {
                    //     createTask(tasksTitle)
                    //     setTasksTitle("");
                    //     // if (inputRef.current) {
                    //     //     const value = inputRef.current.value;
                    //     //     value && createTask(value)
                    //     //     inputRef.current.value = ''
                    //     // }
                    // }}
                />
                {error && <div className={'error-message'}>{error}</div>}
                {taskTitle && taskTitle.length <= 15 && <div>max 15 characters</div>}
                {taskTitle.length > 15 && <div className={"error-message"}>! title is too long !</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <Button value="All" onClick={() => changeFilter("all")}
                        className={filter === "all" ? "btn-filter-active" : " "}/>
                <Button value="Active" onClick={() => changeFilter("active")}
                        className={filter === "active" ? "btn-filter-active" : " "}/>
                <Button value="Completed" onClick={() => changeFilter("completed")}
                        className={filter === "completed" ? "btn-filter-active" : " "}/>
                <Button value="Delete all tasks" onClick={() => deleteAllTasks()}/>
            </div>
        </div>
    )
}