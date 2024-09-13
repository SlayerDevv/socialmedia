"use client"
import {useState, useEffect} from 'react'
import { useParams, useRouter } from 'next/navigation';
import ProfileHeader from '@components/profile/ProfileHeader'
import Navbar from '@/components/navbar';
import { VerifyToken } from "../../../utils/VerifyToken";
import {useUser} from '@/hooks/useUser'
export default function Profile(){
    const router = useRouter()
    const {getUser} = useUser()
    const token = document.cookie.split('token=').pop().split(';').shift();
    
   
    const {username} = useParams()
    const [user, setUser] = useState('')
    const [decoded, setDecoded] = useState('')
    const [Loaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [posts, setPosts] = useState([])

        const getuser = async() => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}:5000/api/v1/user/${username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': `Bearer ${token}`
                    },
                })
                const response = await res.json();
                if (res.ok){
                    setUser(response.data)
                }else {
                    setError(<h1 className='flex h-screen items-center justify-center text-3xl text-indigo-400'>Can't find that user 🤔</h1>)
                }
            }catch (err){
            return router.push('/login')
            }
            
        }

        const fetchData = async() => {
            if (token){
                setLoaded(false)
                var data = await getUser(token);
                setDecoded(data.data)
                setLoaded(true)
            }
        }

        useEffect(() => {
            getuser()
            fetchData()
        }, [username, token])
        
        
        return (
            error ? error : (Loaded && (
                <div className='flex flex-col space-y-3 justify-center items-center'>
                <Navbar showMenu={true} avatar={user?.avatar} firstName={user?.firstName} lastName={user?.lastName} username={user?.username}  />
                <ProfileHeader data={decoded?.username} id={user?.id} email={user?.email} avatar={user?.avatar} firstName={user?.firstName} lastName={user?.lastName} username={user?.username}/>
                
            </div>
            ))

        )

}