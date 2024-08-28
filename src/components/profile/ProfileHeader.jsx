import Image from "next/image"
import { useState, useEffect } from "react"
import {useFile} from '../../hooks/useFile'
const ProfileHeader = ({id,email, username, firstName, lastName, avatar}) => {
    const {uploadFile} = useFile()
        

    const token = document.cookie.split('token=').pop().split(';').shift();

  const UpdatePfp = (e) => {
       
       let file = e.target.files[0]
       if (file) {
        let formData = new FormData()
        formData.append('avatar', file)
            uploadFile(formData, token).then((data) => {
            })

    }
        
        
 }
    return (
        <div className="w-full" >
            <div className="flex flex-col items-center ">
            <div className="h-[280px] w-[720px]">
            <Image src='http://localhost:3000/images/banner.png' width={820} height={312} className="rounded-b-md" />
            </div>
            <div className="flex bg-white rounded-xl space-y-[100px] border-b-[1px] border-slate-300 p-5">
            <div className="flex space-y-4 items-start justify-start w-[680px] justify-between">
            <div className="flex">
            <label htmlFor="pfpupload" className="cursor-pointer z-0"><Image id="pfp" unoptimized src={avatar} alt="pfp" width={170} height={170} className="rounded-full z-50" /></label>
            <input onChange={(e) => UpdatePfp(e)} type="file" id="pfpupload" name="pfpupload" className="hidden" />
            <div className="">
            <h1 className="text-3xl font-bold font-poppins text-black">{firstName} {lastName}</h1>
            <p className="text-sm ml-[2px] text-gray-600">@{username}</p>
            <div className="flex mt-[20px] ml-[5px] items-center gap-1">
            <p className="text-base text-gray-600 hover:text-gray-800">Followers: 0</p>
            <span className="text-base text-gray-600">⋯</span>
            <p className="text-base text-gray-600 hover:text-gray-800">Following: 0</p>
            </div>
            </div>
            </div>
            <button className="text-xl bg-slate-100 p-3 rounded-xl">Edit</button>    
            </div>
            </div>
            <ul className="flex p-3 justify-start w-[680px] space-x-5 items-center">
                <li className="p-3 bg-white text-base text-black rounded-xl  focus:bg-white cursor-pointer font-semibold"><a href="#" className="h-max w-max">Home</a></li>
                <hr className="border-r-[1px] border-gray-500 h-4" />
                <li className="p-3 hover:bg-slate-100 text-base text-black rounded-xl focus:border-b-4 cursor-pointer border-indigo-600 font-semibold"><a className="w-max h-max" href="">About</a></li>
                
            </ul>
            </div>
            </div>
    )
}

export default ProfileHeader