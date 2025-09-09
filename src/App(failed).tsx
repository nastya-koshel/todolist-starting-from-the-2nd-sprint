// export type FilterValue = 'all' | 'active' | 'completed'
//
// export type Todolist = {
//     id: string
//     title: string
//     filter: FilterValue[]
// }
//
// export type TasksState = {
//     [todolistId: string]: Task []
// }
//
// function App() {
//
//     const todolistId_1 = v1()
//     const todolistId_2 = v1()
//
//     const [todolists, setTodolists] = useState<Todolist[]>([
//         {id: todolistId_1, title: 'What to learn', filter: 'all'},
//         {id: todolistId_2, title: 'What to buy', filter: 'all'},
//     ])
//
//     const [tasks, setTasks] = useState<TasksState>({
//         [todolistId_1]: [
//             {id: v1(), title: "HTML", isDone: true},
//             {id: v1(), title: "CSS", isDone: false},
//             {id: v1(), title: "JS/TS", isDone: false},
//         ],
//         [todolistId_2]:
//             [
//                 {id: v1(), title: "Bread", isDone: true},
//                 {id: v1(), title: "Meet", isDone: false},
//                 {id: v1(), title: "Milk", isDone: false},
//             ]
//     })
//
//     //CRUD - Create Redact Update Delete
//
//     const deleteTask = (taskId: Task['id'], todolistId: Todolist["id"]) => {
//         const nextState = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
//         // const nextState = tasks.filter(t => t.id !== taskId)
//         setTasks(nextState);
//     }
//
//     const changeTaskStatus = (taskId: Task["id"], newTaskStatus: Task["isDone"]) => {
//         const nextState = tasks.map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
//
//         setTasks(nextState)
//     }
//
//     const changeFilter = (filter: FilterValues) => {
//         setFilter(filter)
//     }
//
//     let filteredTasks = tasks
//     if (filter === 'active') {
//         filteredTasks = tasks.filter(task => !task.isDone)
//     }
//     if (filter === 'completed') {
//         filteredTasks = tasks.filter(task => task.isDone)
//     }
//
//     const createTask = (title: string, todolistId: Todolist["id"]) => {
//         const newTask: Task = {id: v1(), title: title, isDone: false}
//         const newState = {...tasks, [todolistId]: [...tasks[todolistId], newTask]}
//         // const newState: TaskPropsType[] = [newTask, ...tasks]
//         setTasks(newState);
//
//         //краткая запись: setTasks([...tasks,{id:1, title:title, isDone: false}])
//     }
//
//     // const changeTaskStatus = (taskId: TaskPropsType["id"], newTaskStatus: TaskPropsType["isDone"], todolistId: Todolist["id"]) => {
//     //     const nextState = {
//     //         ...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: newTaskStatus} : t)
//     //     }
//     //     setTasks(nextState)
//     // }
//
//     // const [filter, setFilter] = useState<FilterValue>('all');
//     // const changeToDolistFilter = (filter: FilterValue, todolistId: Todolist["id"]) => {
//     //     const nextState: Todolist [] = todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl)
//     //     // setFilter(filter);
//     //     setTodolists(nextState)
//     // }
//
//     const deleteAllTasks = () => {
//         setTasks([])
//     }
//
//     // const deteleTodolist = (todolistId: Todolist["id"]) => {
//     //     const nextState: Todolist[]= todolists.filter(tl => tl.id !== todolistId)
//     //     setTodolists(nextState)
//     //     const copyTasksState = {...tasks}
//     //     delete copyTasksState[todolistId]
//     //     setTasks(copyTasksState)
//     // }
//
//     return (
//         <div className="app">
//             <Todolist
//                 title={TodolistTitle}
//                 tasks={filteredTasks}
//                 deleteTask={deleteTask}
//                 changeToDolistFilter={changeToDolistFilter}
//                 deleteAllTasks={deleteAllTasks}
//                 createTask={createTask}
//             />
//         </div>
//     )
// }
