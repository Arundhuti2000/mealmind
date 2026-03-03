import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Settings,
  Moon,
  Sun,
  LogOut,
  Bell,
  Shield,
  CreditCard,
} from "lucide-react";

export default function Profile() {
  const [theme, setTheme] = useState("light"); // Mock state for now
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    memberSince: "Jan 2024",
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-0">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        Profile & Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 text-center"
          >
            <div className="relative inline-block">
              <img
                src={user.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-md object-cover mx-auto"
              />
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                <Settings size={16} />
              </button>
            </div>

            <h2 className="text-xl font-bold mt-4 text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {user.email}
            </p>
            <div className="mt-4 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 rounded-full text-xs font-semibold inline-block">
              Pro Member
            </div>
          </motion.div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
            <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left text-red-500">
              <LogOut size={20} />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <User size={20} className="text-blue-500" /> Account Preferences
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Dietary Restrictions
                  </p>
                  <p className="text-xs text-gray-500">
                    Vegetarian, Gluten-Free
                  </p>
                </div>
                <span className="text-gray-400 text-2xl">›</span>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Allergies
                  </p>
                  <p className="text-xs text-gray-500">Peanuts, Shellfish</p>
                </div>
                <span className="text-gray-400 text-2xl">›</span>
              </div>
            </div>
          </motion.div>

          {/* App Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <Settings size={20} className="text-purple-500" /> App Settings
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                    <Bell size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Notifications
                    </p>
                    <p className="text-xs text-gray-500">
                      Push notifications for expiry alerts
                    </p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6 cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked
                  />
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full peer-checked:bg-blue-500 transition-colors"></div>
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-transform shadow-sm"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                    {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      Appearance
                    </p>
                    <p className="text-xs text-gray-500">System preference</p>
                  </div>
                </div>
                <select className="bg-transparent text-sm font-medium text-gray-600 dark:text-gray-300 outline-none cursor-pointer">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
