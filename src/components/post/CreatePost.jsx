import Imagee from "next/image"
import profile from '../../../public/images/profile.jpg'
import {Image} from 'lucide-react'
import {usePost} from '../../hooks/usePost'
import { useState } from "react"
const upload = () => {
    const inputFile = document.getElementById('upload')
    const image = document.getElementById('image')
    const file = inputFile.files[0]
    if (image.className.includes('hidden')){
        image.classList.remove('hidden')
    }
    image.src = URL.createObjectURL(file)
    
}
const CreatePost = ({avatar}) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const {CreatePost} = usePost()
    return (
        <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-max h-max">
            <div className="p-[12px] space-y-4">
                <h1 className="text-xl font-bold font-rubik">Create Post</h1>
            <div className="flex items-center space-x-3">
            <Imagee unoptimized src={avatar} width={50} height={50} className="rounded-3xl" />
            <textarea onChange={(e) => setContent(e.target.value)} placeholder="Today was a great journey" className="placeholder:text-xs p-2 w-[300px] resize-none bg-slate-100 rounded-xl" name="post" id="post"></textarea>
            </div>
            <div>
                <Imagee id="image" className="hidden" width={100} height={100}/>
            </div>
            <div>
                <div className="flex justify-center">
                    <label htmlFor="upload" className="flex space-x-3 cursor-pointer hover:bg-slate-100 duration-300 p-3 rounded-xl"><Image />Photo/video</label>
                    <input onChange={() => upload()} type="file" name="upload" id="upload" className="hidden"/>
                </div>
            </div>
            <div className="flex justify-end">
            <button className="hover:bg-slate-100 p-3 rounded-xl font-normal text-lg" onClick={() => CreatePost(title, content)}>Post</button>
            </div>
            </div>
        </div>
    )
}

export default CreatePost