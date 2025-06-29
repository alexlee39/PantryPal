"use client";

import Link from "next/link";
import { useAuth } from "@/lib/actions/AuthContext";
import Button from "@/ui/button";


export default function Navbar(){
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className="w-full bg-sky-500 text-xl">
            <div className="flex items-center max-w-4xl mx-auto min-h-16">
                <Link
                    className="flex grow justify-start px-4"
                    href={"/"}> 
                    <p className="text-2xl font-semibold"> PantryPal  </p>
                </Link>
                { isAuthenticated ? 
                    <div className="flex gap-x-4">
                        <Button href={"/create"} name ="Add Recipe" />
                        <button
                            onClick={logout}
                            className="flex flex-row items-center py-2 bg-black text-white rounded-lg px-4 cursor-pointer text-base" 
                            >
                            Logout
                        </button>
                    </div>                    :
                    <div className="flex grow justify-end gap-x-4">       
                        <Button href={"/login"} name="Login"/>

                        <Button href={"/signup"} name="Sign Up"/>
                    </div>
                }

            </div>

            {/* Mobile Menu/ Hamburger menu */}
        </div>

    )
}