"use client";

import { useState } from "react";
import Link from "next/link";
import { ShowPassword, HidePassword } from "@/app/components/icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="px-4 py-8 w-full min-h-[740px] sm:min-h-[950px] lg:min-h-fit flex-1 flex items-center justify-center">
      <div className="card w-full max-w-[560px]">
        <h2 className="card-title">Login</h2>

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
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="btn-basic auth-input px-5 py-3 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <HidePassword /> : <ShowPassword />}
            </button>
          </div>
        </div>

        <button type="submit" className="cursor-pointer my-8 p-4 w-full bg-grey-900 text-white font-bold rounded-lg">
          Login
        </button>

        <div className="text-grey-500 text-sm text-center">
          Need to create an account?{" "}
          <Link href="/sign-up" className="underline font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
