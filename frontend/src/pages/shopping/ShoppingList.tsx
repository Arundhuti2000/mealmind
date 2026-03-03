import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  ShoppingCart,
  Check,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

const mockShoppingItems: ShoppingItem[] = [
  { id: "1", name: "Olive Oil", category: "Pantry", checked: false },
  { id: "2", name: "Garlic", category: "Vegetables", checked: false },
  { id: "3", name: "Salmon Fillet", category: "Meat", checked: false },
  { id: "4", name: "Lemon", category: "Fruits", checked: true },
  { id: "5", name: "Milk", category: "Dairy", checked: true },
];

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(mockShoppingItems);
  const [newItemName, setNewItemName] = useState("");

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: "Uncategorized",
      checked: false,
    };

    setItems([newItem, ...items]);
    setNewItemName("");
  };

  const toggleCheck = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearChecked = () => {
    setItems(items.filter((item) => !item.checked));
  };

  const pendingItems = items.filter((item) => !item.checked);
  const checkedItems = items.filter((item) => item.checked);

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent flex items-center gap-2">
            <ShoppingCart className="text-pink-500" /> Shopping List
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Track what you need to buy. Syncs with your pantry.
          </p>
        </div>

        <button
          onClick={clearChecked}
          className="text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Trash2 size={16} /> Clear Completed
        </button>
      </div>

      {/* Add Item Input */}
      <form onSubmit={handleAddItem} className="mb-8 relative">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add something to your list..."
          className="w-full pl-6 pr-14 py-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-pink-500/10 border-none focus:ring-2 focus:ring-pink-500 outline-none text-lg transition-all"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-2 rounded-xl shadow-md hover:bg-pink-600 transition-colors"
        >
          <Plus size={20} />
        </button>
      </form>

      {/* Suggested Items (Mock) */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          <RefreshCw size={14} /> Suggested Replenishments
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {["Eggs", "Bread", "Butter"].map((item) => (
            <button
              key={item}
              onClick={() =>
                setItems([
                  ...items,
                  {
                    id: Date.now().toString() + item,
                    name: item,
                    category: "Suggested",
                    checked: false,
                  },
                ])
              }
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium hover:border-pink-500 hover:text-pink-500 transition-colors shadow-sm whitespace-nowrap"
            >
              <Plus size={14} /> {item}
            </button>
          ))}
        </div>
      </div>

      {/* Shopping Items List */}
      <div className="space-y-6">
        <AnimatePresence>
          {items.some((i) => !i.checked) && (
            <div className="space-y-3">
              {pendingItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleCheck(item.id)}
                      className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-pink-500 transition-colors flex items-center justify-center"
                    ></button>
                    <span className="font-medium text-gray-800 dark:text-gray-100 text-lg">
                      {item.name}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-500">
                      {item.category}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {items.some((i) => i.checked) && (
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 ml-2">
                Completed
              </h3>
              <div className="space-y-2">
                {checkedItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-transparent"
                  >
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className="w-6 h-6 rounded-full bg-pink-500 border-2 border-pink-500 flex items-center justify-center text-white"
                      >
                        <Check size={14} strokeWidth={3} />
                      </button>
                      <span className="font-medium text-gray-500 line-through">
                        {item.name}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-gray-300 hover:text-red-400 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
            <p>Your shopping list is empty.</p>
          </div>
        )}
      </div>

      {checkedItems.length > 0 && (
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-24 right-6 md:bottom-8 md:right-8 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg shadow-green-500/30 font-bold flex items-center gap-2 hover:bg-green-600 transition-colors z-30"
        >
          Add to Pantry <ArrowRight size={18} />
        </motion.button>
      )}
    </div>
  );
}
