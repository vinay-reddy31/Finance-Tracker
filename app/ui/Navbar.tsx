"use client";

import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold text-indigo-400">Finance Tracker</h1>
      <button
        onClick={() => signIn("keycloak", { callbackUrl: "/dashboard" })}
        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition"
      >
        Sign In / Sign Up
      </button>
    </nav>
  );
}
