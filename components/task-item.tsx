"use client"

import type React from "react"
import { useState } from "react"
import type { Task } from "./task-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Pencil, Trash2, X, AlertCircle } from "lucide-react"

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onUpdate: (id: number, title: string) => void
  onDelete: (id: number) => void
}

// Sprint 3: Edición del contenido con validación
// Sprint 4: Diferenciación visual de tareas completadas
export function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    // Validación al editar
    if (!editTitle.trim()) {
      setError("El título no puede estar vacío")
      return
    }
    if (editTitle.trim().length < 3) {
      setError("El título debe tener al menos 3 caracteres")
      return
    }
    
    onUpdate(task.id, editTitle.trim())
    setIsEditing(false)
    setError(null)
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setIsEditing(false)
    setError(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value)
    if (error) setError(null)
  }

  return (
    <div
      className={`group flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md ${
        task.completed ? "border-accent/20 bg-accent/5" : "border-border"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Sprint 4: Checkbox para marcar como completada */}
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className={`h-5 w-5 rounded-full border-2 transition-colors ${
            task.completed ? "border-accent bg-accent text-accent-foreground" : "border-muted-foreground/30"
          }`}
          aria-label={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
        />

        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <Input
              type="text"
              value={editTitle}
              onChange={handleEditChange}
              onKeyDown={handleKeyDown}
              className={`h-9 flex-1 rounded-lg border-primary/30 bg-background text-base focus:border-primary ${
                error ? "border-destructive" : ""
              }`}
              autoFocus
              aria-invalid={!!error}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={handleSave}
              className="h-8 w-8 text-accent hover:bg-accent/10 hover:text-accent"
              aria-label="Guardar cambios"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCancel}
              className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Cancelar edición"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            {/* Sprint 4: Diferenciación visual - texto tachado para completadas */}
            <span
              className={`flex-1 text-base transition-colors ${
                task.completed ? "text-muted-foreground line-through" : "text-foreground"
              }`}
            >
              {task.title}
            </span>

            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                aria-label="Editar tarea"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(task.id)}
                className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                aria-label="Eliminar tarea"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
      
      {/* Mensaje de error en edición */}
      {error && isEditing && (
        <div 
          className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-1.5 text-xs text-destructive"
          role="alert"
        >
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
