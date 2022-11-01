import { collection, onSnapshot, query } from "firebase/firestore";
import Head from "next/head";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import { db } from "../utils/firebase";
import Link from "next/link";
import { BiCommentDetail } from "react-icons/bi";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);

  const getPosts = async () => {
    const collectionRef = collection(db, "posts");
    const q = query(collectionRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return unsubscribe;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Head>
        <title>Socialize</title>
        <meta
          name="description"
          content="This is a app where you can share your thoughts and comment on other's posts. Happy posting!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="my-6 text-lg font-medium">
        <h2>Posts around the world</h2>
        {allPosts.map((post) => (
          <Message {...post} key={post.id}>
            <Link href={{ pathname: `/${post.id}`, query: { ...post } }}>
              <button className="text-purple-500 text-md flex gap-2 items-center">
                <BiCommentDetail className="relative top-[3px]" />
                {post.comments?.length > 0 ? post.comments?.length : 0}
              </button>
            </Link>
          </Message>
        ))}
      </div>
    </div>
  );
}
