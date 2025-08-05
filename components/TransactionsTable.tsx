"use client";
import { useState } from "react";
import AddTransactionModal from "../app/dashboard/AddTransactionModal";
import EditTransactionModal from "./EditTransactionModal";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TransactionsTable({ transactions, refreshTransactions, loading = false }: any) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTransaction, setEditTransaction] = useState<any>(null);

  const deleteTransaction = async (id: number) => {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    refreshTransactions(); // updates StatsCards instantly
  };

  // Function to get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      'food': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'transport': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'entertainment': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'shopping': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'health': 'bg-red-500/20 text-red-400 border-red-500/30',
      'education': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      'salary': 'bg-green-500/20 text-green-400 border-green-500/30',
      'freelance': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      'investment': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'other': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[category.toLowerCase() as keyof typeof colors] || colors.other;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Recent Transactions</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-md transition"
        >
          <PlusCircle className="mr-2" size={18} /> Add
        </button>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Loader2 size={48} className="text-blue-400" />
            </motion.div>
            <p className="text-gray-400 text-lg font-medium">Loading transactions...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your data</p>
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-gray-400 p-6 text-center">No transactions yet.</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {transactions.map((txn: any) => (
              <motion.li
                key={txn.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between items-start p-4 hover:bg-gray-700 transition"
              >
                {/* Left */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold">{txn.title}</p>
                    {/* Expense/Income Tag */}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                        txn.type === "income"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}
                    >
                      {txn.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(txn.category)} border`}>
                      {txn.category}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{txn.date}</span>
                  </div>
                </div>
                {/* Right */}
                <div className="flex items-center gap-3">
                  <p
                    className={`font-bold ${
                      txn.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {txn.type === "income" ? "+" : "-"}${txn.amount}
                  </p>
                  <button
                    onClick={() => setEditTransaction(txn)}
                    className="text-yellow-400 hover:text-yellow-300"
                    title="Edit transaction"
                    aria-label="Edit transaction"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteTransaction(txn.id)}
                    className="text-red-500 hover:text-red-400"
                    title="Delete transaction"
                    aria-label="Delete transaction"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onAdded={refreshTransactions}
        />
      )}
      {editTransaction && (
        <EditTransactionModal
          transaction={editTransaction}
          onClose={() => setEditTransaction(null)}
          onUpdated={refreshTransactions}
        />
      )}
    </div>
  );
}
