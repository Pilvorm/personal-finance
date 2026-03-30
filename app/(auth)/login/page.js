export default function Login() {
  return (
    <main className="flex items-center h-[100vh]">
      {/* Hero */}
      <div className="p-5 relative w-fit h-full">
        <img
          src="/assets/images/illustration-authentication.svg"
          alt="Authentication illustration"
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-0 left-0 p-10 h-full flex flex-col justify-between gap-10 text-white">
          <img
            src="/assets/images/logo-large.svg"
            alt="finance Logo"
            className="w-[122px] h-[22px]"
          />
          <div>
            <h1 className="card-title text-white w-9/10">
              Keep track of your money and save for your future
            </h1>
            <p className="mt-6 text-sm">
              Personal finance app puts you in control of your spending. Track
              transactions, set budgets, and add to savings pots easily.
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="card w-full max-w-[560px]">
          <h2 className="card-title">Login</h2>

          <div class="mt-8 flex flex-col gap-1">
            <label htmlFor="email" className="text-xs text-grey-500 font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="btn-basic px-5 py-3"
            />
          </div>

          <div class="mt-4 flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-xs text-grey-500 font-bold"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="btn-basic px-5 py-3"
            />
          </div>

          <button className="my-8 p-4 w-full bg-grey-900 text-white font-bold rounded-lg">
            Login
          </button>

          <div className="text-grey-500 text-sm text-center">
            Need to create an account?{" "}
            <span className="underline font-bold">Sign Up</span>
          </div>
        </div>
      </div>
    </main>
  );
}
