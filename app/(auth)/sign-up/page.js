"use client";

import { useState } from "react";
import Link from "next/link";
import { ShowPassword, HidePassword } from "@/app/components/icons";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="px-4 py-8 flex-1 flex items-center justify-center">
      <div className="card w-full max-w-[560px]">
        <h2 className="card-title">Sign Up</h2>

        <div className="mt-8 flex flex-col gap-1">
          <label htmlFor="email" className="text-xs text-grey-500 font-bold">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="btn-basic auth-input px-5 py-3"
          />
        </div>

        <div className="mt-8 flex flex-col gap-1">
          <label htmlFor="email" className="text-xs text-grey-500 font-bold">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="btn-basic auth-input px-5 py-3"
          />
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <label htmlFor="password" className="text-xs text-grey-500 font-bold">
            Create Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="btn-basic px-5 py-3 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <HidePassword /> : <ShowPassword />}
            </button>
            <div className="mt-1 text-right text-xs text-grey-500">Password must be at least 8 characters</div>
          </div>
        </div>

        <button type="submit" className="cursor-pointer my-8 p-4 w-full bg-grey-900 text-white font-bold rounded-lg">
          Create Account
        </button>

        <div className="text-grey-500 text-sm text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline font-bold">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
