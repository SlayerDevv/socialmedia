"use client"
import Image from "next/image";
import jwt from 'jsonwebtoken'
import { useContext, useEffect, useState } from "react";
import AuthContext from '../context/AuthContext'
import {useGetUserData} from '@/hooks/useGetUserData'
import useAuthRedirect from '../hooks/useAuthRedirect'
import { useRouter } from "next/navigation";
import Navbar from '@/components/navbar'
import CreatePost from '@/components/post/CreatePost'

export default function Home() {
  const [user, setUser] = useState('')
  const { state } = useContext(AuthContext)
  const router = useRouter()
  const {getData, error, loading} = useGetUserData()
  const [token, setToken] = useState('')

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const token = document.cookie.split('token=').pop().split(';').shift();
      setToken(token);
    }
  }, [])

  const fetchData = async() => {
    if (token) {
      var data = await getData(token);
      setUser(data.data)
    }
  }

  useEffect(() => {
    fetchData();
  }, [token])

  return (
    <main className="space-y-[18px] ">
      <Navbar avatar={user.avatar} firstName={user.firstName} lastName={user.lastName} username={user.username} />
      <div className="flex justify-center">
        <CreatePost avatar={user.avatar} />      
      </div>
      <div className="flex justify-center">
        What are you up to today {user.firstName} ?
      </div>
    </main>
  );
}