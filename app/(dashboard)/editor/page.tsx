import { DashboardShell } from "@/components/shell"
import { DashboardHeader } from "@/components/header"
import MonacoWrapper from "@/components/code-editor"

export default function EditorPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Code Editor" text="Write and test code here." />
      <MonacoWrapper />
    </DashboardShell>
  )
}
