import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar" // Import Avatar components from ShadCN
import { Button } from "@/components/ui/button" // ShadCN button component
import { Card, CardContent, CardHeader } from "@/components/ui/card" // ShadCN card components
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip" // Optional: if you want tooltips
import Image from "next/image"

interface LeetCodeStats {
  profile: {
    username: string;
    name: string;
    avatar: string;
    ranking: number;
    reputation: number;
    gitHub: string;
    linkedIN: string;
    website: string[];
    [key: string]: any;
  };
  badges: {
    badgesCount: number;
    badges: any[];
    upcomingBadges: any[];
    activeBadge: {
      id: string;
      displayName: string;
      icon: string;
      creationDate: string;
    };
  };
  solved: {
    solvedProblem: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    totalSubmissionNum: any[];
    acSubmissionNum: any[];
  };
  contest: {
    contestParticipation: any[];
  };
  submissions: {
    count: number;
    submission: any[];
  };
  calendar: {
    submissionCalendar: string;
  };
}

interface LeetCodeProfileProps {
  username: string;
  stats: LeetCodeStats | null;
  error: string | null;
}

export default function LeetCodeProfile({ username, stats, error }: LeetCodeProfileProps) {
  if (error) {
    return (
      <p className="text-sm text-muted-foreground">
        Unable to load LeetCode profile
      </p>
    )
  }

  if (!stats || !stats.profile) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Profile Overview */}
      <div className="flex items-center space-x-4">
        {stats.profile.avatar && (
          <Avatar>
            <AvatarImage
              src={stats.profile.avatar}
              alt={`${stats.profile.name || username}'s avatar`}
            />
            <AvatarFallback>{stats.profile.name ? stats.profile.name[0] : 'U'}</AvatarFallback>
          </Avatar>
        )}
        <div>
          <h3 className="text-xl font-bold">{stats.profile.name || username}</h3>
          <p className="text-sm text-muted-foreground">Ranking: {stats.profile.ranking?.toLocaleString() || 'N/A'}</p>
          <div className="space-x-2">
            {stats.profile.gitHub && (
              <a href={stats.profile.gitHub} target="_blank" rel="noopener noreferrer">
                <Button className="text-sm">
                  GitHub
                </Button>
              </a>
            )}
            {stats.profile.linkedIN && (
              <Button asChild>
                <a href={stats.profile.linkedIN} target="_blank" rel="noopener noreferrer" className="text-sm">
                  LinkedIn
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Problem Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <div className="text-sm font-medium">Total Solved</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.solved.solvedProblem}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-sm font-medium">Easy</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.solved.easySolved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-sm font-medium">Medium</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.solved.mediumSolved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="text-sm font-medium">Hard</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{stats.solved.hardSolved}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Badge */}
      {stats.badges.activeBadge && (
        <Card>
          <CardHeader>
            <h3 className="mb-4 text-lg font-medium">Active Badge</h3>
          </CardHeader>
          <CardContent className="flex items-center space-x-2">
            <Image
              src={stats.badges.activeBadge.icon}
              alt={stats.badges.activeBadge.displayName}
              width={40}
              height={40}
            />
            <div>
              <p className="font-medium">{stats.badges.activeBadge.displayName}</p>
              <p className="text-sm text-muted-foreground">Earned on {new Date(stats.badges.activeBadge.creationDate).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Submissions */}
      <Card>
        <CardHeader>
          <h3 className="mb-4 text-lg font-medium">Recent Submissions</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.submissions.submission && stats.submissions.submission.length > 0 ? (
              stats.submissions.submission.map((sub: any, index: number) => (
                <div key={index} className="flex items-center justify-between border-b py-2 last:border-b-0">
                  <span className="text-sm font-medium">{sub.title || 'Unknown Problem'}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span className={`rounded px-2 py-1 text-sm ${
                          sub.statusDisplay === 'Accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {sub.statusDisplay || 'Unknown Status'}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {sub.statusDisplay || 'Unknown Status'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent submissions</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calendar Heatmap */}
      <Card>
        <CardHeader>
          <h3 className="mb-4 text-lg font-medium">Submission Activity</h3>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Total submissions in the last year: {
              Object.values(JSON.parse(stats.calendar.submissionCalendar || '{}') as Record<string, number>)
                .reduce((sum: number, val) => sum + val, 0)
                .toString()
            }
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
