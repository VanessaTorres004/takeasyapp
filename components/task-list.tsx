"use client"

import { useState } from "react"
import { TaskForm } from "./task-form"
import { TaskItem } from "./task-item"
import { ClipboardList } from "lucide-react"

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const updateTask = (id: string, title: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, title } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const pendingTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  return (
    <div className="space-y-6">
      <TaskForm onAddTask={addTask} />

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
          <ClipboardList className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <p className="text-lg font-medium text-muted-foreground">No hay tareas aún</p>
          <p className="text-sm text-muted-foreground/70">Crea tu primera tarea arriba</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingTasks.length > 0 && (
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {pendingTasks.length}
                </span>
                Pendientes
              </h2>
              <div className="space-y-2">
                {pendingTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </section>
          )}

          {completedTasks.length > 0 && (
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  {completedTasks.length}
                </span>
                Completadas
              </h2>
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={toggleTask}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
