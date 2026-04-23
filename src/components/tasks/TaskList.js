import React, {useEffect} from 'react';
import {useTask} from "../../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskList() {
    const {tasks, getTasks, loading} = useTask();

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    function renderTasks() {
        if (loading) {
            return <div className="panel">Cargando tareas...</div>;
        } else if (tasks.length === 0) {
            return <p className="panel">No hay tareas pendientes.</p>;
        } else {
            return (
                <div className="task-list">
                    {
                        tasks.map((task) => (
                            <TaskCard task={task} key = {task.id}/>
                        ))
                    }
                </div>
            );
        }
    }
    return renderTasks()
}

export default TaskList;
