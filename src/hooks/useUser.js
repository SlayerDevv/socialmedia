import {useState, } from 'react'


export const useUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const getUser = async(token) => {
        const res = await fetch(`${process.env.END_POINT}:5000/api/v1/user/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        })
        const data = await res.json();
        if (!res.ok){
            setError(data.error)
            setLoading(false)
        }
        setLoading(false)
        return data;
    }

    const UpdateUser = async(userame) => {
        const res = await fetch(`${process.env.END_POINT}:5000/api/v1/user/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
        })
    }
    return {getUser, loading, error}
}
