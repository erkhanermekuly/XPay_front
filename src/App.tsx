import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages & components
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import BalanceChart from "./pages/BalanceChart/BalanceChart";

/**
 * Компонент PrivateRoute защищает маршруты:
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
        {/* ToastContainer — глобальный компонент уведомлений */}
        <ToastContainer
          position="top-right"
          autoClose={3000} // уведомления исчезают через 3 секунды
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" // стиль уведомлений
        />

        {/* Все маршруты приложения */}
        <Routes>
          {/* Если пользователь просто зайдет на / — переадресуем на /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Страницы аутентификации */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/balancechart"
            element={
              <PrivateRoute>
                <BalanceChart />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
