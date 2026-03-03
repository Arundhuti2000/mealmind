import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  UtensilsCrossed,
  ScanLine,
  UserCircle,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { motion } from "framer-motion";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Home", path: "/" },
  { icon: ShoppingBag, label: "Pantry", path: "/pantry" },
  { icon: ShoppingCart, label: "Shop", path: "/list" },
  { icon: ScanLine, label: "Scan Receipt", path: "/scan" },
  { icon: UtensilsCrossed, label: "Recipes", path: "/recipes" },
  { icon: UserCircle, label: "Profile", path: "/profile" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/10 glass-card fixed h-screen z-40 bg-background/50 backdrop-blur-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-8 tracking-tighter">
          MealMind
        </h1>

        <nav className="space-y-2">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? "text-white bg-gradient-to-r from-blue-600/80 to-purple-600/80 shadow-lg shadow-blue-500/20"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Icon
                  size={20}
                  className={`relative z-10 transition-transform group-hover:scale-110 ${isActive ? "animate-pulse" : ""}`}
                />
                <span className="font-medium relative z-10">{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-white/10"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Theme
          </span>
          <ThemeToggle />
        </div>

        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
