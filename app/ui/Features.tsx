export default function Features() {
    const features = [
      {
        title: "Track Income",
        desc: "Log multiple income sources and monitor growth over time.",
      },
      {
        title: "Track Expenses",
        desc: "Categorize and analyze where your money goes.",
      },
      {
        title: "Visual Analytics",
        desc: "Beautiful charts to make informed financial decisions.",
      },
    ];
  
    return (
      <section className="grid sm:grid-cols-3 gap-6 py-16">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-indigo-400 mb-2">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </section>
    );
  }
  