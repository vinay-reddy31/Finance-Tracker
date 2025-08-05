import Navbar from "./ui/Navbar"
import Hero from "./ui/Hero";
import Features from "./ui/Features";
import DemoPreview from "./ui/DemoPreview";
import CTA from "./ui/CTA";
import Footer from "./ui/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-900 text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Hero />
        <Features />
        <DemoPreview />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
