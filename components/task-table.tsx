"use client"

import { useState } from "react"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Task } from "@/types/task"

interface TaskTableProps {
  tasks: Task[];
  onNewTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export function TaskTable({ tasks, onNewTask, onEditTask, onDeleteTask }: TaskTableProps) {
  const [search, setSearch] = useState("")

  const filteredTasks = tasks.filter(task => 
    task.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
    task.comments.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-pink-600">
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl text-pink-600">Tasks</h1>
            <p className="text-sm text-muted-foreground">All Tasks</p>
            <p className="text-sm text-muted-foreground">{tasks.length} records</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onNewTask}>New Task</Button>
          <Button variant="secondary">Refresh</Button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <Input 
            placeholder="Search" 
            className="max-w-xs" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="w-6 p-3">
                  <Checkbox />
                </th>
                <th className="p-3 text-left">Assigned To</th>
                <th className="p-3 text-left">sdvdf</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Comments</th>
                <th className="p-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="p-3">
                    <Checkbox />
                  </td>
                  <td className="p-3 text-blue-600">{task.assignedTo}</td>
                  <td className="p-3">{task.status}</td>
                  <td className="p-3">{task.dueDate}</td>
                  <td className="p-3">{task.priority}</td>
                  <td className="p-3">{task.comments}</td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onEditTask(task)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => onDeleteTask(task)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <select className="border rounded px-2 py-1">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon">
              <ChevronFirst className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="px-4">
              1
            </Button>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ChevronLast className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

