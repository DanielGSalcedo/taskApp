import React, {useEffect} from 'react';
import {useTask} from "../context/TaskContext";

function TaskList() {
    const {tasks, getTasks} = useTask();

    useEffect(() => {
        getTasks();
    }, []);
    return (
        <div>{
            tasks.map((task, index) => (
                <div key={task.id}>
                <h1>{index+" "+task.name}</h1>
                <p>{JSON.stringify(task.done)}</p>
                </div>
            ))
        }
        </div>
    );
}

export default TaskList;