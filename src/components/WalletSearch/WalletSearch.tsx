import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./WalletSearch.module.css";

const WalletSearch: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const handleTrack = () => {
    if (!walletAddress.trim()) {
      alert("Введите адрес кошелька!");
      return;
    }

    // можно добавить простую валидацию
    if (!walletAddress.startsWith("0x") || walletAddress.length < 20) {
      alert("Введите корректный адрес кошелька (например, 0x123...)");
      return;
    }

    // сохраняем адрес в localStorage, чтобы Dashboard мог его использовать
    localStorage.setItem("trackedWallet", walletAddress);

    // переходим на Dashboard
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wallet Tracker</h1>
      <p className={styles.subtitle}>Введите адрес кошелька Ethereum</p>

      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Например: 0x123abc..."
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleTrack} className={styles.button}>
          Отслеживать
        </button>
      </div>
    </div>
  );
};

export default WalletSearch;
