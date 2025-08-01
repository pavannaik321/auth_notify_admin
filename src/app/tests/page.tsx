"use client";
import { useState } from "react";
import { Timestamp, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function CreateTestPage() {
  const [testName, setTestName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [addedTest, setAddedTest] = useState<{ name: string; time: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!testName || !startTime) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "tests"), {
        testName,
        startTime: Timestamp.fromDate(new Date(startTime)),
        createdAt: serverTimestamp(),
      });

      setAddedTest({
        name: testName,
        time: new Date(startTime).toLocaleString(),
      });

      toast.success("Test created successfully!");
      setTestName("");
      setStartTime("");
    } catch (err) {
      toast.error("Failed to add test");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-pink-100 px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          📚 Create New Test
        </h2>

        {addedTest && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6 shadow-sm">
            <p className="text-green-700 font-medium">
              ✅ Test added: <span className="font-bold">{addedTest.name}</span>
            </p>
            <p className="text-sm text-green-600">
              📅 Scheduled for: {addedTest.time}
            </p>
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Test Name</label>
            <input
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              placeholder="e.g., Mid-Term Physics Exam"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Start Date & Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-1 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Adding...
              </>
            ) : (
              <>➕ Add Test</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
