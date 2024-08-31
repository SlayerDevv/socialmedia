import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useFile } from "../../hooks/useFile";
const ProfileHeader = ({
  id,
  email,
  username,
  firstName,
  lastName,
  avatar,
  data
}) => {
  const { uploadFile } = useFile();
 let dialogRef = useRef(null)
 const handleClick = (e) => {
  if (dialogRef.current && !dialogRef.current.contains(e.target)){
      dialogRef.current.close();
  }
}
useEffect(() => {
  const dialog = dialogRef.current;
  if (dialog) {
    const handleBackdropClick = (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    };
  document.addEventListener("mousedown", handleBackdropClick);
  return () => {
      document.removeEventListener("mousedown", handleBackdropClick);
  };
}
}, []);

  const token = document.cookie.split("token=").pop().split(";").shift();

  const UpdatePfp = (e) => {
    let file = e.target.files[0];
    if (file) {
      let formData = new FormData();
      formData.append("avatar", file);
      uploadFile(formData, token).then((data) => {});
    }
  };
  return (
    <div className="w-[600px] small:min-w-[360px] medium:min-w-[375px] duration-500 ">
      <div className="flex flex-col items-center justify-center space-y-1 ">
        <div className=" bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]  rounded-lg space-y-[20px] p-4 small:p-1">
        <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <img
            src={`${process.env.NEXT_PUBLIC_END_POINT}:3000/images/banner.png`}
            
            className="rounded-md "
          />
        </div>
          <div className="flex items-start justify-between ">
            <div className="flex">
              <label htmlFor="pfpupload" className="cursor-pointer w-[100px] h-[100px] ">
                <img
                  id="pfp"
           
                  src={avatar}
                  alt="pfp"
                  className="rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                />
              </label>
              <input
                onChange={(e) => UpdatePfp(e)}
                type="file"
                disabled={data != username ? true : false}
                id="pfpupload"
                name="pfpupload"
                className="hidden"
              />
              <div className="flex-1">
                <div>
                <h1 className="text-3xl small:text-xl font-bold font-poppins text-black">
                  {firstName} {lastName}
                </h1>
                <p className="text-sm ml-[5px] text-gray-600">@{username}</p>
                </div>

                <div className="flex mt-[20px] ml-[5px] items-center flex-nowrap gap-1">
                  <p className="text-base small:text-xs font-medium text-gray-600 hover:text-gray-800">
                    Followers: 1M
                  </p>
                  <span className="text-base small:text-xs text-gray-600 font-medium">⋯</span>
                  <p className="text-base small:text-xs font-medium text-gray-600 hover:text-gray-800">
                    Following: 0
                  </p>
                </div>
                <ul className="flex  mt-[44px] space-x-4 items-end justify-start">
             <li className=" bg-white text-base text-black rounded-xl   cursor-pointer font-semibold">
            <a href="#" className="h-max w-max focus:border-b-4 border-indigo-600 ">
              Home
            </a>
          </li>
          
          <li className=" bg-white text-base text-black rounded-xl focus:border-b-4 cursor-pointer border-indigo-600 font-semibold">
            <a className="w-max h-max" href="">
              About
            </a>
          </li>
        </ul>
              </div>
              
            </div>
            <button onClick={() => dialogRef.current.showModal()} className={`text-xl small:text-xs small:rounded-lg bg-slate-100 p-3  rounded-xl ${data != username ? "hidden" : ""}`}>
              Edit
            </button>
            <dialog ref={dialogRef} id="dialog" className="fixed overflow-hidden top-[60%] right-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] h-[400px] backdrop:backdrop-blur-sm rounded-2xl shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]" >
              <div className="flex relative space-x-7 p-3">
              <div className="relative">
                <label htmlFor="firstName" className="flex absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">FirstName</label>
                <input
                  size={11}
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="border-2 outline-none border-gray-300 p-2 rounded-xl" />
                  
              </div>
              <div className="relative">
              <label htmlFor="firstName" className="flex absolute -top-2 left-3 bg-white px-1 text-xs text-gray-500">LastName</label>
                <input
                size={11}
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="border-2 outline-none border-gray-300 p-2 rounded-xl" />
              </div>
              <div className="relative">
              <button onClick={() => dialogRef.current.close()} className="absolute rounded-xl p-3 top-[335px] right-[30px] bg-indigo-400">Close</button>
              </div>
              </div>
              
            </dialog>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default ProfileHeader;
