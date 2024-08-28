"use client";
import LoginComponent from "@/components/login";
import { useEffect , useContext} from "react";
import { redirect } from "next/navigation";
import AuthContext from "@/context/AuthContext";
import useAuthRedirect from '@/hooks/useAuthRedirect'
export default function Login(){
    
 // const token = document.cookie.split('token=').pop().split(';').shift();
    const loading = useAuthRedirect()
    /*    if (token){
            redirect('/')
        }else {*/
            return(
                <main className="flex bg-[url('bg.png')] bg-cover h-screen justify-center items-center">
                <LoginComponent />
                </main>
            )
        }


    //}