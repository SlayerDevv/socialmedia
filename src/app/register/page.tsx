"use client";
import RegisterComponent from "@/components/register";
import React, { useEffect, useContext } from "react";
import { redirect } from "react-router-dom";
import AuthContext from "@/context/AuthContext";

export default function Register() {
    const {state} = useContext(AuthContext);

    return (
            <main className="flex bg-[url('bg.png')] bg-cover h-screen justify-center items-center">
                <RegisterComponent />
            </main>
    );
}
