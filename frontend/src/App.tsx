import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { LoginPage } from "./pages/auth/Login";
import { SignupPage } from "./pages/auth/Register";
import { Dashboard } from "./pages/dashboard/Home";
import { ScanReceiptPage } from "./pages/Scanning/ScanReceipt";
import Pantry from "./pages/pantry/Pantry";
import Recipes from "./pages/recipes/Recipes";
import Profile from "./pages/profile/Profile";
import ShoppingList from "./pages/shopping/ShoppingList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes Wrapper */}
        <Route
          path="/"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/scan"
          element={
            <AppLayout>
              <ScanReceiptPage />
            </AppLayout>
          }
        />
        <Route
          path="/pantry"
          element={
            <AppLayout>
              <Pantry />
            </AppLayout>
          }
        />
        <Route
          path="/recipes"
          element={
            <AppLayout>
              <Recipes />
            </AppLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AppLayout>
              <Profile />
            </AppLayout>
          }
        />

        <Route
          path="/list"
          element={
            <AppLayout>
              <ShoppingList />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
