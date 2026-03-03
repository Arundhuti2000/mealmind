import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "../ThemeToggle";
import { Toaster } from "react-hot-toast";
import { Sparkles } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans selection:bg-blue-500/30">
      {/* Background Grids */}
      <div className="fixed inset-0 genie-grid opacity-30 pointer-events-none z-0" />
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] animate-blob opacity-50 dark:opacity-30" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000 opacity-50 dark:opacity-30" />
      </div>

      <Sidebar />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight">MealMind</span>
        </div>
        <ThemeToggle />
      </div>

      <main className="md:pl-64 min-h-screen pt-20 pb-24 md:py-0 relative z-10 transition-all duration-300">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>

      <MobileNav />
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "glass-card text-foreground !bg-background/80 !backdrop-blur-md !border-white/10",
          style: {
            borderRadius: "12px",
            padding: "16px",
          },
        }}
      />
    </div>
  );
};
