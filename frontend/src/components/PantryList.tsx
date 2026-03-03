import { motion } from "framer-motion";
import type { ParsedItem } from "../types";
import { Tag, Scale, Package } from "lucide-react";

interface PantryListProps {
  items: ParsedItem[];
}

export const PantryList = ({ items }: PantryListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mt-12 px-4 pb-20">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
            <Tag size={16} className="text-blue-400" />
          </div>

          <h3 className="text-xl font-semibold mb-2 text-foreground capitalize">
            {item.name}
          </h3>

          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Scale size={14} />
              <span>
                {item.quantity} {item.unit || "units"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Package size={14} />
              <span className="capitalize">{item.category}</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
};
