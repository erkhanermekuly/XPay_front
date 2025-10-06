import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const existing = users.find((u: { email: string }) => u.email === email);

    if (existing) {
      toast.error("User with this email already exists ❌", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
      return;
    }

    const newUser = { username: name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    login(name);
    localStorage.setItem("user", JSON.stringify(newUser));

    toast.success("Account created successfully 🎉", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });

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
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>

      <p className={styles.link} onClick={() => navigate("/login")}>
        Already have an account? <span>Login</span>
      </p>
    </div>
  );
}
