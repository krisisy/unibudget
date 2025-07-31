'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from '../styles/Main.module.css';

export default function Tracker() {
  const [targetDate, setTargetDate] = useState('');
  const [daysRemaining, setDaysRemaining] = useState(null);
  const router = useRouter();
    const [categories, setCategories] = useState([
    { category: 'Food', amount: 0 },
  ]);

  const [entries, setEntries] = useState([]);

  const [formData, setFormData] = useState({
    description: '',
    date: '',
    amount: '',
    category: '',
  });

  // Update categories table
  const handleCategoryChange = (index, field, value) => {
    const updated = [...categories];
    updated[index][field] = value;
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
    if (!formData.description || !formData.date || !formData.amount || !formData.category) {
      alert('Please fill out all fields');
      return;
    }

    setEntries([...entries, formData]);
    setFormData({ description: '', date: '', amount: '', category: '' });
  };

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

  return (
    <div className={styles.budgetPage}>
      <div className={styles.budgetGrid}>

        {/* Left Panel */}
        <div className={styles.budgetLeft}>
          <div className={styles.budgetBox}>

            <h3 className={styles.budgetTitle}>Monthly Budget:</h3>
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

          <div className={styles.savingButtons}>
            <button className={styles.primaryButton}>Save for a car</button>
            <button className={styles.secondaryButton}>+ Add another saving...</button>
          </div>

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
              <td>{entry.amount}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
                
          </div>


            <div className={styles.addEntry}>
              <h2>Add an Entry</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}
