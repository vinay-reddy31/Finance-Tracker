"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <main className="min-h-screen text-white px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
        >
          Track Your <span className="text-blue-400">Finances</span> Like a Pro 💰
        </motion.h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 mb-8">
          Manage your income, control expenses, and gain insights with a
          beautiful analytics dashboard.
        </p>

        {/* Mini Dashboard Preview */}
        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Finance Overview</h2>
          <div className="grid grid-cols-3 gap-4 text-black">
            <div className="bg-green-400 p-3 rounded-md">
              <p className="text-sm">Income</p>
              <p className="text-lg font-bold">$5,000</p>
            </div>
            <div className="bg-red-400 p-3 rounded-md">
              <p className="text-sm">Expenses</p>
              <p className="text-lg font-bold">$2,500</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-md">
              <p className="text-sm">Balance</p>
              <p className="text-lg font-bold">$2,500</p>
            </div>
          </div>

          {/* Mini Chart Grid */}
          <p className="text-sm mt-6 text-gray-400">
            Blue = Savings, Green = Income Days, Red = Expense Days
          </p>
          <div className="grid grid-cols-10 gap-1 mt-3">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-sm ${
                  i % 5 === 0
                    ? "bg-green-400"
                    : i % 3 === 0
                    ? "bg-red-400"
                    : "bg-blue-400"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-lg transition mt-8">
          Get Started
        </button>
      </div>
    </main>
  );
}
