import {useState, } from 'react'


export const useGetUserData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const getData = async(token) => {
        const res = await fetch('http://localhost:5000/api/v1/user/get_user', {
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
    return {getData, loading, error}
}
