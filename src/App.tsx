import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {Todolist} from './Todolist'
import {FilterValuesType, TasksStateType, TaskType, TodolistType} from "./types.tsx";
import {getFilteredTasks} from "./utilites.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {
    AppBar,
    Box,
    Container,
    createTheme, CssBaseline,
    Grid,
    IconButton,
    Paper,
    Switch,
    ThemeProvider,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'
import {containerSx} from "./Todolist.style.tsx";
import {NavButton} from "./NavButton.tsx";
import {pink} from "@mui/material/colors";


export const App = () => {

    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    //TASKS (CRUD - Create Redact Update Delete)

    //---Create---
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

    //---Redact---
    const changeTaskTitle = (taskId: TaskType["id"], newTaskTitle: TaskType["title"], todolistId: TodolistType['id']) => {
        // 1 Создаем новый state иммутабельно
        const newState = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTaskTitle} : t)
        }
        //2 Сетаем newState
        setTasks(newState)
    }

    //---Update---
    const changeTaskStatus = (taskId: TaskType["id"], newTaskStatus: TaskType["isDone"], todolistId: TodolistType['id']) => {
        // 1 Создаем новый state иммутабельно
        const newState = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
        }
        //2 Сетаем newState
        setTasks(newState)
    }

    //---Delete---
    const deleteTask = (taskId: string, todolistId: TodolistType['id']) => {
        // 1 Создаем новый state иммутабельно
        const newState = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        //(для себя) [todolistId] мы пишем в [] потому что это переменная в которой содержится индекс
        //2 Сетаем newState
        setTasks(newState)
    }
    const deleteAllTasks = (todolistId: TodolistType['id']) => {
        // 1 Создаем новый state иммутабельно
        const newState = {...tasks, [todolistId]: []}
        //2 Сетаем newState
        setTasks(newState)
    }

    //TODOLISTS (CRUD)

    //---Create---
    const createTodolist = (title: TodolistType["title"]) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {
            id: todolistId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }

    //---Redact---
    const changeTodolistTitle = (newTodolistTitle: TodolistType['title'], todolistId: TodolistType['id']) => {
        const newState = todolists.map(tl => tl.id === todolistId ? {...tl, title: newTodolistTitle} : tl)
        setTodolists(newState)
    }

    //---Update---
    const changeFilter = (filter: FilterValuesType, todolistId: TodolistType['id']) => {
        const newState = todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl)
        setTodolists(newState)
    }

    //---Delete---
    const deleteTodolist = (todolistId: TodolistType['id']) => {
        // 1 Создаем новый state иммутабельно
        const newState = todolists.filter(tl => tl.id !== todolistId)
        //2 Сетаем newState
        setTodolists(newState)
    }

    const todolistComponents = todolists.map(tl => {
        return (
            <Grid key={tl.id}>
                <Paper sx={{p: "15px"}}>
                    <Todolist
                        id={tl.id}
                        title={tl.title}
                        tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                        deleteTask={deleteTask}
                        deleteTodolist={deleteTodolist}
                        filter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        changeFilter={changeFilter}
                        createTask={createTask}
                        deleteAllTasks={deleteAllTasks}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>

        )
    })

    const [darkMode, setDarkMode] = useState(false)

    const theme = createTheme({
        palette: {
            primary: pink,
            secondary: {
                main: '#ff80ab',
            },
            mode: darkMode ? "dark" : "light",
        },
    })

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar sx={containerSx}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Box>
                            <Switch onChange={()=>{setDarkMode(!darkMode)}}/>
                            <NavButton background={theme.palette.secondary.light}>Sign in</NavButton>
                            <NavButton>Sign up</NavButton>
                            <NavButton>FAQ</NavButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Grid container sx={{p: "15px 0"}}>
                        <CreateItemForm createItem={createTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolistComponents}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}
