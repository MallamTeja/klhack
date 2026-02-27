import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Edit2, Save, CheckCircle2, TrendingUp, FileText, IndianRupee } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

interface ExtractedData {
  id: string;
  receiptNumber: string;
  vendor: string;
  date: string;
  amount: number;
  gst: number;
  category: string;
  editable: boolean;
}

export function Preview() {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  // Mock extracted data - in production, fetch from MongoDB via MONGODB_URL
  const [extractedData, setExtractedData] = useState<ExtractedData[]>([
    {
      id: "1",
      receiptNumber: "INV-2026-001",
      vendor: "Sharma Electronics",
      date: "2026-02-25",
      amount: 12500,
      gst: 2250,
      category: "Equipment",
      editable: false,
    },
    {
      id: "2",
      receiptNumber: "INV-2026-002",
      vendor: "Office Supplies Co.",
      date: "2026-02-23",
      amount: 3400,
      gst: 612,
      category: "Supplies",
      editable: false,
    },
    {
      id: "3",
      receiptNumber: "INV-2026-003",
      vendor: "Tech Services Ltd",
      date: "2026-02-20",
      amount: 8900,
      gst: 1602,
      category: "Services",
      editable: false,
    },
  ]);

  const totalAmount = extractedData.reduce((sum, item) => sum + item.amount, 0);
  const totalGST = extractedData.reduce((sum, item) => sum + item.gst, 0);
  const totalWithGST = totalAmount + totalGST;

  const toggleEdit = (id: string) => {
    setExtractedData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, editable: !item.editable } : item
      )
    );
  };

  const handleFieldChange = (id: string, field: keyof ExtractedData, value: any) => {
    setExtractedData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleGenerateSummary = () => {
    setShowConfetti(true);

    // TODO: Save to MongoDB via MONGODB_URL and process with API_KEY
    // await fetch('/api/summary', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ data: extractedData })
    // });

    setTimeout(() => {
      navigate("/export");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-2">
          Review Extracted Data
        </h1>
        <p className="text-gray-700">
          Verify and edit the automatically extracted information
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border-l-4 border-l-[#8B4513] bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Receipts</p>
            <FileText className="size-5 text-[#8B4513]" />
          </div>
          <p className="text-3xl font-bold text-[#8B4513]">{extractedData.length}</p>
        </Card>

        <Card className="p-6 border-l-4 border-l-[#FFCCBC] bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Total Amount</p>
            <IndianRupee className="size-5 text-[#8B4513]" />
          </div>
          <p className="text-3xl font-bold text-[#8B4513]">
            ₹{totalAmount.toLocaleString("en-IN")}
          </p>
        </Card>

        <Card className="p-6 border-l-4 border-l-green-500 bg-white/80 backdrop-blur-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">GST Credit</p>
            <TrendingUp className="size-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">
            ₹{totalGST.toLocaleString("en-IN")}
          </p>
        </Card>
      </div>

      {/* Extracted Data Table */}
      <Card className="p-6 mb-8 bg-white/80 backdrop-blur-md shadow-lg border-white/20">
        <h2 className="text-xl font-semibold text-[#8B4513] mb-6">
          Extracted Details
        </h2>

        <div className="space-y-4">
          {extractedData.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-[#FFCCBC]/50 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {item.editable ? (
                    <Input
                      value={item.vendor}
                      onChange={(e) =>
                        handleFieldChange(item.id, "vendor", e.target.value)
                      }
                      className="mb-2 font-semibold"
                    />
                  ) : (
                    <h3 className="font-semibold text-[#8B4513] mb-1">
                      {item.vendor}
                    </h3>
                  )}
                  <p className="text-sm text-gray-600">
                    Receipt #{item.receiptNumber}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleEdit(item.id)}
                  className="border-[#8B4513] text-[#8B4513]"
                >
                  {item.editable ? (
                    <>
                      <Save className="size-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit2 className="size-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Date</p>
                  {item.editable ? (
                    <Input
                      type="date"
                      value={item.date}
                      onChange={(e) =>
                        handleFieldChange(item.id, "date", e.target.value)
                      }
                      className="text-sm"
                    />
                  ) : (
                    <p className="font-medium text-[#8B4513]">{item.date}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Category</p>
                  {item.editable ? (
                    <Input
                      value={item.category}
                      onChange={(e) =>
                        handleFieldChange(item.id, "category", e.target.value)
                      }
                      className="text-sm"
                    />
                  ) : (
                    <p className="font-medium text-[#8B4513]">{item.category}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">Amount</p>
                  {item.editable ? (
                    <Input
                      type="number"
                      value={item.amount}
                      onChange={(e) =>
                        handleFieldChange(item.id, "amount", parseFloat(e.target.value))
                      }
                      className="text-sm"
                    />
                  ) : (
                    <p className="font-medium text-[#8B4513]">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">GST</p>
                  {item.editable ? (
                    <Input
                      type="number"
                      value={item.gst}
                      onChange={(e) =>
                        handleFieldChange(item.id, "gst", parseFloat(e.target.value))
                      }
                      className="text-sm"
                    />
                  ) : (
                    <p className="font-medium text-green-600">
                      ₹{item.gst.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary Total */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-[#8B4513] to-[#8B4513]/90 text-white shadow-2xl shadow-[#8B4513]/20 border border-[#8B4513]/50">
        <h2 className="text-xl font-semibold mb-4">Summary Total</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-[#FFCCBC] text-sm mb-1">Subtotal</p>
            <p className="text-2xl font-bold">
              ₹{totalAmount.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-[#FFCCBC] text-sm mb-1">Total GST</p>
            <p className="text-2xl font-bold">
              ₹{totalGST.toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-[#FFCCBC] text-sm mb-1">Grand Total</p>
            <p className="text-2xl font-bold">
              ₹{totalWithGST.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={() => navigate("/upload")}
          variant="outline"
          className="flex-1 border-[#8B4513] text-[#8B4513]"
        >
          Back to Upload
        </Button>
        <Button
          onClick={handleGenerateSummary}
          className="flex-1 bg-[#8B4513] hover:bg-[#723A0F] text-white"
        >
          <CheckCircle2 className="mr-2 size-5" />
          Generate Filing Summary
        </Button>
      </div>

      {/* Success Message */}
      {showConfetti && (
        <Card className="mt-8 p-6 bg-[#FFCCBC] border-2 border-[#8B4513]">
          <div className="text-center">
            <CheckCircle2 className="size-16 text-[#8B4513] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#8B4513] mb-2">
              Perfect! Data Verified ✓
            </h3>
            <p className="text-[#8B4513]">
              Generating your filing-ready summary...
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
