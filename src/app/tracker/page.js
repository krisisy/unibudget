import Image from "next/image";
import styles from '../styles/Main.module.css';

export default function Tracker() {
  return (
    <div className={styles.budgetPage}>
      <div className={styles.budgetGrid}>
        {/* Left Panel */}
        <div className={styles.budgetLeft}>
          <div className={styles.budgetBox}>
            <div className={styles.budgetTitle}>Monthly Budget:</div>
            <input type="text" placeholder="0000" className={styles.budgetAmount}></input>
            <div className={styles.budgetDays}>Remaining days: <span className="font-semibold">21</span></div>
          </div>

          <div className={styles.categoryTitle}>Expense per category</div>
          <table className={styles.categoryTable}>
            <tbody>
              <tr><td>Home</td><td>500</td></tr>
              <tr><td>Food</td><td>500</td></tr>
              <tr><td>Transportation</td><td>100</td></tr>
              <tr><td>Education</td><td>0</td></tr>
              <tr><td>Other</td><td>1000</td></tr>
              <tr><td className={styles.textGray}>+ Add category</td><td>0000</td></tr>
            </tbody>
          </table>
        </div>

        {/* Right Panel */}
        <div className={styles.budgetRight}>
          <div className={styles.userHeader}>
            <h2>Welcome, John!</h2>
            <div className={styles.userProfile}>
              <img src="https://avatar.iran.liara.run/public" alt="User" avatar />
              {/* <Image className={styles.avatar} width={`40`} height={`40`} src="https://avatar.iran.liara.run/public" alt="User" avatar/> */}
              <button>▼</button>
            </div>
          </div>

          <div className={styles.savingButtons}>
            <button className={styles.primaryButton}>Save for a car</button>
            <button className={styles.secondaryButton}>+ Add another saving...</button>
          </div>

          <h3 className={styles.breakdownTitle}>Breakdown:</h3>
          <table className={styles.breakdownTable}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.descTable}>Lunch</td>
                <td>Food</td>
                <td>7/20/25</td>
                <td>100</td>
              </tr>
              <tr>
                <td colSpan="4" className={styles.textGray}>+ Add an entry...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
