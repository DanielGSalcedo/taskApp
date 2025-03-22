import {useTask} from "../context/TaskContext";

function TaskCard({task}) {

    const {deleteTask, deleting} = useTask();

    const handleDelete = () =>{
        deleteTask(task.id);
    }
    const handleToggleDone = () =>{
        alert("done");
    }
    return (
        <div>
            <h1>{task.name}</h1>
            <p>{JSON.stringify(task.done)}</p>
            <div>
                <button disabled={deleting} onClick={handleDelete}>
                    {deleting? "Deleting..." : "Delete"}
                </button>
                <button onClick={handleToggleDone}>
                    Done
                </button>
            </div>
        </div>
    );
}

export default TaskCard;