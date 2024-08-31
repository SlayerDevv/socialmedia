"use client";
import React, { useContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import axios from "axios";
import defaultImg from "../../public/images/default.png";
import {useAuth} from '@/hooks/useAuth'
import AuthContext from "@/context/AuthContext";
require("dotenv").config({ path: "../../backend/.env" });


const RegisterComponent = () => {
  const { register, Error, loading} = useAuth()
  const [firstName, setFirstname] = React.useState("");
  const [lastName, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    setAvatar(`${process.env.NEXT_PUBLIC_END_POINT}:3000/images/default.png`);
  }, []);

 /* useEffect(() => {
  let firstName = document.getElementById("firstName");
  let lastName = document.getElementById("lastName");
  let email = document.getElementById("Email");
  let password = document.getElementById("Password");
  let username = document.getElementById("Username");
  switch (Error[0].path[0]){
    case 'firstName':
      return firstName.classList.remove('hidden')
    case 'lastName':
      return lastName.classList.remove('hidden')
    case 'email':
      return email.classList.remove('hidden')
    case 'password':
      return password.classList.remove('hidden')
    case 'username':
      return username.classList.remove('hidden')
    default:
      return null;
  }
 }, [Error])*/
 console.log(Error)
  return (
    <div className="flex flex-col space-y-1">
     
      <div className="w-[450px] p-5 h-[550px] rounded-2xl bg-white bg-opacity-20 shadow-lg shadow-black/10 backdrop-blur-sm border border-white/30">
        <div className="text-5xl text-indigo-400 font-bold">Register</div>
        <hr className="w-[50px] h-3 bg-indigo-400" />
        <p className="text-xs text-black/70 mt-3">
          <span className="text-base font-semibold">Note:</span>
          <br />
          All informations are securely stored
        </p>
        <div className="space-y-[20px] mt-[20px]">
          <div className="flex space-x-2">
            <div className="relative">
              <div id="firstName" className="hidden text-red-500 font-medium text-xs flex absolute right-0">Error</div>
              <label htmlFor="firstname" className="ml-1 text-sm">
                FirstName
              </label>
              <input
                type="text"
                onChange={(e) => setFirstname(e.target.value)}
                id="firstname"
                name="firstname"
                required
                className="flex mt-1 pl-1  rounded-2xl py-1 bg-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] outline-none"
              />
            </div>
            <div className="relative">
            <div id="lastName" className="hidden text-red-500 font-medium text-xs flex absolute right-0">Error</div>
              <label htmlFor="lastname" className="ml-1 text-sm">
                LastName
              </label>
              <input
                type="text"
                onChange={(e) => setLastname(e.target.value)}
                id="lastname"
                name="lastname"
                required
                className="flex mt-1 pl-1 rounded-2xl py-1  bg-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] outline-none"
              />
            </div>
          </div>
          <div className="relative">
          <div id="Username" className="hidden text-red-500 font-medium text-xs flex absolute right-0">Error</div>
            <label htmlFor="username" className="ml-1 text-sm">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
              required
              className="flex mt-1 rounded-2xl p-[5px] pr-[200px] bg-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] outline-none"
            />
          </div>
          <div className="relative">
          <div id="Email" className="hidden text-red-500 font-medium text-xs flex absolute right-0">Error</div>
            <label htmlFor="email" className="ml-1 text-sm">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              required
              className="flex mt-1 rounded-2xl p-[5px] pr-[200px] bg-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] outline-none"
            />
          </div>
          <div className="relative">
          <div id="Password" className="hidden text-red-500 font-medium text-xs flex absolute right-0">Error</div>
            <label htmlFor="password" className="ml-1 text-sm">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              required
              className="flex mt-1 rounded-2xl p-[5px] pr-[200px] bg-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <a
              href="/login"
              className="text-sm hover:text-indigo-600 duration-300"
            >
              Aleardy Registered ?
            </a>
            <button
              type="button"
              onClick={() =>
                register(email, username, password, firstName, lastName, avatar)
              }
              disabled={loading}
              className="flex bg-[#F5F5F5] shadow-[0px_0px_50px_1px_#FFF] hover:bg-[#F5F5F5]/80 duration-500 py-2 px-5 text-black font-medium justify-center items-center rounded-3xl"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
