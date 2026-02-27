import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Upload as UploadIcon, FileText, X, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  preview?: string;
  status: "uploading" | "processing" | "completed" | "error";
}

interface ManualInvoiceData {
  gstin: string;
  invoiceNumber: string;
  invoiceDate: string;
  billAmount: string;
}

export function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"upload" | "manual">("upload");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [manualData, setManualData] = useState<ManualInvoiceData>({
    gstin: "",
    invoiceNumber: "",
    invoiceDate: "",
    billAmount: "",
  });

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "processing" } : f
          )
        );

        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id ? { ...f, status: "completed" } : f
            )
          );
        }, 1500);
      }, index * 500);
    });

    // Simulate overall progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 200);

    // const formData = new FormData();
    // selectedFiles.forEach(file => formData.append('receipts', file));
    // await fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData
    // });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const completedCount = files.filter((f) => f.status === "completed").length;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save manual invoice data to MongoDB
    localStorage.setItem("manual_invoice", JSON.stringify(manualData));
    navigate("/preview");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-2">Add Invoice</h1>
        <p className="text-gray-700">
          Add your invoice by uploading files or entering details manually
        </p>
      </div>

      {/* Mode Toggle Buttons */}
      <div className="flex gap-4 mb-8">
        <Button
          onClick={() => setMode("upload")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            mode === "upload"
              ? "bg-[#8B4513] hover:bg-[#723A0F] text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Upload Invoice
        </Button>
        <Button
          onClick={() => setMode("manual")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            mode === "manual"
              ? "bg-[#8B4513] hover:bg-[#723A0F] text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          Manual Entry
        </Button>
      </div>

      {/* Upload Mode */}
      {mode === "upload" && (
        <>
          {/* Upload Area */}
          <Card
            className={`mx-auto w-64 h-64 p-4 mb-8 flex flex-col items-center justify-center gap-2 border-2 border-dashed transition-all duration-300 ${isDragging
              ? "border-[#8B4513] bg-[#FFCCBC]/20 scale-[0.99] shadow-inner"
              : "border-[#8B4513]/30 hover:border-[#8B4513] hover:shadow-lg bg-white/50 backdrop-blur-sm"
              }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className="text-center flex flex-col items-center">
              <div className="bg-[#FFCCBC] w-14 h-14 rounded-full flex items-center justify-center mb-2">
                <UploadIcon className="size-8 text-[#8B4513]" />
              </div>
              <h2 className="text-sm font-semibold text-[#8B4513] mb-1">
                Drop files or click to browse
              </h2>
              <p className="text-xs text-gray-600 mb-2">
                JPG/PNG/PDF • Max 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#8B4513] hover:bg-[#723A0F] text-white text-sm px-3 py-1"
              >
                Select Files
              </Button>
            </div>
          </Card>

          {/* Upload Progress */}
          {files.length > 0 && uploadProgress < 100 && (
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-[#8B4513]">Processing files...</p>
                <p className="text-sm text-gray-600">{uploadProgress}%</p>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </Card>
          )}

          {/* Uploaded Files */}
          {files.length > 0 && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#8B4513]">
                  Uploaded Files ({completedCount}/{files.length} completed)
                </h2>
                {completedCount === files.length && files.length > 0 && (
                  <Button
                    onClick={() => navigate("/preview")}
                    className="bg-[#8B4513] hover:bg-[#723A0F] text-white"
                  >
                    Preview Summaries →
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[#FFCCBC]/50 bg-white/60 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
                  >
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-[#8B4513]/10 rounded-lg flex items-center justify-center">
                        <FileText className="size-8 text-[#8B4513]" />
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="font-medium text-[#8B4513]">{file.name}</p>
                      <p className="text-sm text-gray-600">{file.size}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {file.status === "uploading" && (
                        <Loader2 className="size-5 text-[#8B4513] animate-spin" />
                      )}
                      {file.status === "processing" && (
                        <div className="flex items-center gap-2 text-[#8B4513]">
                          <Loader2 className="size-5 animate-spin" />
                          <span className="text-sm">Processing...</span>
                        </div>
                      )}
                      {file.status === "completed" && (
                        <CheckCircle2 className="size-5 text-green-600" />
                      )}
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <X className="size-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Manual Entry Mode */}
      {mode === "manual" && (
        <Card className="p-8">
          <form onSubmit={handleManualSubmit} className="space-y-6">
            <div>
              <Label htmlFor="gstin" className="text-gray-700 font-semibold">
                GSTIN
              </Label>
              <Input
                id="gstin"
                value={manualData.gstin}
                onChange={(e) =>
                  setManualData({ ...manualData, gstin: e.target.value })
                }
                placeholder="e.g., 27AAFCU5055K1Z0"
                className="border-[#8B4513]/30 focus:border-[#8B4513]"
                required
              />
            </div>

            <div>
              <Label htmlFor="invoiceNumber" className="text-gray-700 font-semibold">
                Invoice Number
              </Label>
              <Input
                id="invoiceNumber"
                value={manualData.invoiceNumber}
                onChange={(e) =>
                  setManualData({ ...manualData, invoiceNumber: e.target.value })
                }
                placeholder="e.g., INV-2024-001"
                className="border-[#8B4513]/30 focus:border-[#8B4513]"
                required
              />
            </div>

            <div>
              <Label htmlFor="invoiceDate" className="text-gray-700 font-semibold">
                Invoice Date
              </Label>
              <Input
                id="invoiceDate"
                type="date"
                value={manualData.invoiceDate}
                onChange={(e) =>
                  setManualData({ ...manualData, invoiceDate: e.target.value })
                }
                className="border-[#8B4513]/30 focus:border-[#8B4513]"
                required
              />
            </div>

            <div>
              <Label htmlFor="billAmount" className="text-gray-700 font-semibold">
                Bill Amount
              </Label>
              <Input
                id="billAmount"
                type="number"
                step="0.01"
                value={manualData.billAmount}
                onChange={(e) =>
                  setManualData({ ...manualData, billAmount: e.target.value })
                }
                placeholder="e.g., 5000.00"
                className="border-[#8B4513]/30 focus:border-[#8B4513]"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#8B4513] hover:bg-[#723A0F] text-white font-semibold py-2"
            >
              GST Draft
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
