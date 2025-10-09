import { useNavigate } from "react-router-dom";
import ChartCard from "../../components/ChartCard/ChartCard";
import styles from "./BalanceChart.module.css";

export default function BalanceChart() {
    const navigate = useNavigate();

    return (
    <div className={styles.container}>
        <span onClick={() => navigate("/")} className={styles.backSpan}>&lt;-</span>
        <h2 className={styles.title}>Ethereum Analytics</h2>
        <ChartCard />
    </div>
    );
}


