"use client";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then(res => res.json())
      .then(data => {
        // ✅ Convert string totals to numbers for charts
        const formattedData = {
          monthly: data.monthly.map((item: any) => ({
            month: item.month,
            total_income: Number(item.total_income),
            total_expense: Number(item.total_expense),
          })),
          weekly: data.weekly.map((item: any) => ({
            week: item.week,
            total_income: Number(item.total_income),
            total_expense: Number(item.total_expense),
          })),
          daily: data.daily.map((item: any) => ({
            day: item.day,
            total_income: Number(item.total_income),
            total_expense: Number(item.total_expense),
          })),
          categoryExpense: data.categoryExpense.map((item: any) => ({
            category: item.category,
            total: Number(item.total),
          })),
          biggestExpense: data.biggestExpense || null,
        };
        console.log("Formatted Analytics Data:", formattedData);
        setAnalytics(formattedData);
      });
  }, []);

  if (!analytics) return <p className="text-white text-center mt-10">Loading Analytics...</p>;

  const COLORS = ["#4ADE80", "#F87171", "#FACC15", "#60A5FA", "#A78BFA"];

  return (
    <div className="p-6 text-white bg-gradient-to-br from-gray-900 to-indigo-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Analytics Dashboard</h1>

      {analytics.biggestExpense && (
        <div className="bg-gradient-to-r from-red-500 to-red-700 p-4 rounded-xl text-center mb-6 shadow-lg">
          <h2 className="text-lg font-semibold">
            💸 Biggest Expense: {analytics.biggestExpense.title} — ₹{analytics.biggestExpense.amount}
          </h2>
          <p className="text-sm">Category: {analytics.biggestExpense.category}</p>
          <p className="text-sm">Date: {analytics.biggestExpense.date}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Income vs Expense (Monthly) */}
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-xl mb-4 text-center font-semibold">Income vs Expense (Monthly)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.monthly}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_income" fill="#4ADE80" name="Income" />
              <Bar dataKey="total_expense" fill="#F87171" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income vs Expense (Weekly) */}
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-xl mb-4 text-center font-semibold">Income vs Expense (Weekly)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.weekly}>
              <XAxis dataKey="week" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_income" fill="#34D399" name="Income" />
              <Bar dataKey="total_expense" fill="#FB7185" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Income vs Expense (Daily) */}
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-xl mb-4 text-center font-semibold">Income vs Expense (Daily)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.daily}>
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="total_income" fill="#10B981" name="Income" />
              <Bar dataKey="total_expense" fill="#F43F5E" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category-wise Expense */}
        <div className="bg-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h2 className="text-xl mb-4 text-center font-semibold">Category-wise Expense</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.categoryExpense}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {analytics.categoryExpense.map((_: any, index: number) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
