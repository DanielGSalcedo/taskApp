import {useTask} from "../../context/TaskContext";
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
        <section className="panel">
            <h2>Nueva tarea</h2>
            <form className="task-form" onSubmit={handleSubmit}>
                <label htmlFor="taskName">Nombre</label>
                <input id="taskName" type="text" placeholder="Escribe tu tarea..."
                       onChange={(e) => setTaskName(e.target.value)}
                       value={taskName}
                />
                <button className="button button-primary" disabled={adding}>{adding? "Agregando...":"Agregar"}</button>
            </form>
        </section>
    );
}

export default TaskForm;
