import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import WalletSearch from "../../components/WalletSearch/WalletSearch";
import { toast } from "react-toastify";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    // имитация обновления данных
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    toast.success("Wallet data updated!");
  };

  // имитация онлайн-перевода
  const handleSendMoney = () => {
    toast.info("You sent 0.05 ETH to 0xAb12...34F9");
    // тут можно будет сделать реальный POST-запрос на сервер
    // axios.post("/api/transfer", { from, to, amount });
  };

  return (
    <div className={styles.home}>
      <Header />

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.main2}>
            <div className={styles.divki}>
              <button
                className={`${styles.buttonDivki} ${loading ? styles.disabled : ""}`}
                onClick={!loading ? fetchData : undefined}
              >
                <img src="/images/Transfer.png" alt="" className={styles.icon} />
                <p className={styles.text}>
                  {loading ? "Updating..." : "Update"}
                </p>
              </button>
            </div>

            {/* <div className={styles.divki}>
              <button
                className={styles.buttonDivki}
                onClick={handleSendMoney}
              >
                <img src="/images/send.png" alt="" className={styles.icon} />
                <p className={styles.text}>Send Money</p>
              </button>
            </div> */}

            <div className={styles.divki}>
              <button
                className={styles.buttonDivki}
                onClick={() => navigate("/notifications")}
              >
                <img src="/images/notification.png" alt="" className={styles.icon} />
                <p className={styles.text} style={{ marginLeft: "-20px" }}>
                  Notifications
                </p>
              </button>
            </div>

            <div className={styles.divki}>
              <button className={styles.buttonDivki} onClick={handleSendMoney}>
                <img src="/images/Invoice.png" alt="" className={styles.icon} />
                <p className={styles.text}>Invoice</p>
              </button>
            </div>

            <div className={styles.divki}>
              <button
                className={styles.buttonDivki}
                onClick={() => navigate("/BalanceChart")}
              >
                <img src="/images/monitoring.png" alt="" className={styles.icon} />
                <p className={styles.text}>Analytic</p>
              </button>
            </div>
          </div>

          <WalletSearch />
        </div>
      </main>
    </div>
  );
};

export default Home;
