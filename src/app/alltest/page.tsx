"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  DocumentData,
} from "firebase/firestore";


type Test = {
  id: string;
  testName: string;
  startTime: string; // ISO string
  createdAt?: string;
};

export default function AdminShowTests() {
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const q = query(collection(db, "tests"), orderBy("startTime", "asc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data: Test[] = snapshot.docs
        .map((doc) => {
          const raw: DocumentData = doc.data();
          return {
            id: doc.id,
            testName: raw.testName ?? "Untitled",
            startTime:
              raw.startTime?.toDate?.().toISOString() ?? new Date(0).toISOString(),
            createdAt:
              raw.createdAt?.toDate?.().toISOString() ?? undefined,
          };
        })
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

      setTests(data);
    });

    return () => unsub();
  }, []);

  return (
    <>

      <div className="min-h-screen bg-gray-50 px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          🧾 All Created Tests
        </h2>

        {tests.length === 0 ? (
          <p className="text-center text-gray-500">No tests available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tests.map((test) => {
              const start = new Date(test.startTime);
              const created = test.createdAt ? new Date(test.createdAt) : null;
              const now = new Date();
              const isLive = start <= now;

              return (
                <div
                  key={test.id}
                  className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {test.testName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Start: <span className="font-medium">{start.toLocaleString()}</span>
                  </p>
                  {created && (
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {created.toLocaleString()}
                    </p>
                  )}
                  <div
                    className={`mt-4 text-sm font-medium inline-block px-3 py-1 rounded-full ${
                      isLive
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {isLive ? "🟢 Live" : "🕒 Scheduled"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
