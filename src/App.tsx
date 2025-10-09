import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages & components
import Home from "./pages/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import BalanceChart from "./pages/BalanceChart/BalanceChart";
import Notifications from "./pages/Notifications/Notifications";

/**
 * PrivateRoute — защищает маршруты
 * Если пользователь не авторизован, перенаправляем его на /login
 */
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Уведомления (toastify) */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* Маршрутизация */}
        <Routes>
          {/* Главная страница — поиск кошелька */}
          <Route path="/" element={<Home />} />

          {/* Аутентификация */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Дашборд и графики — защищённые маршруты */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />
          <Route
            path="/balancechart"
            element={
              <PrivateRoute>
                <BalanceChart />
              </PrivateRoute>
            }
          />

          {/* Неверный маршрут → редирект на / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
