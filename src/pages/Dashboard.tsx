import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { TaskCard } from "@/components/TaskCard";
import { 
  Trophy, 
  Target, 
  CheckCircle, 
  Star,
  Plus,
  ArrowRight
} from "lucide-react";

// Mock data
const mockTasks = [
  {
    id: "1",
    title: "Create User Onboarding Video",
    description: "Design and produce a comprehensive video tutorial for new users",
    category: "Content Creation",
    status: "approved" as const,
    createdAt: new Date("2025-08-23"),
    pointsEarned: 45
  },
  {
    id: "2", 
    title: "Bug Report: Submit Button Not Working",
    description: "Detailed analysis and reproduction steps for form submission issue",
    category: "Bug Report",
    status: "approved" as const,
    createdAt: new Date("2025-08-22"),
    pointsEarned: 25
  },
  {
    id: "3",
    title: "Market Research Analysis",
    description: "Comprehensive analysis of competitor features and user feedback",
    category: "Research",
    status: "pending" as const,
    createdAt: new Date("2025-08-24")
  }
];

const Dashboard = () => {
  const approvedTasks = mockTasks.filter(task => task.status === "approved");
  const totalPoints = approvedTasks.reduce((sum, task) => sum + (task.pointsEarned || 0), 0);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-card-foreground">
          Welcome back, <span className="text-primary">bunny!</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Track your progress and manage your tasks in the ProofWork Hub
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Points"
          value={totalPoints}
          change={{
            value: 15,
            type: "increase",
            period: "this month"
          }}
          icon={<Trophy className="w-8 h-8" />}
          variant="success"
        />
        <StatCard
          title="Tasks Submitted"
          value={mockTasks.length}
          change={{
            value: 2,
            type: "increase", 
            period: "this week"
          }}
          icon={<Target className="w-8 h-8" />}
        />
        <StatCard
          title="Approved Tasks"
          value={approvedTasks.length}
          icon={<CheckCircle className="w-8 h-8" />}
          variant="success"
        />
        <StatCard
          title="Current Level"
          value="Bronze"
          icon={<Star className="w-8 h-8" />}
          variant="bronze"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Quick Actions</h2>
          <p className="text-muted-foreground">Get started with your next task</p>
        </div>
        <Button 
          size="lg" 
          className="bg-gradient-primary hover:shadow-glow transition-all duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Submit New Task
        </Button>
      </div>

      {/* Recent Tasks */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">Recent Tasks</h2>
            <p className="text-muted-foreground">Your latest submissions and their status</p>
          </div>
          <Button variant="outline" className="gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockTasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))}
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-gradient-card rounded-lg p-8 border shadow-soft">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-card-foreground">Keep up the great work!</h3>
            <p className="text-muted-foreground">
              You're {30 - totalPoints} points away from reaching Silver level
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-gradient-primary h-3 rounded-full transition-all duration-500" 
              style={{ width: `${(totalPoints / 100) * 100}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {totalPoints} / 100 points to Silver
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;