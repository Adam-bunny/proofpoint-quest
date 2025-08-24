import { useState } from "react";
import { Layout } from "@/components/Layout";
import { TaskCard } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, FileText } from "lucide-react";

// Mock data
const mockTasks = [
  {
    id: "1",
    title: "Create User Onboarding Video",
    description: "Design and produce a comprehensive video tutorial for new users covering all key features",
    category: "Content Creation",
    status: "approved" as const,
    createdAt: new Date("2025-08-23"),
    pointsEarned: 45
  },
  {
    id: "2", 
    title: "Bug Report: Submit Button Not Working",
    description: "Detailed analysis and reproduction steps for form submission issue in the dashboard",
    category: "Bug Report",
    status: "approved" as const,
    createdAt: new Date("2025-08-22"),
    pointsEarned: 25
  },
  {
    id: "3",
    title: "Market Research Analysis",
    description: "Comprehensive analysis of competitor features and user feedback from social media platforms",
    category: "Research",
    status: "pending" as const,
    createdAt: new Date("2025-08-24")
  },
  {
    id: "4",
    title: "Documentation Update",
    description: "Updated API documentation with new endpoint specifications",
    category: "Documentation",
    status: "rejected" as const,
    createdAt: new Date("2025-08-21")
  },
  {
    id: "5",
    title: "UI/UX Design Improvements",
    description: "Created new mockups for the dashboard interface with improved user experience",
    category: "Design",
    status: "approved" as const,
    createdAt: new Date("2025-08-20"),
    pointsEarned: 35
  }
];

const MyTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusCounts = () => {
    return {
      all: mockTasks.length,
      pending: mockTasks.filter(t => t.status === "pending").length,
      approved: mockTasks.filter(t => t.status === "approved").length,
      rejected: mockTasks.filter(t => t.status === "rejected").length
    };
  };

  const statusCounts = getStatusCounts();
  const categories = [...new Set(mockTasks.map(task => task.category))];

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-card-foreground">My Tasks</h1>
          <p className="text-muted-foreground text-lg">
            View and manage all your submitted tasks
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-card rounded-lg p-4 border shadow-soft">
            <p className="text-sm text-muted-foreground">Total Tasks</p>
            <p className="text-2xl font-bold text-card-foreground">{statusCounts.all}</p>
          </div>
          <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
            <p className="text-sm text-warning-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning-foreground">{statusCounts.pending}</p>
          </div>
          <div className="bg-success/10 rounded-lg p-4 border border-success/20">
            <p className="text-sm text-success-foreground">Approved</p>
            <p className="text-2xl font-bold text-success-foreground">{statusCounts.approved}</p>
          </div>
          <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/20">
            <p className="text-sm text-destructive-foreground">Rejected</p>
            <p className="text-2xl font-bold text-destructive-foreground">{statusCounts.rejected}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="bg-gradient-primary">
            <FileText className="w-4 h-4 mr-2" />
            Submit New Task
          </Button>
        </div>

        {/* Active Filters */}
        {(statusFilter !== "all" || categoryFilter !== "all" || searchTerm) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter("all")}>×</button>
              </Badge>
            )}
            {categoryFilter !== "all" && (
              <Badge variant="secondary" className="gap-1">
                Category: {categoryFilter}
                <button onClick={() => setCategoryFilter("all")}>×</button>
              </Badge>
            )}
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")}>×</button>
              </Badge>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setStatusFilter("all");
                setCategoryFilter("all");
                setSearchTerm("");
              }}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Tasks Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-card-foreground">
              {filteredTasks.length} Task{filteredTasks.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No tasks found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                  ? "Try adjusting your filters or search terms"
                  : "You haven't submitted any tasks yet"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyTasks;