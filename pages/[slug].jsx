import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import { auth, db } from "../utils/firebase";

export default function Details() {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const submitMessage = async () => {
    if (!auth.currentUser) {
      return router.push("/auth/login");
    }
    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data()?.comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);

  return (
    <div className="w-full">
      <Message {...routeData}>
        <div className="my-4 ">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={message}
              placeholder="Send a message 💬"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className={`bg-gray-200 outline-none placeholder:text-black w-full p-2 text-black text-sm rounded-lg focus:border-2 focus:border-purple-500`}
            />
            <button
              onClick={submitMessage}
              disabled={
                message.length === 0 || message.length > 150 ? true : false
              }
              className={`${
                message.length === 0 || message.length > 150
                  ? "bg-gray-500"
                  : "bg-purple-500"
              } font-bold text-white py-2 px-4 text-sm rounded-lg`}
            >
              Submit
            </button>
          </div>

          <div className="py-6">
            <h3 className="font-bold">Comments</h3>
            {allMessages?.map((singleMessage) => (
              <div
                className="bg-white p-4 my-4 border-2 rounded-xl"
                key={singleMessage.time}
              >
                <h2 className="text-md sm:text-xl font-medium">
                  {singleMessage.username}
                </h2>
                <h3>{singleMessage.message}</h3>
              </div>
            ))}
          </div>
        </div>
      </Message>
    </div>
  );
}
