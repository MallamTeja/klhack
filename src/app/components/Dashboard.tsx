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

  const upcomingDeadlines = [
    { title: "GST Return Filing", date: "March 20, 2026", daysLeft: 21, type: "urgent" },
    { title: "TDS Payment", date: "April 7, 2026", daysLeft: 39, type: "normal" },
    { title: "Quarterly Summary", date: "April 30, 2026", daysLeft: 62, type: "normal" },
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
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-l-4 border-l-[#8B4513] bg-gradient-to-br from-white to-[#FFCCBC]/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Receipts This Month</p>
            <FileText className="size-5 text-[#8B4513]" />
          </div>
          <p className="text-3xl font-bold text-[#8B4513]">{stats.receiptsThisMonth}</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-[#FFCCBC] bg-gradient-to-br from-white to-[#FFCCBC]/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Tax Credits Saved</p>
            <TrendingUp className="size-5 text-[#8B4513]" />
          </div>
          <p className="text-3xl font-bold text-[#8B4513]">{stats.totalSaved}</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-green-500 bg-gradient-to-br from-white to-green-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Compliance Score</p>
            <CheckCircle2 className="size-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.complianceScore}%</p>
          <p className="text-xs text-green-600 mt-1">You're 100% compliant! 🎉</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-orange-500 bg-gradient-to-br from-white to-orange-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Next Deadline</p>
            <Clock className="size-5 text-orange-600" />
          </div>
          <p className="text-lg font-bold text-orange-600">{stats.nextDeadline}</p>
          <p className="text-xs text-orange-600 mt-1">21 days remaining</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6 mb-8 bg-[#8B4513] text-white">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-[#8B4513] hover:bg-[#FFCCBC] h-auto py-6"
          >
            <Link to="/upload" className="flex flex-col items-center gap-2">
              <Upload className="size-8" />
              <span>Upload Receipts</span>
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/20 h-auto py-6"
          >
            <Link to="/preview" className="flex flex-col items-center gap-2">
              <FileText className="size-8" />
              <span>View Summaries</span>
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/20 h-auto py-6"
          >
            <Link to="/export" className="flex flex-col items-center gap-2">
              <Calendar className="size-8" />
              <span>Generate Report</span>
            </Link>
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upcoming Deadlines */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#8B4513]">Upcoming Deadlines</h2>
            <Calendar className="size-5 text-[#8B4513]" />
          </div>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${
                  deadline.type === "urgent"
                    ? "border-orange-500 bg-orange-50"
                    : "border-[#FFCCBC] bg-[#FFCCBC]/20"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[#8B4513]">{deadline.title}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      deadline.type === "urgent"
                        ? "bg-orange-200 text-orange-800"
                        : "bg-[#FFCCBC] text-[#8B4513]"
                    }`}
                  >
                    {deadline.daysLeft} days
                  </span>
                </div>
                <p className="text-sm text-gray-600">{deadline.date}</p>
              </div>
            ))}
          </div>
        </Card>

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

      {/* Tips Section */}
      <Card className="p-6 mt-8 bg-gradient-to-r from-[#FFCCBC]/30 to-[#FFCCBC]/10 border-2 border-[#FFCCBC]">
        <div className="flex items-start gap-3">
          <AlertCircle className="size-6 text-[#8B4513] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-[#8B4513] mb-2">Pro Tip</h3>
            <p className="text-gray-700">
              Upload receipts throughout the month instead of all at once. This helps maintain accurate records and makes tax time stress-free! 🌟
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
