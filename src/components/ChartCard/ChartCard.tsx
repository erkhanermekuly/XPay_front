import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styles from "./ChartCard.module.css";

export default function ChartCard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.etherscan.io/v2/api?chainid=1", {
        params: {
          module: "account",
          action: "txlist",
          address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          startblock: 0,
          endblock: 99999999,
          sort: "asc",
          apikey: import.meta.env.VITE_ETHERSCAN_KEY,
        },
      });

      console.log("Ответ от Etherscan:", res.data);

      const txs = res.data.result;

      const formatted = txs.slice(-15).map((tx: any) => ({
        date: new Date(tx.timeStamp * 1000).toLocaleDateString("en-US"),
        value: parseFloat(tx.value) / 1e18,
      }));

      console.log("Данные для графика:", formatted);

      setData(formatted);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchTransactions();
}, []);

  if (loading) {
    return <p className={styles.loading}>Loading chart...</p>;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>Transaction Analytics</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4A90E2"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
