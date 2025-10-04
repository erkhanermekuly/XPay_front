import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // достаём список зарегистрированных пользователей из localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // ищем пользователя с совпадающими именем и паролем
    const found = users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (found) {
      login(username); // сохраняем активного пользователя через контекст
      localStorage.setItem("user", JSON.stringify(found)); // сохраняем текущего юзера
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
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

      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.link} onClick={() => navigate("/register")}>
        Don’t have an account? <span>Register</span>
      </p>
    </div>
  );
};

export default Login;
