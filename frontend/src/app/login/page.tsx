'use client';

import Link from "next/link";
import { FormEvent, useState } from "react";
import ErrorMsg from "@/ui/errormsg";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/actions/AuthContext";

export default function LoginForm(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("Incorrect Email and/or Password.");
    const [validCredentials, setValidCredentials] = useState(true);
    const { login } = useAuth();

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const success = await login(email, password);
        // Check for any errors -> If none -> Navigate to ?
        if(success){
            router.push("/");
        }
        else{
            setValidCredentials(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl border-black border-2 shadow-2xl p-6 space-y-6">
                <div className="text-2xl font-bold text-center text-gray-800">Login to Pantry Pal</div>
                <form 
                onSubmit={handleSubmit}
                className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                        type="email"
                        placeholder="you@example.com"
                        className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                        type="password"
                        placeholder="•••••••••"
                        className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                    {!validCredentials && <ErrorMsg message={errorMessage}/>}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>

                <div className="flex flex-col gap-2">
                    <Link
                    href={"/forgotpassword"}
                    className="text-sm text-center text-gray-500 "
                    >
                        <p className="text-blue-500 hover:underline ">Forgot your password?</p>                    
                    </Link>
                    
                    <hr className="flex items-center text-sm"/>

                    <Link
                    href={"/signup"}
                    className="text-sm text-center text-gray-500"
                    >
                        <p className="text-blue-500 hover:underline ">Don't have an account? Sign Up</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}