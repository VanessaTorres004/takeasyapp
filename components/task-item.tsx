"use client"

import type React from "react"
import { useState } from "react"
import type { Task } from "./task-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Pencil, Trash2, X } from "lucide-react"

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, editTitle.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div
      className={`group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md ${
        task.completed ? "border-accent/20 bg-accent/5" : "border-border"
      }`}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className={`h-5 w-5 rounded-full border-2 transition-colors ${
          task.completed ? "border-accent bg-accent text-accent-foreground" : "border-muted-foreground/30"
        }`}
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-9 flex-1 rounded-lg border-primary/30 bg-background text-base focus:border-primary"
            autoFocus
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSave}
            className="h-8 w-8 text-accent hover:bg-accent/10 hover:text-accent"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCancel}
            className="h-8 w-8 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
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
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
