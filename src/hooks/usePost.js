import {useState, useContext} from 'react'
const  {AuthContext} = require('../context/AuthContext')


export const usePost = () => {
    const {state} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
        const CreatePost = async(title, content) => {
            var postdoc = document.getElementById('post')
            postdoc.value = ''
           try {
            const res = await fetch('http://localhost:5000/api/v1/posts/createPost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${state.user}`,
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
            return data;
           }catch (err){
            console.log(err)
            throw err;
           }

        }
        const UpdatePost = async(id, title, content) => {
            try {
                setLoading(true)
                const res = await fetch(`http://154.251.141.17:5000/api/v1/posts/updatePost/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${state.user}`,
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
    return {CreatePost, UpdatePost}
}

