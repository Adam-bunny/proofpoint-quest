import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Crown, TrendingUp } from "lucide-react";

// Mock leaderboard data
const leaderboardData = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/api/placeholder/40/40",
    points: 1250,
    level: "Gold",
    tasksCompleted: 45,
    rank: 1,
    badgeColor: "gold",
    monthlyGain: 180
  },
  {
    id: "2", 
    name: "Alex Chen",
    avatar: "/api/placeholder/40/40",
    points: 980,
    level: "Silver", 
    tasksCompleted: 32,
    rank: 2,
    badgeColor: "silver",
    monthlyGain: 140
  },
  {
    id: "3",
    name: "Maria Garcia",
    avatar: "/api/placeholder/40/40", 
    points: 875,
    level: "Silver",
    tasksCompleted: 29,
    rank: 3,
    badgeColor: "silver",
    monthlyGain: 95
  },
  {
    id: "4",
    name: "bunny adam",
    avatar: "/api/placeholder/40/40",
    points: 70,
    level: "Bronze",
    tasksCompleted: 3,
    rank: 4,
    badgeColor: "bronze",
    monthlyGain: 70,
    isCurrentUser: true
  },
  {
    id: "5",
    name: "David Kim",
    avatar: "/api/placeholder/40/40",
    points: 650,
    level: "Bronze", 
    tasksCompleted: 22,
    rank: 5,
    badgeColor: "bronze",
    monthlyGain: 85
  }
];

const Leaderboard = () => {
  const currentUser = leaderboardData.find(user => user.isCurrentUser);
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-gold" />;
      case 2:
        return <Trophy className="w-6 h-6 text-silver" />;
      case 3:
        return <Medal className="w-6 h-6 text-bronze" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getLevelVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case "gold":
        return "gold";
      case "silver": 
        return "silver";
      default:
        return "bronze";
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-card-foreground">Leaderboard</h1>
          <p className="text-muted-foreground text-lg">
            See how you rank against other contributors in the ProofWork Hub
          </p>
        </div>

        {/* Your Position Card */}
        {currentUser && (
          <Card className="border-primary shadow-glow bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Your Current Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(currentUser.rank)}
                    <span className="text-2xl font-bold text-card-foreground">#{currentUser.rank}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {currentUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-card-foreground">{currentUser.name}</p>
                      <Badge variant={getLevelVariant(currentUser.level) as any} className="mt-1">
                        {currentUser.level}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{currentUser.points}</p>
                  <p className="text-sm text-muted-foreground">points</p>
                  <div className="flex items-center gap-1 text-sm text-success mt-1">
                    <TrendingUp className="w-4 h-4" />
                    +{currentUser.monthlyGain} this month
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top Performers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {leaderboardData.slice(0, 3).map((user, index) => (
            <Card 
              key={user.id} 
              className={`relative overflow-hidden ${
                index === 0 ? 'ring-2 ring-gold shadow-large' : 
                index === 1 ? 'ring-2 ring-silver shadow-medium' : 
                'ring-2 ring-bronze shadow-soft'
              }`}
            >
              <CardContent className="p-6 text-center">
                <div className="absolute top-4 right-4">
                  {getRankIcon(user.rank)}
                </div>
                
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="font-bold text-lg text-card-foreground">{user.name}</h3>
                <Badge variant={getLevelVariant(user.level) as any} className="mb-3">
                  {user.level}
                </Badge>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-3xl font-bold text-primary">{user.points}</p>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                  </div>
                  <div className="flex justify-center gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-card-foreground">{user.tasksCompleted}</p>
                      <p className="text-muted-foreground">Tasks</p>
                    </div>
                    <div>
                      <p className="font-semibold text-success">+{user.monthlyGain}</p>
                      <p className="text-muted-foreground">This Month</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              Complete Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData.map((user) => (
                <div 
                  key={user.id}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-soft ${
                    user.isCurrentUser ? 'bg-primary/5 border-primary' : 'bg-card hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-card-foreground">
                        {user.name}
                        {user.isCurrentUser && (
                          <Badge variant="outline" className="ml-2 text-xs">You</Badge>
                        )}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant={getLevelVariant(user.level) as any} className="text-xs">
                          {user.level}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {user.tasksCompleted} tasks completed
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{user.points}</p>
                    <div className="flex items-center gap-1 text-sm text-success">
                      <TrendingUp className="w-3 h-3" />
                      +{user.monthlyGain}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Level Requirements */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Level Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-bronze/10 border border-bronze/20">
                <div className="w-12 h-12 bg-bronze rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-card-foreground">Bronze</h3>
                <p className="text-sm text-muted-foreground">0 - 100 points</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-silver/10 border border-silver/20">
                <div className="w-12 h-12 bg-silver rounded-full flex items-center justify-center mx-auto mb-2">
                  <Medal className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-card-foreground">Silver</h3>
                <p className="text-sm text-muted-foreground">100 - 500 points</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gold/10 border border-gold/20">
                <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <Crown className="w-6 h-6 text-gold-foreground" />
                </div>
                <h3 className="font-semibold text-card-foreground">Gold</h3>
                <p className="text-sm text-muted-foreground">500+ points</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Leaderboard;