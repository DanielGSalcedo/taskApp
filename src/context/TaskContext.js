import {createContext, useCallback, useContext, useState} from "react";
import {client} from "../api/cliente";

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must be used within TaskContext");
    return context;
}
export const TaskContext = createContext(undefined);
export const TaskContextProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deletingTaskId, setDeletingTaskId] = useState(null);
    const [updatingTaskId, setUpdatingTaskId] = useState(null);

    const getTasks = useCallback(async (done = false) => {
        setLoading(true);
        try {
            const user = (await client.auth.getUser()).data.user;
            if (!user) {
                setTasks([]);
                return;
            }
            const {error, data} = await client.from("task").select().eq("user_id", user.id).eq("done",done).order("id",{ascending:true});
            if (error) throw error;
            setTasks(data ?? []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const createTask = async (taskName) => {
        if (!taskName.trim()) return;
        setAdding(true);
        try {
            const user = await client.auth.getUser();
            if (!user.data.user) return;
             await client.from("task").insert({
                 name: taskName,
                 user_id: user.data.user.id
            });
        await getTasks();
        } catch (error) {
            console.error(error);
        } finally {
            setAdding(false);
        }
    }
    const deleteTask = async (id) => {
        setDeletingTaskId(id);
        try {
            const user = (await client.auth.getUser()).data.user;
            if (!user) return;
            await client.from("task").delete().eq("user_id", user.id).eq("id",id);
        } catch (error) {
            console.error(error);
        } finally {
            await getTasks();
            setDeletingTaskId(null);
        }
    }

    const toggleTaskDone = async (id, done) => {
        setUpdatingTaskId(id);
        try {
            const user = (await client.auth.getUser()).data.user;
            if (!user) return;
            await client.from("task").update({done: !done}).eq("user_id", user.id).eq("id", id);
        } catch (error) {
            console.error(error);
        } finally {
            await getTasks();
            setUpdatingTaskId(null);
        }
    }
    return <TaskContext.Provider value={{tasks, getTasks, createTask, adding, setAdding, loading, deleteTask, deletingTaskId, toggleTaskDone, updatingTaskId}}>
        {children}
    </TaskContext.Provider>
}
