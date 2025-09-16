import {FilterValuesType, TaskType } from "./types.tsx";

export const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType) => {
    return filter === 'active'
        ? tasks.filter (t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks
}