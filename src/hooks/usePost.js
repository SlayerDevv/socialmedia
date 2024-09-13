import {useState, useContext} from 'react'
const  {AuthContext} = require('../context/AuthContext')
import axios from 'axios'

export const usePost = () => {
    const {state} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
            
    const CreatePost = async (title, content, token, attachements) => {
        var postdoc = document.getElementById('post');
        postdoc.value = '';
    
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_END_POINT}:5000/api/v1/posts/createPost`, {
                title,
                content,
                attachements,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            return data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
    


        const UpdatePost = async(id, title, content) => {
            try {
                setLoading(true)
                const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}:5000/api/v1/posts/updatePost/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${state.user}`,
                    },
                    body: JSON.stringify({
                        title,
                        content,
                    }),
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error);
                }
                setLoading(false)
                return data;
            }catch (err){
                console.log(err)
                setLoading(false)
                throw err;
            }
        }
        const GetPosts = async(token) => {
            try {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_END_POINT}:5000/api/v1/posts/getposts`,{
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            if (data){
                return data.data;
            }
}catch (err){
    console.log(err)
}
        } 
    return {CreatePost, UpdatePost, GetPosts}
}

