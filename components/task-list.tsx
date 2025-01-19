"use client"

import { useState } from "react"
import { Task } from "../types/task"
import { TaskForm } from "./task-form"
import { DeleteDialog } from "./delete-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, RefreshCw } from 'lucide-react'

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      assignedTo: "User 1",
      status: "Completed",
      dueDate: "2024-10-12",
      priority: "Low",
      comments: "This task is good"
    },
    // Add more sample tasks here
  ])

  const [search, setSearch] = useState("")
  const [taskFormOpen, setTaskFormOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [formMode, setFormMode] = useState<'new' | 'edit'>('new')

  const handleAddTask = (task: Partial<Task>) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
    } as Task
    setTasks([...tasks, newTask])
    setTaskFormOpen(false)
  }

  const handleEditTask = (task: Partial<Task>) => {
    setTasks(tasks.map(t => t.id === selectedTask?.id ? { ...t, ...task } : t))
    setTaskFormOpen(false)
    setSelectedTask(null)
  }

  const handleDeleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter(t => t.id !== selectedTask.id))
      setDeleteDialogOpen(false)
      setSelectedTask(null)
    }
  }

  const filteredTasks = tasks.filter(task =>
    task.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
    task.comments.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <div className="flex gap-2">
          <Button onClick={() => {
            setFormMode('new')
            setTaskFormOpen(true)
          }}>
            New Task
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Comments</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell>{task.comments}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      setSelectedTask(task)
                      setFormMode('edit')
                      setTaskFormOpen(true)
                    }}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => {
                        setSelectedTask(task)
                        setDeleteDialogOpen(true)
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TaskForm
        open={taskFormOpen}
        onClose={() => {
          setTaskFormOpen(false)
          setSelectedTask(null)
        }}
        onSubmit={formMode === 'new' ? handleAddTask : handleEditTask}
        task={selectedTask || undefined}
        mode={formMode}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false)
          setSelectedTask(null)
        }}
        onConfirm={handleDeleteTask}
        taskName={selectedTask?.assignedTo || ''}
      />
    </div>
  )
}

