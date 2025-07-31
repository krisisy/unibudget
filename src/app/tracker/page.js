'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from '../styles/Main.module.css';

export default function Tracker() {
  const [targetDate, setTargetDate] = useState('');
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [rows, setRows] = useState([
    {category: "Others", amount: 1000}
  ]);
  const [linkedRows, setLinkedRows] = useState([
  { selectedCategory: '' }
  ]);
  const router = useRouter();

  // Log out functionality
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST'})
    router.push('/login')
  }

  // Setting up the date
  const calculateDaysRemaining = (dateString) => {
    const today = new Date();
    const selectedDate = new Date(dateString);
    
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    const diffInTime = selectedDate - today;

    const diffInDays = Math.ceil(diffInTime / (1000 * 60 * 60 * 24));
    return diffInDays;
  };

  useEffect(() => {
    if (targetDate) {
      const days = calculateDaysRemaining(targetDate);
      setDaysRemaining(days);
    }
  }, [targetDate]);

  // Handling category change
  const handleAddRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { category: '', amount: 0}]);
  };

  const addLinkedRow = () => {
    setLinkedRows([...linkedRows, { selectedCategory: ''}]);
  };

  const handleLinkedChange = (index, value) => {
    const updated = [...linkedRows];
    updated[index].selectedCategory = value;
    setLinkedRows(updated);
  };

  const getCategories = () => {
    return rows
      .filter((row) => row.category.trim !== '')
      .map((row, i) => (
        <option key={i} value={row.category}>
          {row.category}
        </option>
      ));
  };

  return (
    <div className={styles.budgetPage}>
      <div className={styles.budgetGrid}>

        {/* Left Panel */}
        <div className={styles.budgetLeft}>
          <div className={styles.budgetBox}>

            <span className={styles.budgetTitle}>Monthly Budget:</span>
            <input type="number" placeholder="0000" min="0" id="1" className={styles.budgetAmount}></input> <br />
            
            <label htmlFor="dateInput">End date:</label>

              <input 
                className={styles.budgetDate}
                type="date" 
                id="dateInput"
                placeholder="0"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)} />

            <div className={styles.budgetDays}> 

              {/* Setting remaining days */}
              {daysRemaining !== null && (
                <p style={{ marginTop: '15px' }}>
                  {daysRemaining > 1
                    ? `${daysRemaining} days remaining`
                    : daysRemaining === 1
                    ? '1 day remaining'
                    : daysRemaining === 0
                    ? 'Final day!'
                    : 'Previous goal has passed. Set a new date!'}
                </p>
              )}
            </div>

          </div>
          {/* Categories side */}
          <h2 className={styles.categoryTitle}>Expense per category</h2>
          <table className={styles.categoryTable}>
            <tbody>
              {rows.map((row, index) =>
                <tr key={index}>
                  <td><input 
                      type="text"
                      value={row.category}
                      onChange={(e) => handleAddRow(index, 'category', e.target.value)} />
                  </td>
                  <td><input 
                      type="number"
                      value={row.amount}
                      onChange={(e) => handleAddRow(index, 'amount', e.target.value)} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button onClick={addRow}>+ Add a new category</button>
        </div>

        {/* Right Panel */}
        <div className={styles.budgetRight}>
          <div className={styles.userHeader}>
            <h2>Welcome, John!</h2>
            <div className={styles.userProfile}>
              <img src="https://avatar.iran.liara.run/public" alt="User" avatar="true" />
              {/* <Image className={styles.avatar} width={`40`} height={`40`} src="https://avatar.iran.liara.run/public" alt="User" avatar/> */}
              <button onClick={handleLogout}>Log out</button>
            </div>
          </div>

          <div className={styles.savingButtons}>
            <button className={styles.primaryButton}>Save for a car</button>
            <button className={styles.secondaryButton}>+ Add another saving...</button>
          </div>
          
          <div className={styles.entries}>
            <div className={styles.tableCont}>
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
                    <td className={styles.descTable}>What if!!!!!</td>
                    {linkedRows.map((row, index) =>(
                      <td key={`linked-${index}`}>
                        <select
                          value={row.selectedCategory}
                          onChange={(e) => handleLinkedChange(index, e.target.value)}>
                          {getCategories()}
                        </select>
                      </td>
                    ))}
                    <td>7/20/25</td>
                    <td>100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.addEntry}>
              <h2>Add an Entry</h2>
              {linkedRows.map((row, index) =>(
                <form className={styles.entryForm} key={`linked-${index}`}>
                <select
                  value={row.selectedCategory}
                  onChange={(e) => handleLinkedChange(index, e.target.value)}>
                <option value="">--Select a Category--</option>
                {getCategories()}
                </select>
                <input type="text" placeholder="Write a description" maxLength="50"/>
                <input type="date" placeholder="Date" required/>
                <input type="number" placeholder="Amount" required/>
                
                <button className={styles.entryBtn}>Add Entry</button>
                
              </form>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
