import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Trash2,
  Edit3,
  MoreVertical,
  AlertCircle,
} from "lucide-react";

interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate?: string;
}

const mockPantryItems: PantryItem[] = [
  {
    id: "1",
    name: "Almond Milk",
    quantity: 1,
    unit: "L",
    category: "Dairy",
    expiryDate: "2024-03-25",
  },
  {
    id: "2",
    name: "Greek Yogurt",
    quantity: 500,
    unit: "g",
    category: "Dairy",
    expiryDate: "2024-03-10",
  },
  {
    id: "3",
    name: "Chicken Breast",
    quantity: 2,
    unit: "kg",
    category: "Meat",
    expiryDate: "2024-03-15",
  },
  {
    id: "4",
    name: "Spinach",
    quantity: 1,
    unit: "bunch",
    category: "Vegetables",
    expiryDate: "2024-03-08",
  },
  {
    id: "5",
    name: "Pasta",
    quantity: 500,
    unit: "g",
    category: "Grains",
    expiryDate: "2024-06-01",
  },
];

const categories = [
  "All",
  "Dairy",
  "Meat",
  "Vegetables",
  "Fruits",
  "Grains",
  "Spices",
  "Other",
];

export default function Pantry() {
  const [items, setItems] = useState<PantryItem[]>(mockPantryItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate days until expiry
  const getDaysUntilExpiry = (dateStr?: string) => {
    if (!dateStr) return null;
    const today = new Date();
    const expiry = new Date(dateStr);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryColor = (days: number | null) => {
    if (days === null) return "text-gray-400";
    if (days < 0) return "text-red-500 font-bold";
    if (days <= 3) return "text-orange-500 font-bold";
    return "text-green-500";
  };

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Pantry
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your ingredients and track expiration dates.
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Item
        </motion.button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 ring-2 ring-blue-500/20"
                  : "bg-white dark:bg-gray-700/30 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredItems.map((item) => {
            const daysLeft = getDaysUntilExpiry(item.expiryDate);

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-end justify-between mt-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Quantity
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {item.quantity}{" "}
                      <span className="text-sm text-gray-500">{item.unit}</span>
                    </p>
                  </div>

                  {item.expiryDate && (
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-1 flex items-center justify-end gap-1">
                        {daysLeft !== null && daysLeft <= 3 && (
                          <AlertCircle size={12} className="text-orange-500" />
                        )}
                        Expires in
                      </p>
                      <p
                        className={`text-sm font-medium ${getExpiryColor(daysLeft)}`}
                      >
                        {daysLeft} days
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">No items found in your pantry.</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-4 text-blue-500 hover:underline"
          >
            Add your first item
          </button>
        </div>
      )}
    </div>
  );
}
