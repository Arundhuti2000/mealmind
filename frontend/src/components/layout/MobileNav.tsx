import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  ShoppingCart,
  UtensilsCrossed,
  ScanLine,
  UserCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const mobileLinks = [
  { icon: LayoutDashboard, path: "/", label: "Home" },
  { icon: ShoppingBag, path: "/pantry", label: "Pantry" },
  { icon: ShoppingCart, path: "/list", label: "Shop" },
  { icon: ScanLine, path: "/scan", label: "Scan" },
  { icon: UtensilsCrossed, path: "/recipes", label: "Recipes" },
  { icon: UserCircle, path: "/profile", label: "Profile" },
];

export const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-white/10 z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-blue-500" : "text-muted-foreground"
              }`}
            >
              <div className="relative">
                <Icon
                  size={20}
                  className={isActive ? "scale-110 transition-transform" : ""}
                />
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
