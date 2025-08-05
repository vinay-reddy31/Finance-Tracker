"use client";
import { useState } from "react";

export default function EditTransactionModal({ transaction, onClose, onUpdated }: any) {
  const [form, setForm] = useState(transaction);

  const handleUpdate = async () => {
    await fetch(`/api/transactions/${transaction.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-gray-900 p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
        <label htmlFor="edit-transaction-title" className="block text-sm font-medium mb-1 text-gray-200">
          Title
        </label>
        <input
          id="edit-transaction-title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
          placeholder="Transaction title"
        />
        <label htmlFor="edit-transaction-amount" className="block text-sm font-medium mb-1 text-gray-200">
          Amount
        </label>
        <input
          id="edit-transaction-amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: parseFloat(e.target.value) })}
          className="w-full mb-3 p-2 rounded bg-gray-800 text-white"
          placeholder="Amount"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-400"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
