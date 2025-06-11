import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["ToDo", "InProgress", "Done"]).default("ToDo"),
  dueDate: z.coerce
    .date()
    .min(new Date(), "due date must be future")
    .optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: id },
    });
    if (!task) {
      return NextResponse.json({ error: "task not found" }, { status: 404 });
    }
    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json({ error: "Error fetching task" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;

    const task = await request.json();

    if (task.dueDate) {
      task.dueDate = new Date(task.dueDate);
    }

    const validatedTask = taskSchema.partial().parse(task);

    const isTask = await prisma.task.findUnique({
      where: { id: taskId.toString() },
    });

    if (!isTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: taskId.toString() },
      data: validatedTask,
    });

    return NextResponse.json(
      { message: "Task updated successfully", task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.task.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "task deleted" }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json({ message: "Task not found" }, { status: 400 });
  }
}
