"use client";

import { signIn } from "next-auth/react";

export default function CTA() {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to <span className="text-indigo-400">Master Your Money?</span>
      </h2>
      <p className="text-gray-300 mb-6">
        Sign up today and start tracking your finances effortlessly.
      </p>
      <button
        onClick={() => signIn("keycloak", { callbackUrl: "/dashboard" })}
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-lg transition"
      >
        Get Started Now
      </button>
    </section>
  );
}
