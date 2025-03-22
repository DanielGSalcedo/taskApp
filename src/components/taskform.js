import {useTask} from "../context/TaskContext";
import {useState} from "react";

function TaskForm() {
    const [taskName, setTaskName] = useState("");
    const {createTask, adding} = useTask();

    const handleSubmit = async (e) => {
        e.preventDefault();
        createTask(taskName);
        setTaskName("");
    }
    return (
        <div> taskForm
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">name</label>
                <input type="text" placeholder="task name here"
                       onChange={(e) => setTaskName(e.target.value)}
                       value={taskName}
                />
                <button disabled={adding}>{adding? "Adding...":"Add"}</button>
            </form>
        </div>
    );
}

export default TaskForm;