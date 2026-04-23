import {useTask} from "../../context/TaskContext";

function TaskCard({task}) {

    const {deleteTask, deletingTaskId, toggleTaskDone, updatingTaskId} = useTask();
    const isDeleting = deletingTaskId === task.id;
    const isUpdating = updatingTaskId === task.id;
    const toggleLabel = isUpdating ? "Actualizando..." : task.done ? "Marcar como pendiente" : "Completar";

    const handleDelete = () =>{
        deleteTask(task.id);
    }
    const handleToggleDone = () =>{
        toggleTaskDone(task.id, task.done);
    }
    return (
        <article className="task-card">
            <h2>{task.name}</h2>
            <p>Estado: {task.done ? "Completada" : "Pendiente"}</p>
            <div className="task-card-actions">
                <button className="button button-danger" disabled={isDeleting} onClick={handleDelete}>
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                </button>
                <button className="button button-primary" disabled={isUpdating} onClick={handleToggleDone}>
                    {toggleLabel}
                </button>
            </div>
        </article>
    );
}

export default TaskCard;
