"use client"

import { useState, useEffect } from "react"
import { TaskForm } from "./task-form"
import { TaskItem } from "./task-item"
import { ClipboardList, ListTodo, CheckCircle } from "lucide-react"

// Modelo de datos según especificación
export interface Task {
  id: number
  title: string
  completed: boolean
}

// Clave para LocalStorage
const STORAGE_KEY = "taskeasy-tasks"

// Sprint 5: Funciones de persistencia con LocalStorage
const loadTasksFromStorage = (): Task[] => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveTasksToStorage = (tasks: Task[]) => {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Sprint 5: Recuperación automática de tareas al cargar
  useEffect(() => {
    const storedTasks = loadTasksFromStorage()
    setTasks(storedTasks)
    setIsLoaded(true)
  }, [])

  // Sprint 5: Guardar tareas cuando cambian
  useEffect(() => {
    if (isLoaded) {
      saveTasksToStorage(tasks)
    }
  }, [tasks, isLoaded])

  // Sprint 2: Crear nueva tarea
  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(), // ID numérico único
      title,
      completed: false,
    }
    setTasks((prev) => [newTask, ...prev])
  }

  // Sprint 4: Marcar tarea como completada
  const toggleTask = (id: number) => {
    setTasks((prev) => 
      prev.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Sprint 3: Editar título de tarea
  const updateTask = (id: number, title: string) => {
    setTasks((prev) => 
      prev.map((task) => 
        task.id === id ? { ...task, title } : task
      )
    )
  }

  // Eliminar tarea
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  // Sprint 4: Separar tareas pendientes y completadas
  const pendingTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  // Mostrar skeleton mientras carga
  if (!isLoaded) {
    return (
      <div className="space-y-6">
        <div className="h-12 animate-pulse rounded-xl bg-muted" />
        <div className="h-32 animate-pulse rounded-xl bg-muted" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sprint 4: Contador de tareas pendientes y completadas */}
      <div className="flex items-center justify-center gap-6 rounded-xl bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <ListTodo className="h-5 w-5 text-primary" />
          <span className="text-sm text-muted-foreground">Pendientes:</span>
          <span className="font-bold text-primary">{pendingTasks.length}</span>
        </div>
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-accent" />
          <span className="text-sm text-muted-foreground">Completadas:</span>
          <span className="font-bold text-accent">{completedTasks.length}</span>
        </div>
      </div>

      {/* Sprint 2: Formulario para crear tareas */}
      <TaskForm onAddTask={addTask} />

      {/* Sprint 2: Listado de tareas */}
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
          <ClipboardList className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <p className="text-lg font-medium text-muted-foreground">No hay tareas aún</p>
          <p className="text-sm text-muted-foreground/70">Crea tu primera tarea arriba</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Tareas pendientes */}
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

          {/* Sprint 4: Tareas completadas con diferenciación visual */}
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
