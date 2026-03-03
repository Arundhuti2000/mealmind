import {
  LayoutDashboard,
  Clock,
  AlertTriangle,
  ChefHat,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  alert = false,
}: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`glass-card p-6 rounded-2xl relative overflow-hidden group ${alert ? "border-red-500/30 bg-red-500/5" : ""}`}
  >
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-3 rounded-xl ${alert ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}
      >
        <Icon size={24} />
      </div>
      {alert && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 animate-pulse">
          Action Needed
        </span>
      )}
    </div>
    <div>
      <h3 className="text-muted-foreground text-sm font-medium mb-1">
        {title}
      </h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight">{value}</span>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
    </div>
    {/* Decorative background element */}
    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
      <Icon size={120} />
    </div>
  </motion.div>
);

const RecipeCard = ({ title, time, match, image, cuisine }: any) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-white/10"
  >
    <div className="relative h-48 bg-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-75 group-hover:brightness-100"
      />
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-medium text-white border border-white/10">
          {cuisine}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-white/80 text-xs">
          <span className="flex items-center gap-1">
            <Clock size={12} /> {time} min
          </span>
          <span className="flex items-center gap-1 text-green-400">
            <TrendingUp size={12} /> {match}% Match
          </span>
        </div>
      </div>
    </div>
    <div className="p-4 bg-white/5">
      <div className="w-full bg-gray-700/50 rounded-full h-1.5 mb-4">
        <div
          className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full"
          style={{ width: `${match}%` }}
        />
      </div>
      <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors border border-white/5 active:scale-95">
        View Recipe
      </button>
    </div>
  </motion.div>
);

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Good morning, Alex{" "}
            <span className="animate-wave inline-block">👋</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            You have{" "}
            <span className="text-foreground font-medium">12 items</span>{" "}
            expiring soon. Let's cook something!
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/scan"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <ArrowUpRight size={18} /> Scan Receipt
          </Link>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Pantry Items"
          value="148"
          subtitle=" across 12 categories"
          icon={LayoutDashboard}
        />
        <StatCard
          title="Expiring Soon"
          value="5"
          subtitle=" items within 3 days"
          icon={AlertTriangle}
          alert={true}
        />
        <StatCard
          title="Recipes Available"
          value="24"
          subtitle=" based on your pantry"
          icon={ChefHat}
        />
      </div>

      {/* Today's Suggestions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-yellow-400" size={24} /> Today's
            Suggestions
          </h2>
          <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RecipeCard
            title="Creamy Mushroom Risotto"
            cuisine="Italian"
            time="45"
            match={92}
            image="https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=2670&auto=format&fit=crop"
          />
          <RecipeCard
            title="Spicy Tofu Stir Fry"
            cuisine="Asian"
            time="25"
            match={85}
            image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop"
          />
          <RecipeCard
            title="Avocado Toast with Egg"
            cuisine="Breakfast"
            time="15"
            match={100}
            image="https://images.unsplash.com/photo-1525351440155-ad29fd1fcf34?q=80&w=2588&auto=format&fit=crop"
          />
        </div>
      </div>

      {/* Expiry Alert Banner (Dismissible) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 flex items-start gap-4 relative overflow-hidden"
      >
        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h4 className="font-semibold text-amber-500">Food Waste Alert</h4>
          <p className="text-sm text-amber-500/80 mt-1">
            Your <strong>Organic Milk</strong> and <strong>Spinach</strong> are
            expiring tomorrow. Try making a smoothie or omelet today!
          </p>
        </div>
        <div className="absolute right-4 top-4">
          <button className="text-amber-500/50 hover:text-amber-500 transition-colors">
            Dismiss
          </button>
        </div>
      </motion.div>
    </div>
  );
};
