"use client"
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {AuthContext} from '@/context/AuthContext'
import {useAuth} from '@/hooks/useAuth'
require('dotenv').config()
const LoginComponent = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
   const {login, Error, loading} = useAuth()
useEffect(() => {
    console.log(email)
}, [email])
    return (
        <div className="w-[450px] p-5 h-[450px] rounded-2xl bg-white bg-opacity-20 shadow-lg shadow-black/10 backdrop-blur-sm border border-white/30">
            <div className="text-5xl text-indigo-400 font-bold">Login</div>
            <hr className="w-[50px] h-3 bg-indigo-400" />
            <div className="space-y-[28px] mt-[45px] ">
                <div>
                <label htmlFor="email" className="ml-1 text-sm">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" required className="flex mt-1 rounded-2xl p-[5px] pr-[200px] bg-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] outline-none" />
                </div>
                <div>
                <label htmlFor="password" className="ml-1 text-sm">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" required className="flex mt-1 rounded-2xl p-[5px] pr-[200px] bg-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] outline-none" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                    <label htmlFor="rememberme">RememberMe</label>
                    <input type="checkbox" name="rememberme" className="accent-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] outline-none"/>
                    </div>
                    <button type='button' onClick={() => login(email, password)}  className="flex bg-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] hover:bg-[#F5F5F5]/80 duration-500 py-2 px-5 text-black font-medium justify-center items-center rounded-3xl">Login</button>
                </div>

            </div>
            <div className="mt-[45px] space-x-2 flex justify-between items-center">
                <p className="text-xs text-black/70"><span className="text-base font-semibold">Note:</span><br />All informations are securely stored</p>
                <a href="" className="text-sm hover:text-indigo-600 duration-300">Forgot Password ?</a>
                <a href="/register" className="text-sm hover:text-indigo-600 duration-300">Dont have an account ?</a>
            </div>
        </div>
    )
}


export default LoginComponent;