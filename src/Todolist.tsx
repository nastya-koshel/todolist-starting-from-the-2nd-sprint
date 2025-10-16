import {FilterValuesType, TaskType, TodolistType} from "./types.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import BackspaceIcon from '@mui/icons-material/Backspace';
import {containerWithGapSx2, getListItemSx} from "./Todolist.style.tsx";


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
        : <List>
            {
                tasks.map(task => {
                        const changeTaskTitleHandler = (newTitle: TaskType["title"]) => {
                            changeTaskTitle(task.id, newTitle, id)
                        }
                        return (
                            <ListItem key={task.id}
                                      className={task.isDone ? 'task-done' : ''}
                                      disablePadding
                                      sx={{justifyContent: "space-between"}}
                            >
                                <Box sx={{display: "flex", alignItems: "center"}}>
                                    <Checkbox
                                        size="small"
                                        onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked, id)}
                                        checked={task.isDone}/>
                                    <Box sx={getListItemSx(task.isDone)}>
                                        <EditableSpan currentTitle={task.title} changeTitle={changeTaskTitleHandler} />
                                    </Box>
                                </Box>
                                <IconButton size="small" onClick={() => {
                                    deleteTask(task.id, id)
                                }}><BackspaceIcon/></IconButton>
                            </ListItem>
                        )
                    }
                )
            }
        </List>

    const createTaskHandler = (taskTitle: TaskType['title']) => {
        createTask(taskTitle, id)
    }

    const changeTodolistTitleHandler = (newTitle: TodolistPropsType["title"]) => {
        changeTodolistTitle(newTitle, id)
    }
    return (
        <div>
            <Box className="wrapper-title" sx={{justifyContent: "space-between", padding: "15px 0"}}>
                <Typography variant="h5">
                    <EditableSpan currentTitle={title} changeTitle={changeTodolistTitleHandler}/>
                </Typography>
                <IconButton onClick={() => deleteTodolist(id)}><DeleteIcon/></IconButton>
            </Box>
            <CreateItemForm createItem={createTaskHandler}/>
            <ul>
                {tasksList}
            </ul>
            <Box sx={containerWithGapSx2}>
                <Button
                    variant="contained"
                    onClick={() => changeFilter("all", id)}
                    color={filter === "all" ? "secondary" : "primary"}
                    size="small"
                    disableElevation
                >All</Button>
                <Button
                    variant="contained"
                    onClick={() => changeFilter("active", id)}
                    color={filter === "active" ? "secondary" : "primary"}
                    size="small"
                    disableElevation
                >Active</Button>
                <Button
                    variant="contained"
                    onClick={() => changeFilter("completed", id)}
                    color={filter === "completed" ? "secondary" : "primary"}
                    size="small"
                    disableElevation
                >Completed</Button>
                <IconButton onClick={() => deleteAllTasks(id)}><DeleteIcon/></IconButton>
            </Box>
        </div>
    )
}