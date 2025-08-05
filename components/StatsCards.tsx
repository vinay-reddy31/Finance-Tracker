"use client";

export default function StatsCards({ transactions }: { transactions: any[] }) {
  // Convert amounts to numbers
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const cardStyle =
    "p-4 sm:p-6 rounded-xl shadow-lg backdrop-blur-lg border flex flex-col items-center text-center";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
      {/* Income */}
      <div
        className={`${cardStyle} bg-gradient-to-r from-green-600/80 to-green-400/80 border-green-300/20`}
      >
        <h3 className="text-base sm:text-lg">Income</h3>
        <p className="text-2xl sm:text-3xl font-bold">
          ${totalIncome.toFixed(2)}
        </p>
      </div>

      {/* Expenses */}
      <div
        className={`${cardStyle} bg-gradient-to-r from-red-600/80 to-red-400/80 border-red-300/20`}
      >
        <h3 className="text-base sm:text-lg">Expenses</h3>
        <p className="text-2xl sm:text-3xl font-bold">
          ${totalExpense.toFixed(2)}
        </p>
      </div>

      {/* Balance */}
      <div
        className={`${cardStyle} bg-gradient-to-r from-blue-600/80 to-blue-400/80 border-blue-300/20`}
      >
        <h3 className="text-base sm:text-lg">Balance</h3>
        <p className="text-2xl sm:text-3xl font-bold">
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
