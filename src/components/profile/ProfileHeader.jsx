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
            <div className="h-[312px] w-[820px]">
            <Image src={'/banner.png'} width={820} height={312} className="rounded-md" />
            </div>
            <div className="flex items-start justify-start w-[820px] justify-between space-y-[100px] border-b-[1px] border-slate-300 pb-10">
            <div className="flex space-y-4">
            <label htmlFor="pfpupload" className="cursor-pointer z-0"><Image id="pfp" unoptimized src={avatar} alt="pfp" width={170} height={170} className="rounded-full z-50" /></label>
            <input onChange={(e) => UpdatePfp(e)} type="file" id="pfpupload" name="pfpupload" className="hidden" />
            <h1 className="text-3xl font-bold font-poppins text-black">{firstName} {lastName}</h1>
            </div>
            <button className="text-xl hover:bg-slate-100 p-3 rounded-xl">Edit</button>          
            </div>
            </div>
            </div>
    )
}

export default ProfileHeader