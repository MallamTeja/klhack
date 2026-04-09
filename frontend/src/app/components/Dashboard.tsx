import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Upload, Calendar, FileText, TrendingUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

export function Dashboard() {
  const [stats, setStats] = useState({
    receiptsThisMonth: 0,
    totalSaved: "₹0",
    complianceScore: 0,
    nextDeadline: "Calculating...",
  });

  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const now = new Date();
  const deadlineDate = new Date(now.getFullYear(), now.getMonth() + 1, 20);
  const daysRemaining = Math.max(0, Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("taxflow_token");
        const headers = { 'Authorization': `Bearer ${token}` };

        const statsRes = await fetch('/api/return/stats', { headers });
        const statsData = await statsRes.json();
        setStats(statsData);

        const activityRes = await fetch('/api/return', { headers });
        const activityData = await activityRes.json();
        const formattedActivity = activityData.slice(0, 3).map((item: any) => ({
          date: new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
          action: `Filing for ${item.ret_period} ${item.status.toLowerCase()}`,
          status: item.status.toLowerCase() === 'completed' ? 'completed' : 'pending'
        }));
        setRecentActivity(formattedActivity);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

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
          <p className="text-xs text-[#8B4513] mt-1">
            {stats.complianceScore === 100 ? "You're 100% compliant! 🎉" : "Action required for compliance"}
          </p>
        </Card>

        <Card className="p-4 border-l-4 border-l-[#8B4513] bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-600">Next Deadline</p>
            <Clock className="size-4 text-[#8B4513]" />
          </div>
          <p className="text-lg font-bold text-[#8B4513]">{stats.nextDeadline}</p>
          <p className="text-xs text-[#8B4513] mt-1">{daysRemaining} days remaining</p>
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