import { useState } from "react";
import { FileText, Download, Eye, Calendar, Search, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface FilingRecord {
  id: string;
  month: string;
  year: number;
  receipts: number;
  totalAmount: number;
  gstAmount: number;
  status: "completed" | "pending" | "draft";
  filedDate?: string;
}

export function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data - in production, fetch from MongoDB via MONGODB_URL
  const filingHistory: FilingRecord[] = [
    {
      id: "1",
      month: "February",
      year: 2026,
      receipts: 23,
      totalAmount: 24800,
      gstAmount: 4464,
      status: "completed",
      filedDate: "2026-02-27",
    },
    {
      id: "2",
      month: "January",
      year: 2026,
      receipts: 18,
      totalAmount: 19500,
      gstAmount: 3510,
      status: "completed",
      filedDate: "2026-01-22",
    },
    {
      id: "3",
      month: "December",
      year: 2025,
      receipts: 31,
      totalAmount: 42300,
      gstAmount: 7614,
      status: "completed",
      filedDate: "2025-12-18",
    },
    {
      id: "4",
      month: "November",
      year: 2025,
      receipts: 15,
      totalAmount: 16200,
      gstAmount: 2916,
      status: "completed",
      filedDate: "2025-11-20",
    },
  ];

  const filteredHistory = filingHistory.filter((record) => {
    const matchesSearch = `${record.month} ${record.year}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || record.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalFilings = filingHistory.length;
  const totalReceipts = filingHistory.reduce((sum, r) => sum + r.receipts, 0);
  const totalRevenue = filingHistory.reduce((sum, r) => sum + r.totalAmount, 0);
  const totalGST = filingHistory.reduce((sum, r) => sum + r.gstAmount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "draft":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const handleDownload = (recordId: string) => {
    // TODO: Fetch document from MongoDB and generate download
    alert(`Downloading record ${recordId}...`);
  };

  const handleView = (recordId: string) => {
    // TODO: View detailed record
    alert(`Viewing record ${recordId}...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-2">Filing History</h1>
        <p className="text-gray-700">View and download your past tax filings</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-l-4 border-l-[#8B4513] bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-sm text-gray-600 mb-1">Total Filings</p>
          <p className="text-3xl font-bold text-[#8B4513]">{totalFilings}</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-[#FFCCBC] bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-sm text-gray-600 mb-1">Total Receipts</p>
          <p className="text-3xl font-bold text-[#8B4513]">{totalReceipts}</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-blue-500 bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-blue-600">
            ₹{(totalRevenue / 1000).toFixed(0)}K
          </p>
        </Card>

        <Card className="p-6 border-l-4 border-l-green-500 bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <p className="text-sm text-gray-600 mb-1">Total GST</p>
          <p className="text-3xl font-bold text-green-600">
            ₹{(totalGST / 1000).toFixed(0)}K
          </p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-8 bg-white/80 backdrop-blur-md shadow-lg border-white/20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              placeholder="Search by month or year..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#8B4513]/30"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="size-5 text-[#8B4513]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-[#8B4513]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513]"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </Card>

      {/* History Table */}
      <Card className="p-6 bg-white/80 backdrop-blur-md shadow-lg border-white/20">
        <h2 className="text-xl font-semibold text-[#8B4513] mb-6">
          Past Filings ({filteredHistory.length})
        </h2>

        <div className="space-y-4">
          {filteredHistory.map((record) => (
            <div
              key={record.id}
              className="p-6 rounded-xl border border-[#FFCCBC]/50 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-[#8B4513] w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="size-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#8B4513] text-lg mb-1">
                      {record.month} {record.year}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span>{record.receipts} receipts</span>
                      <span>•</span>
                      <span>₹{record.totalAmount.toLocaleString("en-IN")} revenue</span>
                      <span>•</span>
                      <span>₹{record.gstAmount.toLocaleString("en-IN")} GST</span>
                    </div>
                    {record.filedDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Filed on {new Date(record.filedDate).toLocaleDateString("en-IN")}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border-2 ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(record.id)}
                    className="border-[#8B4513] text-[#8B4513]"
                  >
                    <Eye className="size-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(record.id)}
                    className="border-[#8B4513] text-[#8B4513]"
                  >
                    <Download className="size-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <FileText className="size-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No records found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </Card>

    </div>
  );
}
