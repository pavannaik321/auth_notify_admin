"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import adminAPI from "@/lib/adminApi";
import toast from "react-hot-toast";

export default function AdminMessageUser() {
  const { userId } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return toast.error("Message can't be empty");

    await adminAPI.post("/admin/send-message", {
      userId,
      message,
    });

    toast.success("Message sent successfully!");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-8 ring-1 ring-gray-200">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="text-sm px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition text-gray-700"
          >
            ← Back
          </button>
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold text-gray-800">📤 Send Message</h2>
            <p className="text-gray-500 text-sm mt-1">
              Youre messaging user ID: <span className="font-medium">{userId}</span>
            </p>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-medium">Message</label>
          <textarea
            rows={5}
            className="w-full border border-gray-300 p-4 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none text-gray-800"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={sendMessage}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            ✈️ Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
