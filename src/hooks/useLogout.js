import AuthContext from '../context/AuthContext'
import {useState, useContext} from 'react'
import { useRouter, usePathname } from 'next/navigation'

export const useLogout = () => {
    const pathname = usePathname()
    const router = useRouter()
    const {dispatch} = useContext(AuthContext)
    const logout = async () => {
        const res = await fetch('http://localhost:5000/api/v1/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        if (res.ok) {
            dispatch({type: 'LOGOUT'})
        }
    }
    return {logout}
}
