"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  // const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      callbackUrl: "/dashboard/task",
    });
  };
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center p-0 sm:p-20 h-screen border bg-gray-900">
      <div className="flex items-center sm:gap-1 bg-white px-10 py-12 sm:p-6 rounded-2xl ">
        <div className="flex flex-col items-center gap-8 w-full sm:w-1/2">
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg sm:text-2xl">
              Welcome to TMS
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-2 w-full"
          >
            <label className="text-wrap self-start pl-5">Username</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-5/6"
            />
            <label className="text-wrap self-start pl-5">Password</label>
            <div className="relative w-5/6">
              <Input
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                className="absolute right-2 bottom-0.5 "
              >
                {visible ? (
                  <span className="text-lg">🙈</span>
                ) : (
                  <span className="text-lg">🐵</span>
                  
                )}
              </Button>
            </div>

            <Button className="bg-blue-600 p-2 rounded-lg w-5/6 mt-3 hover:bg-blue-500">
              Login
            </Button>
            <h1 className="text-blue-500 text-sm self-end pr-5 cursor-pointer">
              Forget Password?
            </h1>
          </form>
          <div className="flex items-center w-5/6">
            <div className="flex-1 h-px bg-gray-400"></div>
            <span className="px-3 text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-400"></div>
          </div>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/dashboard/task" })}
            className="bg-gray-200 px-4 rounded-lg hover:bg-gray-100 w-5/6"
          >
            <Image src="/image.png" alt="google logo" width={20} height={20} />
            <span className="text-black">Sign in with Google</span>
          </Button>
        </div>
        <div className="hidden sm:block w-1/2 bg-gray-100 rounded-2xl">
          <Image
            src="/task.png"
            alt="task image"
            width={500}
            height={600}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
