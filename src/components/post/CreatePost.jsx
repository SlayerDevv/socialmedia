"use client"
import Imagee from "next/image";
import profile from "../../../public/images/profile.jpg";
import { Image } from "lucide-react";
import { usePost } from "../../hooks/usePost";
import { useState } from "react";
import { useFile } from "@/hooks/useFile";
import { useRouter } from "next/navigation";
import clsx from "clsx";
const token = document.cookie.split("token=").pop().split(";").shift();
const {uploadFile} = useFile()


const CreatePost = ({avatar}) => {
    const [files, setFiles] = useState([])
    const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { CreatePost } = usePost();

  const AppendImage = (file, img) => {
    const imagediv = document.getElementById("imagediv");
    img.src = URL.createObjectURL(file)
    img.width = 230;
     img.height = 230;
     img.title = file.name;
     imagediv.appendChild(img);
  }

  const handleChange = (e) => {
    const filesArray = Array.from(e.target.files);
    filesArray.forEach(file => {
        let img = document.createElement('img');
        AppendImage(file, img);
    });
    setFiles([...files, ...filesArray]);
};

const UploadFiles = async () => {
  let formData = new FormData();
  console.log(files)
  files.forEach((file) => {
      formData.append('PostAttachment', file);
  });
  try {
      let data = await uploadFile(formData, token);
      return data
  } catch (err) {
      console.error('Error uploading file:', err);
  }
};

  return (
    <>
    
    <form encType="multipart/form-data"  method="post" className="bg-white rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-max h-max">
      <div className="p-[20px] space-y-2">
        <h1 className="text-xl font-bold font-rubik">Create Post</h1>
        <div className="flex items-center space-x-3">
          <img src={avatar} width={50} height={50} alt="avatar" className="rounded-full" />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            placeholder="Today was a great journey"
            className="placeholder:text-xs p-2 w-[400px] resize-none bg-slate-100 rounded-xl"
            name="post"
            id="post"
          ></textarea>
        </div>
        <div
          id="imagediv"
          className="grid grid-cols-[max-content_1fr] gap-1"
        ></div>
        <div className="flex justify-between">
          <div className="flex justify-center items-center">
            <label
              htmlFor="PostAttachment"
              className={clsx(
                "flex space-x-3 cursor-pointer hover:bg-slate-100 duration-300 p-3 rounded-xl"
              )}
            >
              <Image />
              Photo/video
            </label>
            <input
              
              type="file"
              onChange={(e) => handleChange(e)}
             multiple
              name="PostAttachment"
              id="PostAttachment"
              className="hidden"
            />
          </div>
          <button
    className="hover:bg-slate-100 duration-300 bg-indigo-400 p-3 rounded-xl font-normal text-lg"
    
    type="button"
    onClick={() => {
        UploadFiles().then(data => {
        CreatePost(title, content, token, data.urls)
      })

    }}
>
    Post
</button>
        </div>
      </div>
    </form>
    </>
  )
};
export default CreatePost;
