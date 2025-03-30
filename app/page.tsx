"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const page = () => {
  // const { data: session, status } = useSession();
  //   const router = useRouter();
  
  //   useEffect(() => {
  //     if(status==="unauthenticated"){
  //         router.push("/auth/signin")
  //     }
  //   }, [status, router]);
  
  //   if (status === "loading") {
  //     return <div>Loading...</div>;
    // }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='font-semibold text-lg'>Welcome to TMS</h1>
      <Link href="/auth/signin" className='text-lg '>Login</Link>
    </div>
  )
}

export default page