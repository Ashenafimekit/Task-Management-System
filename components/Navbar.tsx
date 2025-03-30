"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { signOut as nextAuthSignOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Navbar = () => {
  function signOut(): void {
    nextAuthSignOut();
  }

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4 sm:px-20 border-b shadow-sm">
      <h1 className="text-xl font-semibold">TMS</h1>
      <div>
        {session && (
          <div className="flex flex-col text">
            <span>{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="relative text-sm sm:text-lg w-fit text-white before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 hover:before:w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
