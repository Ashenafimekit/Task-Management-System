"use client";
import TaskTable from "@/components/TaskTable";
import { useQuery } from "@tanstack/react-query";
import {Loader} from "lucide-react"


const fetchTasks = async () => {
  const res = await fetch("/api/task");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

const TaskPage = () => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading)
    return (
      <p className="flex items-center justify-center h-screen animate-spin">
        <Loader />
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <TaskTable data={tasks} />
    </div>
  );
};

export default TaskPage;
