"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import TableModal from "./TableModal";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, Pencil } from "lucide-react";

type TaskStatus = "ToDo" | "InProgress" | "Done";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: Date;
};

const getStatusStyle = (status: TaskStatus) => {
  switch (status) {
    case "ToDo":
      return "bg-yellow-200 text-yellow-800";
    case "InProgress":
      return "bg-blue-200 text-blue-800";
    case "Done":
      return "bg-green-200 text-green-800";
    default:
      return "";
  }
};

const TaskTable = ({ data }: { data: Task[] }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(0);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();


  const deleteMutation = useMutation({
    mutationFn: async (taskId: number) => {
      await axios.delete(`/api/task/${taskId}`);
    },
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Failed to delete task.");
    },
  });

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: "title",
      header: "Title",
      enableSorting: true,
    },
    {
      accessorKey: "description",
      header: "Description",
      enableSorting: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: true,
      cell: ({ row }) => {
        const task = row.original;
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
              task.status
            )}`}
          >
            {task.status}
          </span>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      enableSorting: true,
      cell: ({ row }) =>
        row.original.dueDate
          ? new Date(row.original.dueDate).toLocaleDateString()
          : "No Due Date",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const task = row.original;
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              className="text-black hover:bg-yellow-400 shadow-md"
              onClick={() => {
                setEditingTask(task);
                setIsModalOpen(true);
              }}
            >
              Edit{" "}
              <span className="text-yellow-500 hover:text-black">
                <Pencil />
              </span>
            </Button>

            <Button
              className="text-black  hover:bg-red-400"
              onClick={() => deleteMutation.mutate(Number(task.id))}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
              <span className="text-red-500 hover:text-black">  
                <Trash2 />
              </span>
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      pagination: { pageIndex, pageSize },
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: (updater) => {
      setPageIndex((prev) => {
        const newState =
          typeof updater === "function"
            ? updater({ pageIndex: prev, pageSize })
            : updater;
        return newState.pageIndex;
      });
    },
  });

  return (
    <div className="flex flex-col p-6 sm:p-4 md:px-20 md:py-10">
      <h1 className="text-2xl font-bold self-center">Task Management</h1>

      <div className="flex-1 my-4">
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search tasks..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-1/2 border rounded-lg p-1 outline-none"
          />
        </div>
      </div>

      <div className="flex self-start mb-2">
        <Button
          className="bg-blue-600 hover:bg-blue-500 px-10"
          onClick={() => {
            setEditingTask(null);
            setIsModalOpen(true);
          }}
        >
          Add Task
        </Button>
      </div>

      {/* Mobile-Friendly Card View */}
      <div className="sm:hidden">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="border p-4 mb-2 rounded-lg shadow-md bg-white"
          >
            <p>
              <strong>Title:</strong> {row.getValue("title")}
            </p>
            <p>
              <strong>Description:</strong> {row.getValue("description") || "N/A"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                row.getValue("status")
              )}`}>
                {row.getValue("status")}
              </span>
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {row.getValue("dueDate") ? new Date(row.getValue("dueDate") as string).toLocaleDateString() : "No Due Date"}
            </p>
            <div className="flex gap-2 mt-2">
              <Button
                className="text-black hover:border"
                onClick={() => {
                  setEditingTask(row.original);
                  setIsModalOpen(true);
                }}
              >
                Edit <Pencil className="text-yellow-500 ml-1" />
              </Button>
              <Button
                className="text-black hover:border"
                onClick={() => deleteMutation.mutate(Number(row.original.id))}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
                <Trash2 className="text-red-500 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto hidden sm:block">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                    {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                    {!header.column.getIsSorted() ? " ↕" : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TableModal
          task={
            editingTask
              ? {
                  ...editingTask,
                  description: editingTask.description ?? null,
                  dueDate: editingTask.dueDate ?? null,
                }
              : null
          }
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskTable;
