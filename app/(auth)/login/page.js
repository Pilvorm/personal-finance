import Link from "next/link";
import { ShowPassword, HidePassword } from "@/app/components/icons";
import Input from "@/app/components/input";
import { signIn, auth, providerMap } from "@/auth";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthError } from "next-auth";

export default async function Login({ searchParams }) {
  const params = await searchParams;

  return (
    <main className="px-4 py-8 w-full min-h-[740px] sm:min-h-[950px] lg:min-h-fit flex-1 flex items-center justify-center">
      <div className="card w-full max-w-[560px]">
        <h2 className="card-title">Login</h2>

        <form
          action={async (formData) => {
            "use server";

            const email = formData.get("email");

            await signIn("resend", {
              email: String(email),
              redirectTo: "/",
            });
          }}
        >
          <div className="mt-8 flex flex-col gap-1">
            <label htmlFor="email" className="text-xs text-grey-500 font-bold">
              Email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              required
              className="btn-basic auth-input px-5 py-3"
            />
          </div>

          <button type="submit" className="submit-btn mt-8">
            Send Magic Link
          </button>
        </form>

        <div className="my-4 flex items-center justify-center gap-2">
          <div className="w-full h-[1px] bg-grey-100 "></div>
          <span className="text-sm text-grey-500">or</span>
          <div className="w-full h-[1px] bg-grey-100 "></div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          {Object.values(providerMap)
            .filter((provider) => provider.id !== "resend")
            .map((provider) => (
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
                    {provider.name == "GitHub" && <FaGithub size={22} />}
                    {provider.name == "Google" && <FcGoogle size={22} />}
                    Log in with {provider.name}
                  </div>
                </button>
              </form>
            ))}
        </div>
      </div>
    </main>
  );
}
