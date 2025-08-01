'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from '../styles/Main.module.css';

export default function Tracker() {
  const [savings, setSavings] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [history, setHistory] = useState([]);
  const [entries, setEntries] = useState([]);
  const [categories, setCategories] = useState([
    { category: 'Education', amount: 0 },
  ]);
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    amount: '',
    category: '',
  });
  const router = useRouter();
  
  // Update categories table
  const handleCategoryChange = (index, field, value) => {
    const updated = [...categories];
    updated[index][field] = field === 'amount' ? Number(value) : value;
    setCategories(updated);
  };

  const addCategory = () => {
    setCategories([...categories, { category: '', amount: 0 }]);
  };

  // Form input handling
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form and add to entries
  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, date, category, amount, } = formData;
    const amountNum = Number(amount);

    if (!formData.description || !formData.date || !formData.amount || formData.amount <= 0 || !formData.category) {
      alert('Please fill out all fields');
      return;
    }
    const updatedCategories = [...categories];
    const categoryIndex = categories.findIndex((cat) => cat.category === category);
    const cat = updatedCategories[categoryIndex];
    // if (categoryIndex === -1) return alert('Invalid category');

    if (amountNum > savings) return alert('Not enough savings');
    if (amountNum > cat.amount) return alert('Not enough budget in selected category');
    
    updatedCategories[categoryIndex].amount -= amountNum;

    setSavings((prev) => prev - amountNum);
    setCategories(updatedCategories);

    const newEntry = { category, amount: amountNum, description, date };
    setEntries([newEntry, ...entries]);
    setFormData({ description: '', date: '', amount: '', category: '' });
  };

  // Log out functionality
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST'})
    router.push('/login')
  }

  useEffect(() => {
    if (!targetDate) return;

    const today = new Date();
    const target = new Date(targetDate);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    setDaysRemaining(diff);

    if (diff < 0 && savings > 0) {
      // Save to history
      const monthKey = today.toLocaleString('default', { month: 'short', year: 'numeric' });

      const updatedHistory = [
        { month: monthKey, amount: savings },
        ...history,
      ];
      const trimmedHistory = updatedHistory.slice(0, 6);
      setHistory(trimmedHistory);

      // Reset savings
      setSavings('');
    }
  }, [targetDate]);

  return (
    <div className={styles.budgetPage}>
      <div className={styles.budgetGrid}>

        {/* Left Panel */}
        <div className={styles.budgetLeft}>
          <div className={styles.budgetBox}>

            <h3 className={styles.budgetTitle}>Monthly Budget:</h3>
            <input type="number" 
              className={styles.budgetAmount}
              value={savings}
              onChange={(e) => setSavings(Number(e.target.value))}
              placeholder="0000" 
              min="0" 
              id="1" /> <br />
            <p><strong>Remaining Savings: </strong>{savings.toLocaleString()}</p>
            
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
              {targetDate && (
                <p>
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
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={cat.category}
                    onChange={(e) => handleCategoryChange(index, 'category', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={cat.amount}
                    onChange={(e) => handleCategoryChange(index, 'amount', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className={styles.addCatBtn} onClick={addCategory}>+ Add Category</button>
        </div>

        {/* Right Panel */}
        <div className={styles.budgetRight}>
          <div className={styles.userHeader}>
            <div className={styles.userProfile}>
              <img src="https://avatar.iran.liara.run/public" alt="User" avatar="true" />
            </div>
            <h2>Start Tracking!</h2>
            
              {/* <Image className={styles.avatar} width={`40`} height={`40`} src="https://avatar.iran.liara.run/public" alt="User" avatar/> */}
            <button className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
            
          </div>
        
          <div className={styles.rightMost}>
          {/* Entries table */}
            <div className={styles.entries}>
              <div className={styles.tableCont}>
                <table className={styles.breakdownTable}>
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry, index) => (
                      <tr key={index}>
                        <td className={styles.descTable}>{entry.description}</td>
                        <td>{entry.category}</td>
                        <td>{entry.amount.toLocaleString()}</td>
                        <td>{entry.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
              <div className={styles.rightMost}>
                <div className={styles.addEntry}>
                  <h2>Add an Entry</h2>

                  {/* Entries form */}
                  <form className={styles.entryForm} onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleFormChange}
                    />
                    <select
                      className={styles.catSelect}
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                    >
                      <option value="" className={styles.catOptions}>Select Category</option>
                      {categories
                        .filter((cat) => cat.category.trim() !== '')
                        .map((cat, i) => (
                          <option className={styles.catOptions} key={i} value={cat.category}>
                            {cat.category}
                          </option>
                        ))}
                    </select>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                    />
                    <input
                      type="number"
                      name="amount"
                      placeholder="Amount"
                      value={formData.amount}
                      onChange={handleFormChange}
                    />
                    <button type="submit" className={styles.entryBtn}>+ Add Entry</button>
                  </form>
                  
                </div>

                {/* History */}
                <div className={styles.historyCont}>
                  <h2>History</h2>
                  {history.length === 0 ? (
                  <p>No savings history yet.</p>
                ) : (
                  <table className={styles.categoryTable}>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Saved Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((item, index) => (
                        <tr key={index}>
                          <td>{item.month}</td>
                          <td>{item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
