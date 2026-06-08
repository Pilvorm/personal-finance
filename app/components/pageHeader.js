import { FaUserLarge } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";

function ProfileButton() {
  const { data: session, status } = useSession();

  return (
    <button
      onClick={() => {
        if (session) {
          signOut({ redirectTo: "/login" });
        } else {
          router.push("/login");
        }
      }}
      className="cursor-pointer flex lg:hidden items-center gap-4"
    >
      {status === "loading" ? (
        <div className="w-8 h-8 rounded-full bg-grey-500 animate-pulse" />
      ) : session ? (
        <img
          src={session?.user?.image ?? "https://i.pravatar.cc/300"}
          alt="User Avatar"
          className="w-8 h-8 object-cover rounded-full"
        />
      ) : (
        <FaUserLarge />
      )}
    </button>
  );
}

export default function PageHeader({ title, action, fn, profile }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="page-title">{title}</h1>

      {action && (
        <button
          onClick={fn}
          className="hover-invert cursor-pointer p-4 bg-grey-900 rounded-lg text-white text-sm font-bold"
        >
          {action}
        </button>
      )}

      {profile && <ProfileButton />}
    </div>
  );
}