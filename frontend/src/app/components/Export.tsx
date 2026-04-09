import { useState, useEffect } from "react";
import { Download, FileText, Mail, Share2, CheckCircle2, Printer } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function Export() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [stats, setStats] = useState({
    receiptsThisMonth: 0,
    totalSaved: "₹0",
    complianceScore: 0,
    nextDeadline: "Calculating..."
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("taxflow_token");
        const res = await fetch('/api/return/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const now = new Date();
  const currentMonth = now.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
  const deadlineDate = new Date(now.getFullYear(), now.getMonth() + 1, 20);
  const deadlineStr = deadlineDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  const handleDownload = (format: string) => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Simulate download with dynamic filename
    const link = document.createElement("a");
    link.href = "#";
    const filenameMonth = now.toLocaleString('en-IN', { month: 'short', year: 'numeric' }).replace(' ', '');
    link.download = `TaxFlow_Summary_${filenameMonth}.${format}`;
    link.click();
  };

  const handleEmail = () => {
    alert(`Summary for ${currentMonth} will be sent to your registered email address!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B4513]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success Header */}
      <Card className="p-8 mb-8 relative overflow-hidden bg-gradient-to-br from-[#FFCCBC]/90 to-[#FFE4B5]/90 backdrop-blur-xl border border-[#8B4513]/20 shadow-2xl shadow-[#8B4513]/10">
        <div className="text-center">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle2 className="size-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#8B4513] mb-2">
            🎉 You're {stats.complianceScore}% Compliant!
          </h1>
          <p className="text-lg text-[#8B4513]">
            Your tax summary for {currentMonth} is ready
          </p>
        </div>
      </Card>

      {/* Export Options */}
      <Card className="p-6 mb-8 bg-white/80 backdrop-blur-md shadow-lg border-white/20">
        <h2 className="text-xl font-semibold text-[#8B4513] mb-6">
          Download Filing Documents
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => handleDownload("pdf")}
            className="p-6 rounded-lg border-2 border-[#FFCCBC] hover:border-[#8B4513] bg-white hover:bg-[#FFCCBC]/10 transition-all text-left group"
          >
            <FileText className="size-10 text-[#8B4513] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-[#8B4513] mb-1">
              PDF Summary Report
            </h3>
            <p className="text-sm text-gray-600">
              Complete filing summary for {currentMonth}
            </p>
          </button>

          <button
            onClick={() => handleDownload("excel")}
            className="p-6 rounded-lg border-2 border-[#FFCCBC] hover:border-[#8B4513] bg-white hover:bg-[#FFCCBC]/10 transition-all text-left group"
          >
            <Download className="size-10 text-[#8B4513] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-[#8B4513] mb-1">
              Excel Spreadsheet
            </h3>
            <p className="text-sm text-gray-600">
              Detailed breakdown for your records and accountant
            </p>
          </button>

          <button
            onClick={() => handleDownload("json")}
            className="p-6 rounded-lg border-2 border-[#FFCCBC] hover:border-[#8B4513] bg-white hover:bg-[#FFCCBC]/10 transition-all text-left group"
          >
            <Share2 className="size-10 text-[#8B4513] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-[#8B4513] mb-1">
              GST Portal Format
            </h3>
            <p className="text-sm text-gray-600">
              Ready-to-upload JSON file for government portal
            </p>
          </button>

          <button
            onClick={handleEmail}
            className="p-6 rounded-lg border-2 border-[#FFCCBC] hover:border-[#8B4513] bg-white hover:bg-[#FFCCBC]/10 transition-all text-left group"
          >
            <Mail className="size-10 text-[#8B4513] mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-[#8B4513] mb-1">
              Email to Myself
            </h3>
            <p className="text-sm text-gray-600">
              Send all documents to your registered email
            </p>
          </button>
        </div>
      </Card>

      {/* Summary Preview */}
      <Card className="p-6 mb-8 bg-white/80 backdrop-blur-md shadow-lg border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#8B4513]">
            Summary Preview
          </h2>
          <Button
            variant="outline"
            size="sm"
            className="border-[#8B4513] text-[#8B4513]"
          >
            <Printer className="size-4 mr-2" />
            Print
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6 p-4 bg-[#FFCCBC]/20 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Savings</p>
              <p className="text-2xl font-bold text-[#8B4513]">{stats.totalSaved}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Receipts Processed</p>
              <p className="text-2xl font-bold text-[#8B4513]">{stats.receiptsThisMonth}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Compliance Score</p>
              <p className="text-2xl font-bold text-green-600">{stats.complianceScore}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Next Deadline</p>
              <p className="text-2xl font-bold text-green-600">{stats.nextDeadline}</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Filing Details</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Period</p>
                <p className="font-medium">{currentMonth}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Receipts</p>
                <p className="font-medium">{stats.receiptsThisMonth} documents</p>
              </div>
              <div>
                <p className="text-gray-600">Due Date</p>
                <p className="font-medium">{deadlineStr}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-to-br from-[#8B4513] to-[#8B4513]/90 text-white shadow-2xl shadow-[#8B4513]/20 border border-[#8B4513]/50 relative overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-white text-[#8B4513] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <div>
              <p className="font-medium">Download your documents</p>
              <p className="text-sm text-[#FFCCBC]">
                Choose your preferred format from the options above
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white text-[#8B4513] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <div>
              <p className="font-medium">Review before submission</p>
              <p className="text-sm text-[#FFCCBC]">
                Double-check all amounts and details for {currentMonth}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white text-[#8B4513] w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <div>
              <p className="font-medium">Submit to GST portal</p>
              <p className="text-sm text-[#FFCCBC]">
                Upload the JSON file to the government portal before {deadlineStr}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom">
          <CheckCircle2 className="size-6" />
          <div>
            <p className="font-semibold">Download Started!</p>
            <p className="text-sm text-green-100">Your file is ready</p>
          </div>
        </div>
      )}
    </div>
  );
}
