import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Nav() {
  const [user, loading] = useAuthState(auth);
  return (
    <nav className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center py-10">
      <Link href="/">
        <button className="text-2xl font-medium">Socialize</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href="/auth/login">
            <span className="font-medium bg-purple-500 text-white py-2 px-4 text-sm rounded-xl cursor-pointer">
              Join Now
            </span>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-2">
            <Link href="/post">
              <button className="font-medium bg-purple-500 text-white py-2 px-4 text-sm rounded-xl cursor-pointer duration-300 hover:bg-purple-600">
                Post
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="font-bold text-purple-500 hover:bg-gray-100 py-2 px-4 rounded-xl duration-300">
                Dashboard
              </button>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
