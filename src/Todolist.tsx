import {Button} from "./Button.tsx";
import {FilterValuesType, TaskType, TodolistType} from "./types.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";


type TodolistPropsType = {
    id: string,
    title: string
    tasks: Array<Task>
    filter: FilterValuesType
    deleteTask: (taskId: Task['id'], todolistId: TodolistPropsType["id"]) => void
    changeFilter: (filter: FilterValuesType, todolistId: TodolistPropsType["id"]) => void
    createTask: (title: string, todolistId: TodolistPropsType["id"]) => void
    changeTaskStatus: (taskId: Task["id"], newTaskStatus: Task["isDone"], todolistId: TodolistPropsType["id"]) => void
    deleteTodolist: (todolistId: TodolistType['id']) => void
    deleteAllTasks: (todolistId: TodolistPropsType["id"]) => void
    changeTaskTitle: (taskId: TaskType["id"], newTaskTitle: TaskType["title"], todolistId: TodolistType['id']) => void
    changeTodolistTitle: (newTodolistTitle: TodolistType['title'], todolistId: TodolistType['id']) => void
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
        deleteAllTasks,
        changeTaskTitle,
        changeTodolistTitle
    }: TodolistPropsType) => {
    const tasksList = tasks.length === 0
        ? <p>Tasks list is empty</p>
        : <ul>
            {
                tasks.map(task => {
                        const changeTaskTitleHandler = (newTitle: TaskType["title"]) => {
                            changeTaskTitle(task.id, newTitle, id)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'task-done' : ''}>
                                <input
                                    onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, id)}
                                    type="checkbox" checked={task.isDone}/>
                                <EditableSpan currentTitle={task.title} changeTitle={changeTaskTitleHandler}/>
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

    const createTaskHandler = (taskTitle: TaskType['title']) => {
        createTask(taskTitle, id)
    }

    const changeTodolistTitleHandler = (newTitle: TodolistPropsType["title"]) => {
        changeTodolistTitle(newTitle, id)
    }
    return (
        <div>
            <div className="wrapper-title">
                <h3>
                    <EditableSpan currentTitle={title} changeTitle={changeTodolistTitleHandler} />
                </h3>
                <Button value={"x"} onClick={() => deleteTodolist(id)}/>
            </div>
            <CreateItemForm createItem={createTaskHandler}/>
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