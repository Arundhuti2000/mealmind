import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Loader2, FileText, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { cn } from "../utils";
import type { ParsedItem, ReceiptProcessedResponse } from "../types";

interface ReceiptUploaderProps {
  onProcessed: (items: ParsedItem[]) => void;
}

export const ReceiptUploader = ({ onProcessed }: ReceiptUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
    } else {
      alert("Please upload an image file");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const processReceipt = async () => {
    if (!file) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Mock progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      const response = await axios.post<ReceiptProcessedResponse>(
        "http://localhost:8000/api/v1/receipts/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      clearInterval(interval);
      setUploadProgress(100);

      setTimeout(() => {
        onProcessed(response.data.items);
        setIsProcessing(false);
        setFile(null);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to process receipt");
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {!isProcessing ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "relative group rounded-3xl border-2 border-dashed transition-all duration-300 p-12 text-center cursor-pointer overflow-hidden backdrop-blur-md bg-white/5 dark:bg-black/20",
              isDragOver
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-300/20 hover:border-blue-400/50 hover:bg-white/10",
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />

            <div className="flex flex-col items-center gap-4 relative z-10">
              {file ? (
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <FileText size={40} />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X size={14} />
                  </button>
                  <p className="mt-4 font-medium text-lg text-foreground">
                    {file.name}
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Upload className="text-blue-500 w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Drop your receipt here
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      or click to browse
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Genie-like background effects */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            </div>

            {file && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    processReceipt();
                  }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all text-sm"
                >
                  Process Receipt
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center p-12 text-center"
          >
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl animate-blob" />
              <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-2xl animate-blob animation-delay-2000" />
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {uploadProgress === 100 ? (
                  <CheckCircle2 className="w-16 h-16 text-green-400" />
                ) : (
                  <Loader2 className="w-16 h-16 text-white animate-spin" />
                )}
              </div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
              {uploadProgress === 100 ? "Complete!" : "Analyzing..."}
            </h3>
            <p className="text-gray-400 max-w-xs mx-auto">
              Our AI is extracting items from your receipt. This won't take
              long.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
