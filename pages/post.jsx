import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

export default function Post() {
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const routeData = route.query;

  const submitPost = async (e) => {
    e.preventDefault();

    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timeStamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timeStamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      return route.push("/");
    }
  };

  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-5 p-2 sm:p-12 shadow-lg rounded-lg max-w-md mx-auto">
      <form onSubmit={submitPost}>
        <h1 className="text-lg sm:text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-200 outline-none text-black focus:border-2 focus:border-purple-500 h-48 w-full rounded-lg p-2 text-sm"
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? "text-red-500" : ""
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          disabled={
            post.description.length > 300 || post.description.length === 0
              ? true
              : false
          }
          className={`w-full text-white font-medium p-2 my-2 rounded-lg text-sm ${
            post.description.length > 300 || post.description.length === 0
              ? "bg-gray-500"
              : "bg-purple-600"
          }`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
