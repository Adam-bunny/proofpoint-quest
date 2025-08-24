import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: "increase" | "decrease" | "neutral";
    period: string;
  };
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "bronze" | "silver" | "gold";
}

export function StatCard({ title, value, change, icon, variant = "default" }: StatCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-gradient-success text-success-foreground shadow-soft";
      case "warning":
        return "bg-warning text-warning-foreground shadow-soft";
      case "bronze":
        return "bg-bronze text-white shadow-soft";
      case "silver":
        return "bg-silver text-white shadow-soft";
      case "gold":
        return "bg-gold text-gold-foreground shadow-soft";
      default:
        return "bg-gradient-card shadow-soft hover:shadow-medium transition-shadow duration-200";
    }
  };

  const getChangeIcon = () => {
    if (!change) return null;
    
    switch (change.type) {
      case "increase":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "decrease":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getChangeColor = () => {
    if (!change) return "";
    
    switch (change.type) {
      case "increase":
        return "text-success";
      case "decrease":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={`border-0 ${getVariantClasses()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium opacity-90">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center gap-1 text-sm">
                {getChangeIcon()}
                <span className={getChangeColor()}>
                  {change.type === "increase" ? "+" : change.type === "decrease" ? "-" : ""}
                  {Math.abs(change.value)}% {change.period}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="opacity-60">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}