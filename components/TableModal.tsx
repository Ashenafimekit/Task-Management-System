"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Task } from "@prisma/client";

// Define Zod schema for validation
const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["ToDo", "InProgress", "Done"]),
  dueDate: z.coerce.date().optional(),
});

const TaskModal = ({
  task,
  onClose,
}: {
  task?: Task | null;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("ToDo");
  const [dueDate, setDueDate] = useState("");

  const queryClient = useQueryClient();

  // Populate form when editing
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("ToDo"); 
      setDueDate("");
    }
  }, [task]);

  const mutation = useMutation({
    mutationFn: async (data: Omit<Task, "id"> & { id?: string }) => {
      if (task?.id) {
         const response = await axios.put(`/api/task/${String(task.id)}`, data);
         return response.data;
      } else {
        const response = await axios.post("/api/task", data);
        return response.data
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || "Task saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onClose();
    },
    onError: (data) => {
      toast.error(data.message || "Operation failed.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      taskSchema.parse({ title, description, status, dueDate });

      mutation.mutate({
        title,
        description: description || null,
        status,
        dueDate: dueDate ? new Date(dueDate) : null, 
        id: task?.id ? String(task.id) : undefined, 
      });
    } catch (error: any) {
      toast.error(error.errors[0].message);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white border-0 text-black">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label>Title</label>
            <Input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none"
            />
            <label>Description</label>
            <Input
              type="text"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-col">
            <label >Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task["status"])}
              className="border p-2 rounded"
            >
              <option value="ToDo">ToDo</option>
              <option value="InProgress">InProgress</option>
              <option value="Done">Done</option>
            </select>
            </div>
            <label>Due Date</label>
            <Input
              type="date"
              placeholder="Task Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <DialogFooter className="text-black mt-2">
            <DialogClose asChild>
              <Button className="bg-gray-500 hover:bg-gray-400">Cancel</Button>
            </DialogClose>

            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : task ? "Update Task" : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
