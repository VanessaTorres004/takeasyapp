"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, AlertCircle } from "lucide-react"

interface TaskFormProps {
  onAddTask: (title: string) => void
}

// Sprint 2: Formulario para crear tareas
// Sprint 3: Validación para evitar tareas vacías con mensajes de error
export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validación: evitar tareas vacías
    if (!title.trim()) {
      setError("El título de la tarea no puede estar vacío")
      return
    }
    
    // Validación: longitud mínima
    if (title.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres")
      return
    }

    onAddTask(title.trim())
    setTitle("")
    setError(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    // Limpiar error cuando el usuario empieza a escribir
    if (error) setError(null)
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          type="text"
          placeholder="¿Qué necesitas hacer?"
          value={title}
          onChange={handleChange}
          className={`h-12 flex-1 rounded-xl border-border bg-card px-4 text-base shadow-sm transition-shadow focus:shadow-md ${
            error ? "border-destructive focus:ring-destructive" : ""
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? "task-error" : undefined}
        />
        <Button
          type="submit"
          className="h-12 gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
        >
          <Plus className="h-5 w-5" />
          Agregar
        </Button>
      </form>
      
      {/* Mensaje de error claro para el usuario */}
      {error && (
        <div 
          id="task-error" 
          className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
