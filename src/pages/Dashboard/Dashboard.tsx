import { useState, useEffect } from "react";
import styles from "./Dashboard.module.css"; 

const Dashboard = () => {
  const [balance, setBalance] = useState<number>(0);
  const [recent, setRecent] = useState<
    { id: number; name: string; amount: number; time: string; type: "income" | "expense" }[]
  >([]);
  const [loading, setLoading] = useState(false);
  // Симуляция загрузки данных (API запрос)
  const fetchData = async () => {
    setLoading(true);

    await new Promise((res) => setTimeout(res, 1500)); // имитация 1.5 сек запроса

    const fakeData = {
      balance: Math.floor(Math.random() * 20000),
      recent: [
        {
          id: 1,
          name: "From Binance",
          amount: (100 + Math.random() * 200).toFixed(3),
          time: "12:00",
          type: "income",
        },
        {
          id: 2,
          name: "From Kaspi",
          amount: (50 + Math.random() * 100).toFixed(3),
          time: "16:00",
          type: "expense",
        },
      ],
    };

    setBalance(fakeData.balance);
    setRecent(fakeData.recent);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Wallet</h1>
        <p className={styles.balance}>Balance: ${balance.toFixed(2)}</p>
      </div>

      <div className={styles.container}>
        <div className={styles.main}>
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

          <div className={styles.divki}>
            <button className={styles.buttonDivki}>
              <img src="/images/Send.png" alt="" className={styles.icon} />
              <p className={styles.text}>Send</p>
            </button>
          </div>

          <div className={styles.divki}>
            <button className={styles.buttonDivki}>
              <img src="/images/Invoice.png" alt="" className={styles.icon} />
              <p className={styles.text}>Invoice</p>
            </button>
          </div>

          <div className={styles.divki}>
            <button className={styles.buttonDivki}>
              <img src="/images/up.png" alt="" className={styles.icon} />
              <p className={styles.text}>Top Up</p>
            </button>
          </div>
        </div>

        <p className={styles.titleRecent}>Recent</p>

        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
            <p>Loading latest data...</p>
          </div>
        ) : (
          <div className={styles.recent}>
            {recent.map((item) => (
              <div key={item.id} className={styles.recentItem}>
                <div
                  className={
                    item.type === "income"
                      ? styles.divkiRecentIncome
                      : styles.divkiRecentExpense
                  }
                >
                  <img
                    src={item.type === "income" ? "/images/+.png" : "/images/-.png"}
                    alt=""
                    className={styles.avatar}
                  />
                </div>
                <div className={styles.divkiRecentText}>
                  <p className={styles.text1}>{item.name}</p>
                  <p className={styles.text1}>${item.amount}</p>
                </div>
                <div className={styles.divkiRecentText2}>
                  <p className={styles.text2}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
