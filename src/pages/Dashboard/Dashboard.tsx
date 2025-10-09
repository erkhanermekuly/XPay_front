import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [balance, setBalance] = useState<number>(0);
  const [recent, setRecent] = useState<
    { id: number; name: string; amount: number; time: string; type: "income" | "expense" }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 👉 получаем адрес кошелька, сохранённый на экране поиска
  const wallet = localStorage.getItem("trackedWallet") || "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

  const fetchData = async () => {
    setLoading(true);

    try {
      const ETHERSCAN_KEY = import.meta.env.VITE_ETHERSCAN_KEY;

      if (ETHERSCAN_KEY) {
        const res = await axios.get("https://api.etherscan.io/api", {
          params: {
            module: "account",
            action: "txlist",
            address: wallet, // 👈 используем текущий кошелёк
            startblock: 0,
            endblock: 99999999,
            sort: "desc",
            apikey: import.meta.env.VITE_ETHERSCAN_KEY,
          },
        });

        const txs = res.data.result.slice(0, 5);
        const total = txs.reduce((sum: number, tx: any) => sum + parseFloat(tx.value), 0);
        setBalance(total / 1e18);

        const mapped = txs.map((tx: any, i: number) => ({
          id: i + 1,
          name: tx.to ? `To ${tx.to.slice(0, 6)}...` : "Unknown",
          amount: (parseFloat(tx.value) / 1e18).toFixed(4),
          time: new Date(tx.timeStamp * 1000).toLocaleTimeString(),
          type: tx.from.toLowerCase() === wallet.toLowerCase() ? "expense" : "income",
        }));

        setRecent(mapped);
      } else {
        // фейковые данные, если API ключа нет
        await new Promise((res) => setTimeout(res, 1500));
        setBalance(1500);
        setRecent([
          { id: 1, name: "From Binance", amount: "132.55", time: "12:00", type: "income" },
          { id: 2, name: "To Metamask", amount: "42.10", time: "15:45", type: "expense" },
        ]);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* <div className={styles.header}>
        <h1 className={styles.title}>Wallet</h1>
        <p className={styles.balance}>Balance: ${balance.toFixed(2)}</p>
      </div> */}

      {/* 👇 новый блок — показывает текущий адрес кошелька */}
      <div className={styles.walletInfo}>
        <p className={styles.walletLabel}>Текущий кошелёк:</p>
        <p className={styles.walletAddress}>{wallet}</p>
      </div>

      <div className={styles.container}>
        {/* <div className={styles.main}>
          <div className={styles.divki}>
            <button
              className={`${styles.buttonDivki} ${loading ? styles.disabled : ""}`}
              onClick={!loading ? fetchData : undefined}
            >
              <img src="/images/Transfer.png" alt="" className={styles.icon} />
              <p className={styles.text}>{loading ? "Updating..." : "Update"}</p>
            </button>
          </div>

          <div className={styles.divki}>
            <button className={styles.buttonDivki}>
              <img src="/images/notification.png" alt="" className={styles.icon} />
              <p className={styles.text} style={{ marginLeft: "-20px" }}>Notifications</p>
            </button>
          </div>

          <div className={styles.divki}>
            <button className={styles.buttonDivki}>
              <img src="/images/Invoice.png" alt="" className={styles.icon} />
              <p className={styles.text}>Invoice</p>
            </button>
          </div>

          <div className={styles.divki}>
            <button className={styles.buttonDivki} onClick={() => navigate("/BalanceChart")}>
              <img src="/images/monitoring.png" alt="" className={styles.icon} />
              <p className={styles.text}>Analytic</p>
            </button>
          </div>
        </div> */}

        {/* <p className={styles.titleRecent}>Recent</p> */}

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
}
