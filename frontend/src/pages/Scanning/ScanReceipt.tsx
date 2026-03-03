import { ReceiptUploader } from "../../components/ReceiptUploader";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Edit2, RotateCcw } from "lucide-react";
import type { ParsedItem } from "../../types";

export const ScanReceiptPage = () => {
  const [scannedItems, setScannedItems] = useState<ParsedItem[]>([]);

  // Mock handler for when items are returned from the scanner
  const handleProcessed = (items: ParsedItem[]) => {
    setScannedItems(items);
  };

  const removeItem = (index: number) => {
    setScannedItems(scannedItems.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Smart Receipt Scanner
        </h1>
        <p className="text-muted-foreground mt-2">
          Upload your grocery receipt and let AI organize your pantry instantly.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 items-start">
        {/* Uploader Section */}
        <div>
          <ReceiptUploader onProcessed={handleProcessed} />
          <div className="mt-6 p-4 rounded-xl border border-white/5 bg-white/5 text-sm text-muted-foreground">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />{" "}
              Tips for best results:
            </h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Ensure good lighting and no glare</li>
              <li>Keep the receipt flat and straight</li>
              <li>Avoid handwritten notes on the receipt</li>
            </ul>
          </div>
        </div>

        {/* Results Preview Section */}
        <motion.div
          layout
          className="glass-card rounded-2xl overflow-hidden border border-white/10 min-h-[400px] flex flex-col"
        >
          <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <h3 className="font-semibold">
              Extracted Items ({scannedItems.length})
            </h3>
            {scannedItems.length > 0 && (
              <button
                onClick={() => setScannedItems([])}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 px-2 py-1 hover:bg-red-500/10 rounded-md transition-colors"
              >
                <RotateCcw size={12} /> Clear All
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto max-h-[500px] p-2 space-y-2">
            {scannedItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50 space-y-4">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                  <span className="text-2xl">🧾</span>
                </div>
                <p>No items scanned yet</p>
              </div>
            ) : (
              scannedItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-lg shadow-inner">
                    📦
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate text-sm">
                        {item.name}
                      </p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-0.5">
                      <span>
                        Qty:{" "}
                        <strong className="text-foreground border-b border-dashed border-white/20 cursor-text hover:border-blue-500 transition-colors">
                          {item.quantity} {item.unit}
                        </strong>
                      </span>
                      <span>
                        Exp: <span className="text-green-400">~7 days</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-1.5 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(idx)}
                      className="p-1.5 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {scannedItems.length > 0 && (
            <div className="p-4 border-t border-white/10 bg-white/5">
              <button className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold shadow-lg shadow-green-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <Check size={18} /> Add All to Pantry
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
