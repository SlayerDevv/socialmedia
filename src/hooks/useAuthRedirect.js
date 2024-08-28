import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';

const useAuthRedirect = () => {
   // const token = document.cookie.split('token=').pop().split(';').shift();
    const { state } = useContext(AuthContext);
    const router = useRouter()
    const [loading, setLoading] = useState(true)

/*   useEffect(() => {
        if (token){
            router.push('/')
            setLoading(false)
        }else {
            router.push('/login')
            setLoading(false)
        }
    }, [token, router])

    return loading;*/
}


export default useAuthRedirect;