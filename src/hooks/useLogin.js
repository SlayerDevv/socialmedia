
import AuthContext from '../context/AuthContext'
import {useState, useContext} from 'react'
import ax from 'axios'
import { useRouter, redirect } from 'next/navigation'

export const useLogin = () => {
    const dispatch = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const router = useRouter()

    const login = async (email, password) => {
        setLoading(true)
        setError(null)
        const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })

        })
       const data = await res.json();
        if (!res.ok){
            setError(data.error)
            setLoading(false)
            
        }else {
            const d = new Date()
             d.setTime(d.getTime() + (1000 * 60 * 60 * 24 * 10))
             let expirationDate = d.toUTCString();
            document.cookie = `token=${data.message}; expires=${expirationDate}; path=/`
         //  localStorage.setItem('user', JSON.stringify(data.message))
            dispatch.dispatch({type: 'LOGIN', payload: data})
            setLoading(false)
            router.push('/')
        }
       
    }
    return {login, error, loading}
}
