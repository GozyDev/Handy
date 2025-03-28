"use client";
import {useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { set } from "better-auth";

export default function LoginPage() {
  const router = useRouter();
  const [message,setMessage] = useState<string>("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState<boolean>(false)
  const [loginData, setLoginData] = useState<{email:string,password:string}>({
    email: "",
    password: "",
  });

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    try{
      e.preventDefault();
      setLoading(true)
      // Add your login logic here
  
      const response = await fetch("api/auth/login",{
        method:"POST",
        body:JSON.stringify(loginData),
        headers:{ "Content-Type": "application/json",}
      })
  
      const data = await response.json()
  
      if(!response.ok){
        setError(data.error)
        return
      }

      setMessage(data.message)

      setTimeout(()=>{
        if(data.role === "CONSUMER"){
          router.push("/browse-services")
        }
        else{
          router.push("/pbp")
        }
    
      },1500)

    
    }

    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
    
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col gap-4 items-center justify-center p-4">
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute top-3 left-3" />
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleInput}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="pass" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 text-gray-400 absolute top-3 left-3" />
              <input
                id="pass"
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInput}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="text-sm text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <Link 
              href="/signup" 
              className="font-medium text-purple-600 hover:text-purple-700 transition-colors"
            >
              Sign up here
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
            disabled={loading}
          >
            {!loading ? "Sign in" : "submiting"}
          </button>
        </form>
      </div>
    </div>
  );
}