"use client";
import Image from "next/image"
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { CircleUserRound, Settings, LogOut } from "lucide-react";
import {useLogout} from '../hooks/useLogout'
const Menu = ({avatar, username, firstName, lastName}) => {
    const {logout} = useLogout()
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
            <div onClick={() => setOpen(!Open)} ref={MenuRef} className="flex space-x-3 items-center font-lato hover:bg-slate-100/30 duration-300 p-2 rounded-xl cursor-pointer">
            <h1>{firstName + '' + lastName}</h1>
            <Image src={avatar} unoptimized width={40} height={40} className="rounded-full" />
            </div>
            <div className={clsx("absolute bg-[rgba(199,196,196,0.31)] rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] border border-[rgba(199,196,196,0.35)] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]  w-[150px] rounded-2xl", Open ? "transition-all duration-500 ease-in-out" : "opacity-0")}>
            <ul className="flex-1 text-lg space-y-3 my-3 px-3">
            <li className="flex justify-between hover:bg-slate-50/40 p-3 rounded-lg cursor-pointer"><a href={`/profile/${username}`}>Profile</a> <CircleUserRound /></li>
            <li className="flex justify-between hover:bg-slate-50/40 p-3 rounded-lg cursor-pointer"><a href="">Settings</a><Settings /></li>
            <li onClick={() => logout()} className="flex justify-between hover:bg-slate-50/40 p-3 rounded-lg cursor-pointer"><a href="">Logout</a><LogOut /></li>
            </ul>
            </div>
        </div>
    )
}

export default Menu;