import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfileLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text="Loading profile..."
      />
      <div className="divide-y divide-border rounded-md border">
        <div className="p-4">
          <Skeleton className="h-5 w-48" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
