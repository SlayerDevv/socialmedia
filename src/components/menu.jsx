"use client";
import Image from "next/image"
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { CircleUserRound, Settings, LogOut } from "lucide-react";
import {useAuth} from '../hooks/useAuth'
import { useRouter } from "next/navigation";
const Menu = ({avatar, username, firstName, lastName}) => {
    const router = useRouter()
    const {logout} = useAuth()
    const [Open, setOpen] = useState(false);
    const MenuRef = useRef(null)
    const handleClick = (e) => {
        if (MenuRef.current && !MenuRef.current.contains(e.target)){
            setOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);
    return (
        <div className="space-y-1">
            <div onClick={() => setOpen(!Open)}  className="flex space-x-3 items-center font-lato hover:bg-slate-100/30 duration-300 p-2 rounded-xl cursor-pointer">
            <h1 className="space-x-1"><span>{firstName}</span><span>{lastName}</span></h1>
            <Image src={avatar} unoptimized width={40} height={40} className="rounded-full" />
            </div>
            {Open && (
  <div ref={MenuRef} className="absolute duration-300 transition-all ease-in-out bg-[rgba(199,196,196,0.31)] rounded-[16px] backdrop-blur-[20px] border border-[rgba(199,196,196,0.35)] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] w-[150px]">
    <ul className="flex-1 text-lg space-y-3 my-3 px-3">
      <li onClick={() => router.push(`/profile/${username}`)} className="flex justify-between hover:bg-slate-50/40 p-3 rounded-lg cursor-pointer">Profile<CircleUserRound /></li>
      <li className="flex justify-between hover:bg-slate-50/40 p-3 rounded-lg cursor-pointer">Settings<Settings /></li>
      <li onClick={() => logout()} className="flex justify-between hover:bg-slate-50/40 p-3 rounded-lg cursor-pointer">Logout<LogOut /></li>
    </ul>
  </div>
)}
        </div>
    )
}

export default Menu;