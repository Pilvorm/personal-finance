export default function LayoutAuth({ children }) {
  return (
    <div className="flex max-lg:flex-col items-center h-[100vh]">
      <div className="lg:hidden px-10 py-6 w-full flex items-center justify-center bg-grey-900 rounded-b-lg">
        <img
          src="/assets/images/logo-large.svg"
          alt="finance Logo"
          className="w-[122px] h-[22px]"
        />
      </div>

      {/* Hero */}
      <div className="hidden lg:block p-5 relative w-fit h-full">
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

      {children}
    </div>
  );
}
