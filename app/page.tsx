"use client"

import { useState } from "react"
import { TaskTable } from "@/components/task-table"
import { TaskFormDialog } from "@/components/task-form-dialog"
import { DeleteTaskDialog } from "@/components/delete-task-dialog"
import { Task } from "@/types/task"

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      assignedTo: "User 1",
      status: "Completed",
      dueDate: "2024-10-12",
      priority: "Low",
      comments: "This task is good"
    },
    {
      id: "2",
      assignedTo: "User 2",
      status: "In Progress",
      dueDate: "2024-09-14",
      priority: "High",
      comments: "This task is important"
    },
    {
      id: "3",
      assignedTo: "User 3",
      status: "Not Started",
      dueDate: "2024-08-18",
      priority: "Low",
      comments: "This task can wait"
    },
    {
      id: "4",
      assignedTo: "User 4",
      status: "In Progress",
      dueDate: "2024-06-12",
      priority: "Normal",
      comments: "This task is ongoing"
    }
  ])

  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [formMode, setFormMode] = useState<"new" | "edit">("new")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleNewTask = () => {
    setSelectedTask(null)
    setFormMode("new")
    setTaskFormOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setFormMode("edit")
    setTaskFormOpen(true)
  }

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(task)
    setDeleteDialogOpen(true)
  }

  const handleSubmitTask = (taskData: Omit<Task, 'id'>) => {
    if (formMode === "new") {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString()
      }
      setTasks([...tasks, newTask])
    } else if (formMode === "edit" && selectedTask) {
      setTasks(tasks.map(task => 
        task.id === selectedTask.id ? { ...task, ...taskData } : task
      ))
    }
    setTaskFormOpen(false)
  }

  const handleConfirmDelete = () => {
    if (selectedTask) {
      setTasks(tasks.filter(task => task.id !== selectedTask.id))
      setDeleteDialogOpen(false)
    }
  }

  return (
    <main className="container mx-auto p-4">
      <TaskTable
        tasks={tasks}
        onNewTask={handleNewTask}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <TaskFormDialog
        open={taskFormOpen}
        onOpenChange={setTaskFormOpen}
        onSubmit={handleSubmitTask}
        task={selectedTask || undefined}
        mode={formMode}
      />
      <DeleteTaskDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        taskName={selectedTask?.assignedTo || ""}
      />
    </main>
  )
}

