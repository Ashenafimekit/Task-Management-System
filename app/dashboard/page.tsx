"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);


  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <h1 className="font-semibold text-2xl relative before:absolute before:bottom-0 before:left-0 before:bg-black before:w-0 before:h-0.5 before:transition-all before:duration-500 hover:before:w-full">
        <Link href="dashboard/task">Go to Task Management System</Link>
      </h1>
    </div>
  );
};

export default page;
