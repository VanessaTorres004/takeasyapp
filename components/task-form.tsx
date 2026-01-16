"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"

interface TaskFormProps {
  onAddTask: (title: string) => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        type="text"
        placeholder="¿Qué necesitas hacer?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="h-12 flex-1 rounded-xl border-border bg-card px-4 text-base shadow-sm transition-shadow focus:shadow-md"
      />
      <Button
        type="submit"
        disabled={!title.trim()}
        className="h-12 gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50"
      >
        <Plus className="h-5 w-5" />
        Agregar
      </Button>
    </form>
  )
}
