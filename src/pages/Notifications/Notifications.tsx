import { useEffect, useState,  } from "react";
import NotificationList from "../../components/NotificationList/NotificationList";
import { useNavigate } from "react-router-dom";
import styles from "./Notifications.module.css";

interface Notification {
    id: number;
    type: "income" | "outcome" | "token" | "alert";
    message: string;
    date: string;
    read: boolean;
}

export default function Notifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const navigate = useNavigate();

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "income",
        message: "Получено 0.42 ETH от 0xA1B2...",
        date: "2025-10-09 19:30",
        read: false,
      },
      {
        id: 2,
        type: "outcome",
        message: "Отправлено 120 USDT на 0xC3D4...",
        date: "2025-10-09 18:50",
        read: true,
      },
      {
        id: 3,
        type: "token",
        message: "Добавлен новый токен: ARB",
        date: "2025-10-08 14:20",
        read: true,
      },
    ]);
  }, []);

    return (
        <div className={styles.page}>
            <span onClick={() => navigate("/")} className={styles.backSpan}>&lt;-</span>
            <h2 className={styles.title}>Уведомления</h2>
            <NotificationList data={notifications} />
        </div>
    );
};

