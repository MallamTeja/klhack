import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Upload as UploadIcon, FileText, X, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  preview?: string;
  status: "uploading" | "processing" | "completed" | "error";
}

export function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#8B4513] mb-2">Upload Receipts</h1>
        <p className="text-gray-700">
          Upload photos or PDFs of your receipts for automatic extraction
        </p>
      </div>

      {/* Upload Area */}
      <Card
        className={`p-12 mb-8 border-2 border-dashed transition-all duration-300 ${isDragging
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
        <div className="text-center">
          <div className="bg-[#FFCCBC] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <UploadIcon className="size-10 text-[#8B4513]" />
          </div>
          <h2 className="text-xl font-semibold text-[#8B4513] mb-2">
            Drop files here or click to browse
          </h2>
          <p className="text-gray-600 mb-6">
            Supports JPG, PNG, PDF • Max 10MB per file
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
            className="bg-[#8B4513] hover:bg-[#723A0F] text-white"
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

    </div>
  );
}
