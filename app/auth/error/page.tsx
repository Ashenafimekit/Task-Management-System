"use client"
import { AlertCircle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 bg-gray-100">
      <AlertCircle className="text-red-500 w-16 h-16 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800">
        Access Denied
      </h1>
      <p className="text-gray-600 mt-2">
        You need to sign in first to access this page.
      </p>
      <button
        onClick={() => router.push("/auth/signin")}
        className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg flex items-center gap-2"
      >
        <LogIn className="w-5 h-5" />
        Go to Sign In
      </button>
    </div>
  );
};

export default Page;
