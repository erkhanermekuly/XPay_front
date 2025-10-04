import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import styles from "./Register.module.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // достаём уже зарегистрированных пользователей (если есть)
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // проверяем — есть ли пользователь с таким же email
    const existing = users.find((u: { email: string }) => u.email === email);

    if (existing) {
      setError("User with this email already exists");
      return;
    }

    // создаём нового пользователя
    const newUser = { username: name, email, password };

    // добавляем его в массив и сохраняем в localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // сразу логиним и переходим в Dashboard
    login(name);
    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerHeader}>
        <h2 className={styles.title}>Sign up</h2>
        <img src="/images/Xpay.png" alt="Register" className={styles.logo} />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Register
        </button>
      </form>


      {error && <p className={styles.error}>{error}</p>}

      <p className={styles.link} onClick={() => navigate("/login")}>
        Already have an account? <span>Login</span>
      </p>
    </div>
  );
};

export default Register;
