"use client"
import {useState, useEffect} from 'react'
import { useParams, useRouter } from 'next/navigation';
import ProfileHeader from '@components/profile/ProfileHeader'
export default function Profile(){
    const router = useRouter()
    const token = document.cookie.split('token=').pop().split(';').shift();
    const {username} = useParams()
    const [user, setUser] = useState(null)
        const getUser = async() => {
            try {
                const res = await fetch(`http://localhost:5000/api/v1/user/${username}`, {
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
                    console.log('error')
                }
            }catch (err){
            return router.push('/login')
            }
            
        }
        useEffect(() => {
            getUser()
        }, [username])

        return (
            <div className=''>
                <ProfileHeader id={user?.id} email={user?.email} avatar={user?.avatar} firstName={user?.firstName} lastName={user?.lastName} username={user?.username}/>
            </div>

 
        )

}