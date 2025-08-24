import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, Calendar, Award } from "lucide-react";
import { format } from "date-fns";

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  pointsEarned?: number;
}

export function TaskCard({ 
  title, 
  description, 
  category, 
  status, 
  createdAt, 
  pointsEarned 
}: TaskCardProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "approved":
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          badge: "Approved",
          badgeVariant: "default" as const,
          bgClass: "bg-gradient-success text-success-foreground"
        };
      case "rejected":
        return {
          icon: <XCircle className="w-5 h-5" />,
          badge: "Rejected",
          badgeVariant: "destructive" as const,
          bgClass: "bg-destructive text-destructive-foreground"
        };
      default:
        return {
          icon: <Clock className="w-5 h-5" />,
          badge: "Pending",
          badgeVariant: "secondary" as const,
          bgClass: "bg-warning text-warning-foreground"
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <Card className="hover:shadow-medium transition-all duration-200 border shadow-soft">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <h3 className="font-semibold text-lg text-card-foreground line-clamp-2">
                {title}
              </h3>
              {description && (
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {description}
                </p>
              )}
            </div>
            <div className={`p-2 rounded-lg ${statusConfig.bgClass} ml-4`}>
              {statusConfig.icon}
            </div>
          </div>

          {/* Category and Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="font-medium">
              {category}
            </Badge>
            <Badge variant={statusConfig.badgeVariant} className="font-medium">
              {statusConfig.badge}
            </Badge>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {format(createdAt, "MMM dd, yyyy")}
            </div>
            {status === "approved" && pointsEarned && (
              <div className="flex items-center gap-1 text-sm font-semibold text-success">
                <Award className="w-4 h-4" />
                +{pointsEarned} pts
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}