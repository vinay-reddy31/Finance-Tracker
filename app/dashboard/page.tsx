"use client";
import { useEffect, useState } from "react";
import StatsCards from "../../components/StatsCards";
import TransactionsTable from "../../components/TransactionsTable";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <StatsCards transactions={transactions} />
      <TransactionsTable
        transactions={transactions}
        refreshTransactions={fetchTransactions}
        loading={loading}
      />
    </div>
  );
}
