"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashobardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [router, status]);

  return (
    <div className="h-screen">
      <main className={`w-full h-full flex flex-col justify-between`}>
        <div className="mt-0">
          <Navbar />
          {children}
        </div>
        <div className="">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default DashobardLayout;
