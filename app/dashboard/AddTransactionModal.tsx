"use client";
import { useState } from "react";

export default function AddTransactionModal({ onClose, onAdded }: any) {
  const [form, setForm] = useState({
    type: "income",
    title: "",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Investment",
    "Business",
    "Other Income",
  ];
  const expenseCategories = [
    "Food",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Groceries",
    "Healthcare",
    "Travel",
    "Education",
    "Other Expense",
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // Fix timezone issue by adding time component
    const dateWithTime = form.date + 'T12:00:00';
    const formData = {
      ...form,
      date: new Date(dateWithTime).toISOString().split('T')[0]
    };
    
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    onAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-gray-900 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="transaction-type" className="block text-sm font-medium mb-1">
            Transaction Type
          </label>
          <select
            id="transaction-type"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value, category: "" })
            }
            className="w-full p-2 bg-gray-800 rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded"
            required
          />
          <label htmlFor="transaction-category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="transaction-category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded"
            required
          >
            {/* options rendered below */}
            <option value="">Select Category</option>
            {(form.type === "income"
              ? incomeCategories
              : expenseCategories
            ).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <label htmlFor="transaction-date" className="block text-sm font-medium mb-1 mt-2">
            Date
          </label>
          <input
            id="transaction-date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full p-2 bg-gray-800 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-600 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
