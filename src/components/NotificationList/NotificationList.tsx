import NotificationItem from "../NotificationItem/NotificationItem";
import styles from "./NotificationList.module.css";

interface Notification {
  id: number;
  type: "income" | "outcome" | "token" | "alert";
  message: string;
  date: string;
  read: boolean;
}

interface Props {
  data: Notification[];
}

const NotificationList = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return <p className={styles.empty}>Нет уведомлений 📭</p>;
  }

  return (
    <div className={styles.list}>
      {data.map((n) => (
        <NotificationItem
          key={n.id}
          type={n.type}
          message={n.message}
          date={n.date}
          read={n.read}
        />
      ))}
    </div>
  );
};

export default NotificationList;
