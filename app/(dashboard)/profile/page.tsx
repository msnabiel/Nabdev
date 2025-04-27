import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/session"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import LeetCodeProfile from "@/components/leetcode-profile"

export const metadata = {
  title: "Profile",
}

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  // Fetching LeetCode stats for the user
  const baseUrl = `https://leetcode-api-03wd.onrender.com/${user.name}`
  const [
    profileRes,
    badgesRes,
    solvedRes,
    contestRes,
    submissionsRes,
    calendarRes
  ] = await Promise.all([
    fetch(baseUrl),
    fetch(`${baseUrl}/badges`),
    fetch(`${baseUrl}/solved`),
    fetch(`${baseUrl}/contest`),
    fetch(`${baseUrl}/submission?limit=5`),
    fetch(`${baseUrl}/calendar`)
  ])
  /*console.log('Profile Response:', profileRes);  // Add this line in your ProfilePage component where profileRes is used.
  console.log('Badges Response:', badgesRes);  // Add this line in your ProfilePage component where badgesRes is used.
  console.log('Solved Response:', solvedRes);  // Add this line in your ProfilePage component where solvedRes is used.
  console.log('Contest Response:', contestRes);  // Add this line in your ProfilePage component where contestRes is used.
  console.log('Submissions Response:', submissionsRes);  // Add this line in your ProfilePage component where submissionsRes is used.
  console.log('Calendar Response:', calendarRes);  // Add this line in your ProfilePage component where calendarRes is used.
  if (!profileRes.ok || !badgesRes.ok || !solvedRes.ok || !contestRes.ok || !submissionsRes.ok || !calendarRes.ok) {
    throw new Error("Failed to fetch LeetCode stats")
  }*/
    const handleResponse = async (res: Response) => {
      if (!res.ok) {
        if (res.status === 429) {
          return "N/A"; // Return "N/A" if rate-limited
        }
        throw new Error(`Failed to fetch data: ${res.statusText}`);
      }
      return res.json();
    }
  const [profile, badges, solved, contest, submissions, calendar] =
    await Promise.all([
      profileRes.json(),
      badgesRes.json(),
      solvedRes.json(),
      contestRes.json(),
      submissionsRes.json(),
      calendarRes.json()
    ])

  const stats = { profile, badges, solved, contest, submissions, calendar }
  console.log('Stats:', stats);  // Add this line in your ProfilePage component where stats is passed.

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Profile"
        text={`Manage your profile settings.`}
      />
      <div className="divide-y divide-border rounded-md border">
        <div className="p-4">
          <h2 className="text-xl font-semibold">Your Information</h2>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Name</p>
              <p className="text-sm text-muted-foreground">{user.name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">LeetCode Information</h2>
          {/* Pass the username and stats */}
          {user.name && <LeetCodeProfile username={user.name} stats={stats} error={null} />}
        </div>
      </div>
    </DashboardShell>
  )
}
