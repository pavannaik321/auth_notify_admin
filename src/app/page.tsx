"use client";
import { useEffect, useState } from "react";
import adminAPI from "@/lib/adminApi";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  name: string;
  email: string;
  online: boolean;
};

export default function AdminHome() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    adminAPI.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-md">
          🛠️ Admin Control Center
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {users.map((u) => (
            <div
              key={u._id}
              className="bg-white/60 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-5 transition hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{u.name}</h2>
                  <p className="text-sm text-gray-600">{u.email}</p>
                </div>
                <div className="text-sm">
                  {u.online ? (
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      Online
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-400 font-medium">
                      <span className="inline-block w-2 h-2 bg-gray-400 rounded-full"></span>
                      Offline
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={() => router.push(`/admin/${u._id}`)}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  💬 Message
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
