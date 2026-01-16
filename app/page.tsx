import { TaskList } from "@/components/task-list"
import { CheckCircle2 } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <header className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">TaskEasy</h1>
          </div>
          <p className="text-muted-foreground">Gestiona tus tareas de forma simple y efectiva</p>
        </header>

        <TaskList />
      </div>
    </main>
  )
}
