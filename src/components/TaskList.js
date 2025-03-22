import React, {useEffect} from 'react';
import {useTask} from "../context/TaskContext";
import TaskCard from "./TaskCard";

function TaskList() {
    const {tasks, getTasks, loading} = useTask();

    useEffect(() => {
        getTasks();
    }, []);

    function rederTasks() {
        if (loading) {
            return <div>Loading...</div>;
        }else if(tasks.length === 0) {
            return <p>No tasks found</p>;
        }else
        {
            return (
                <div>
                    {
                        tasks.map((task) => (
                            <TaskCard task={task} key = {task.id}/>
                        ))
                    }
                </div>
            );
        }
    }
    return rederTasks()
}

export default TaskList;