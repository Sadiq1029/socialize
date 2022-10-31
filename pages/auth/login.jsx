import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  const route = useRouter();

  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [user]);

  return (
    <div className="shadow-xl mt-15 p-4 sm:p-10 text-gray-700 rounded-lg">
      <h2 className="text-xl font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-800 w-full rounded-lg flex items-center p-4 gap-2"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-sm sm:text-lg">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}
