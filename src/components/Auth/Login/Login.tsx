import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify"; // ✅ импортируем уведомления
import "react-toastify/dist/ReactToastify.css"; // ✅ стили уведомлений

import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (found) {
      login(username);
      localStorage.setItem("user", JSON.stringify(found));

      toast.success(`Welcome back, ${username}! 👋`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });

      navigate("/home");
    } else {
      toast.error("Invalid username or password ❌", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginHeader}>
        <h2 className={styles.title}>Login</h2>
        <img src="/images/Xpay.png" alt="Login" className={styles.logo} />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      <p className={styles.link} onClick={() => navigate("/register")}>
        Don’t have an account? <span>Register</span>
      </p>
    </div>
  );
}
