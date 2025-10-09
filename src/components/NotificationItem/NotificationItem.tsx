import styles from "./NotificationItem.module.css";

interface Props {
    type: "income" | "outcome" | "token" | "alert";
    message: string;
    date: string;
    read: boolean;
}

const NotificationItem = ({ type, message, date, read }: Props) => {
    const typeLabel =
        type === "income"
        ? "Доход"
        : type === "outcome"
        ? "Расход"
        : type === "token"
        ? "Новый токен"
        : "Алерт";

    return (
        <div
        className={`${styles.item} ${read ? styles.read : styles.unread}`}
        data-type={type}
        >
        <div className={styles.top}>
            <span className={styles.type}>{typeLabel}</span>
            <span className={styles.date}>{date}</span>
        </div>
        <p className={styles.message}>{message}</p>
        </div>
    );
    };

export default NotificationItem;
