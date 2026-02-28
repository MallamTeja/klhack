import { Link } from "react-router";
import { Upload, Calendar, FileText, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

export function Dashboard() {
  // Mock data - in production, fetch from MongoDB via MONGODB_URL
  const stats = {
    receiptsThisMonth: 23,
    totalSaved: "₹45,230",
    complianceScore: 100,
    nextDeadline: "March 20, 2026",
  };

  const recentActivity = [
    { date: "Feb 25, 2026", action: "Uploaded 5 receipts", status: "completed" },
    { date: "Feb 20, 2026", action: "Generated summary for January", status: "completed" },
    { date: "Feb 15, 2026", action: "Exported filing documents", status: "completed" },
  ];



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-700">Here's your tax compliance overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 border-l-4 border-l-[#8B4513] bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-600">Receipts This Month</p>
            <FileText className="size-4 text-[#8B4513]" />
          </div>
          <p className="text-2xl font-bold text-[#8B4513]">{stats.receiptsThisMonth}</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#8B4513] bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-600">Tax Credits Saved</p>
            <TrendingUp className="size-4 text-[#8B4513]" />
          </div>
          <p className="text-2xl font-bold text-[#8B4513]">{stats.totalSaved}</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#8B4513] bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-600">Compliance Score</p>
            <CheckCircle2 className="size-4 text-[#8B4513]" />
          </div>
          <p className="text-2xl font-bold text-[#8B4513]">{stats.complianceScore}%</p>
          <p className="text-xs text-[#8B4513] mt-1">You're 100% compliant! 🎉</p>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#8B4513] bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-600">Next Deadline</p>
            <Clock className="size-4 text-[#8B4513]" />
          </div>
          <p className="text-lg font-bold text-[#8B4513]">{stats.nextDeadline}</p>
          <p className="text-xs text-[#8B4513] mt-1">21 days remaining</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-5 mb-6 bg-gradient-to-br from-[#8B4513] to-[#8B4513]/90 text-white shadow-xl shadow-[#8B4513]/20 border border-[#8B4513]/50">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <Button
            asChild
            size="lg"
            className="bg-white text-[#8B4513] hover:bg-[#FFCCBC] h-auto py-4"
          >
            <Link to="/upload" className="flex flex-col items-center gap-2">
              <Upload className="size-6" />
              <span className="text-sm font-medium">Upload Receipts</span>
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-[#8B4513] hover:bg-[#FFCCBC] h-auto py-4"
          >
            <Link to="/preview" className="flex flex-col items-center gap-2">
              <FileText className="size-6" />
              <span className="text-sm font-medium">View Summaries</span>
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-[#8B4513] hover:bg-[#FFCCBC] h-auto py-4"
          >
            <Link to="/export" className="flex flex-col items-center gap-2">
              <Calendar className="size-6" />
              <span className="text-sm font-medium">Generate Report</span>
            </Link>
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-8">
        {/* Recent Activity */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#8B4513]">Recent Activity</h2>
            <Clock className="size-5 text-[#8B4513]" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#FFCCBC]/20">
                <CheckCircle2 className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-[#8B4513]">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
          <Button asChild variant="outline" className="w-full mt-4 border-[#8B4513] text-[#8B4513]">
            <Link to="/history">View All Activity</Link>
          </Button>
        </Card>
      </div>

    </div>
  );
}