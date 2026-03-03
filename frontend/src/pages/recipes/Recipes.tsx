import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChefHat,
  Clock,
  Flame,
  Heart,
  Search,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

const mockRecipes = [
  {
    id: 1,
    title: "Spicy Garlic Shrimp Pasta",
    time: "25 min",
    calories: 450,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    description:
      "A quick and easy pasta dish with a kick of garlic and chili flakes.",
  },
  {
    id: 2,
    title: "Avocado Toast with Poached Egg",
    time: "15 min",
    calories: 320,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1525351484163-7529414395d8",
    description:
      "Creamy avocado on sourdough toast topped with a perfectly poached egg.",
  },
  {
    id: 3,
    title: "Grilled Salmon with Asparagus",
    time: "30 min",
    calories: 550,
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d",
    description: "Healthy omega-3 rich salmon fillet with roasted asparagus.",
  },
  {
    id: 4,
    title: "Vegetarian Stir Fry",
    time: "20 min",
    calories: 380,
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    description:
      "Colorful mix of fresh vegetables in a savory soy-ginger sauce.",
  },
];

export default function Recipes() {
  const [activeTab, setActiveTab] = useState("suggested"); // 'suggested' | 'saved'

  return (
    <div className="pb-20 md:pb-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
            <ChefHat className="text-emerald-500" /> Recipes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Discover meals based on your pantry or try something new.
          </p>
        </div>

        <div className="flex bg-white dark:bg-gray-800 p-1 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("suggested")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "suggested"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 shadow-sm"
                : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            Suggested
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "saved"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 shadow-sm"
                : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            Saved
          </button>
        </div>
      </div>

      {/* Generate Section */}
      <div className="mb-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Sparkles className="text-yellow-300" /> AI Recipe Generator
          </h2>
          <p className="mb-6 text-emerald-50">
            Let our AI create a custom recipe based on the ingredients you
            currently have in stock. Validates against your dietary preferences.
          </p>
          <button className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-md transform hover:scale-105 active:scale-95 duration-200">
            Generate Meal Plan
          </button>
        </div>
      </div>

      {/* Recipe Grid */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {activeTab === "suggested" ? "Based on your pantry" : "Your Favorites"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors">
                <Heart
                  size={18}
                  className={
                    activeTab === "saved"
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }
                />
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-white text-xs font-medium flex items-center gap-1">
                <Clock size={12} /> {recipe.time}
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer">
                  {recipe.title}
                </h4>
              </div>

              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                {recipe.description}
              </p>

              <div className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1">
                  <Flame size={14} className="text-orange-500" />
                  {recipe.calories} kcal
                </div>
                <div
                  className={`px-2 py-1 rounded-md ${
                    recipe.difficulty === "Easy"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : recipe.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/30"
                  }`}
                >
                  {recipe.difficulty}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
