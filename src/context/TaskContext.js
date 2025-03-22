import {createContext, useContext, useState} from "react";
import {client} from "../api/cliente";

export const useTask = () => {
    if (!useContext(TaskContext)) throw new Error("useTasks must be used within TaskContext");
    return useContext(TaskContext);
}
export const TaskContext = createContext(this);
export const TaskContextProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const [adding, setAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const getTasks = async (done = false) => {

        setLoading(true);
        const user = (await client.auth.getUser()).data.user;
        console.log(user);
        const {error, data} = await client.from("task").select().eq("user_id", user.id).eq("done",done).order("id",{ascending:true});
        console.log(data);
        if (error) throw error;
        setTasks(data);
        setLoading(false);
    }

    const createTask = async (taskName) => {
        setAdding(true);
        try {
            const user = await client.auth.getUser();
             await client.from("task").insert({
                name: taskName,
                user_id: user.data.user.id
            });
        await getTasks();
        } catch (error) {
            console.log(error);
        } finally {
            setAdding(false);
        }
    }
    const deleteTask = async (id) => {
        setDeleting(true);
        try {
            const user = (await client.auth.getUser()).data.user;
            await client.from("task").delete().eq("user_id", user.id).eq("id",id);
        }catch (error) {
            console.log(error);
        }
        await getTasks();
        setDeleting(false);
    }
    return <TaskContext.Provider value={{tasks, getTasks, createTask, adding, setAdding, loading, deleteTask, deleting}}>
        {children}
    </TaskContext.Provider>
}