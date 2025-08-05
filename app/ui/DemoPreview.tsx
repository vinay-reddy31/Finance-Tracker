export default function DemoPreview() {
    return (
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-indigo-400">See It In Action</h2>
        <p className="text-gray-300 mb-8">
          Here’s a sneak peek of your future financial dashboard.
        </p>
        <div className="bg-slate-800 rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
          {/* Fake dashboard boxes */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-500 p-4 rounded text-white">Income: $5,000</div>
            <div className="bg-red-500 p-4 rounded text-white">Expenses: $2,500</div>
            <div className="bg-green-500 p-4 rounded text-white">Balance: $2,500</div>
          </div>
          {/* Fake chart area */}
          <div className="bg-slate-700 h-40 rounded-lg flex items-center justify-center text-gray-400">
            📊 Analytics Chart Placeholder
          </div>
        </div>
      </section>
    );
  }
  