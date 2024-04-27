import React, { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ type: 'expense', category: '', amount: '', date: '' });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const addTransaction = (event) => {
    event.preventDefault();
    if (!form.category || !form.amount || !form.date) {
      alert("All fields are required!");
      return;
    }
    setTransactions([...transactions, { ...form, id: Date.now() }]);
    setForm({ type: 'expense', category: '', amount: '', date: '' }); // Reset form
  };

  const getTotalExpenses = () => {
    return transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((total, expense) => total + Number(expense.amount), 0);
  };

  const getTotalIncomes = () => {
    return transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((total, income) => total + Number(income.amount), 0);
  };

  const getRemainder = () => {
    return getTotalIncomes() - getTotalExpenses();
  };

  return (
    <div className="App">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <form onSubmit={addTransaction}>
          <select
            name="type"
            value={form.type}
            onChange={handleFormChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select
            name="category"
            value={form.category}
            onChange={handleFormChange}
          >
            {form.type === 'expense' ? (
              <>
                <option value="">Select Category</option>
                <option value="Shopping">Shopping</option>
                <option value="Food">Food</option>
                <option value="Gift">Gift</option>
                <option value="Electricity">Electricity</option>
                <option value="Health">Health</option>
                <option value="Hobbies">Hobbies</option>
              </>
            ) : (
              <>
                <option value="">Select Category</option>
                <option value="Bank Account">Bank Account</option>
                <option value="Salary">Salary</option>
                <option value="Bitcoin">Bitcoin</option>
                <option value="Others">Others</option>
              </>
            )}
          </select>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleFormChange}
            min="0"
          />
          <input
            id="date"
            name="date"
            type="date" // Change type to date for date input
            placeholder="Date"
            value={form.date}
            onChange={handleFormChange}
          />
          <button type="submit">Add Transaction</button>
        </form>

        <section>
          <h2>History</h2>
          <ul id="displayList">
            {transactions.map((transaction) => (
              <li key={transaction.id} className={transaction.type}>
                {`${transaction.category}: ${transaction.type === 'expense' ? '-' : ''}$${transaction.amount} (${transaction.date})`}
              </li>
            ))}
          </ul>
        </section>

        <section className="total">
          <h2>Total Spent: ${getTotalExpenses()}</h2>
          <h2>Total Income: ${getTotalIncomes()}</h2>
          <h2>Remainder: ${getRemainder()}</h2>
        </section>
      </main>
    </div>
  );
}

export default App;