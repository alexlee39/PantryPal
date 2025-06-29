'use client';
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

/** Note: We need to set different status codes based on type of exception.
 *  Ex: For a 403 or 401 Unauthorized when logging in -> Should set status code to 401.
 * 
 * https://chatgpt.com/c/684f7247-48a8-8010-b5d0-834b595a7b94 -> Add Loading state for Navbar, HomePage (ALL Components
 * that depend on authentication)
 * 
 * @param param0 
 * @returns 
 */
export function AuthProvider({children }: {children : React.ReactNode }){
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => { 
        try{
            const res = await fetch("http://localhost:8080/api/v1/auth/status",{
                credentials: "include",
            })
            
            if(res.ok){
                setLoggedIn(true);
                const data = await res.json();
                setUser(data);
            }
            else{ //res.status == 403
                setLoggedIn(false);
                setUser(null);
            }

        }
        catch(error){
            setLoggedIn(false);
            setUser(null);
            console.log("Internal Server Error Occured.");
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    },[]);

    const login = async (email : string, password: string) => {
        const responseBody = { email, password };

        try{
            const res = await fetch("http://localhost:8080/api/v1/auth/login",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body : JSON.stringify(responseBody),
                credentials : "include"
            });
            if(res.ok){
                console.log("Login Successful");
                
                await checkAuth();
                return true;
            }
            else{
                setUser(null);
                console.log("Login Failed");
                return false;
            }
        }
        catch(error){
            setUser(null);
            console.log("Internal Server Error Occured");
            console.log(error);
            return false;
        }
    }

    const signup = async(email : string, password: string) =>{
        try{
            const res = await fetch("http://localhost:8080/api/v1/auth/signup",{
                method : "POST",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body : JSON.stringify({email, password}),

            });
            if(res.ok){
                return true;
            }
            else if(res.status==409){
                return false;
            }
            return false;
        }
        catch(error){
            console.log("Internal Server Error Occured");
            console.log(error);
            return false;
        }
    }

    const logout = async() => {
        try{
            const res = await fetch("http://localhost:8080/api/v1/auth/logout",{
                credentials : "include",
            });
            setUser(null);
            if(res.ok){
                console.log("Logout Successful");
            }
            else{
                console.log("Logout Failed");
            }
        }
        catch(error){
            console.log("Internal Server Error Occured");
        }
        finally{
            checkAuth();
        }
    }

    return (
        <AuthContext value={{ user, isAuthenticated: (user != null) , loading, login, signup, logout }}>
            {children}
        </AuthContext>
      );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
  }