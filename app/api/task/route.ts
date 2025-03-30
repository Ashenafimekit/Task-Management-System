import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["ToDo", "InProgress", "Done"]).default("ToDo"),
  dueDate: z.coerce
    .date()
    .min(new Date(), "Due date must be in the future")
    .optional(),
});

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const task = await req.json();
    const validatedTask = {
      ...taskSchema.parse(task),
      dueDate: task.dueDate ? new Date(task.dueDate) : null, 
    };

    const newTask = await prisma.task.create({ data: validatedTask });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error(error); 

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors }, { status: 400 }); 
    }

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
