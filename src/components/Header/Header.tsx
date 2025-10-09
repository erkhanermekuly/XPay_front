import styles from "./Header.module.css";

const balance = 1234.56; 

export default function Header() {
  return (
    <div className={styles.header}>
        <h1 className={styles.title}>Wallet</h1>
        <p className={styles.balance}>Balance: ${balance.toFixed(2)}</p>
    </div>
  )
}
