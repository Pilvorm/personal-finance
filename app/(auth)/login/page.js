import Link from "next/link";
import { ShowPassword, HidePassword } from "@/app/components/icons";
import { signIn, auth, providerMap } from "@/auth";
import { FaGithub } from "react-icons/fa";
import { AuthError } from "next-auth";

export default async function Login({ searchParams }) {

  const params = await searchParams;

  return (
    <main className="px-4 py-8 w-full min-h-[740px] sm:min-h-[950px] lg:min-h-fit flex-1 flex items-center justify-center">
      <div
        // action={async () => {
        //   "use server";
        //   await signIn("github");
        // }}
        className="card w-full max-w-[560px]"
      >
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

        {/* <div className="mt-4 flex flex-col gap-1">
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
        </div> */}

        <button type="submit" className="submit-btn mt-8">
          Login
        </button>

        <div className="mt-4 pt-4 border-t-1 border-grey-100">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () => {
                "use server";
                try {
                  await signIn(provider.id, {
                    redirectTo: "/",
                  });
                } catch (error) {
                  if (error instanceof AuthError) {
                    // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                  }
                  throw error;
                }
              }}
            >
              <button type="submit" className="auth-btn w-full">
                <div className="flex items-center justify-center gap-4">
                  {provider.name == "GitHub" && <FaGithub size={22} />} Log in
                  with {provider.name}
                </div>
              </button>
            </form>
          ))}
        </div>

        <div className="mt-8 text-grey-500 text-sm text-center">
          Need to create an account?{" "}
          <Link href="/sign-up" className="underline font-bold">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
