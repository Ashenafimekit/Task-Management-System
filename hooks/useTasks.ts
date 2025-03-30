import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTasks =async()=>{
    const res = await axios.get("https://jsonplaceholder.typicode.com/users")
    return res.data
}

export const useTasks = ()=>{
    return useQuery({ queryKey: ["tasks"], queryFn: fetchTasks })
}