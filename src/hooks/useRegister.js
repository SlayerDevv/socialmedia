import AuthContext from '../context/AuthContext'
import {useState, useContext} from 'react'
import { useRouter } from 'next/navigation'
require('dotenv').config({path: '../../backend/.env'})
import joi from 'joi'

export const useRegister = () => {
    const router = useRouter()
    const dispatch = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [Error, setError] = useState(null)

    const RegisterSchema = joi.object({
      firstName: joi
        .string()
        .min(3)
        .max(20)
        .messages({
          "string.base": 'FirstName must be a string',
          "string.empty": 'FirstName cant be empty',
          "string.max": 'FirstName cant be more than 20 characters',
          "string.min": 'FirstName must be atleast 3 characters long',
    
          "any.required": 'FirstName is required',
        }),
      lastName: joi
        .string()
        .min(3)
        .max(20)
        .messages({
          "string.base": 'LastName must be a string',
          "string.empty": 'LastName cant be empty',
          "string.max": 'LastName cant be more than 20 characters',
          "string.min": 'LastName must be atleast 3 characters long',
          "any.required": 'LastName is required',
        }),
        Username: joi.string().min(3).max(14).required().messages({
            "string.base": 'Username must be a string',
            "string.empty": 'Username cant be empty',
            "string.max": 'Username cant be more than 14 characters',
            "string.min": 'Username must be atleast 3 characters long',
            "any.required": 'Username is required',
          }),
      Email: joi
        .string()
        .email({ tlds: { allow: false } })
        .required().messages({
            "string.empty": 'Email cant be empty',
            "string.pattern.base": 'Email must be a valid email',
            "string.pattern.message": 'Email must be a valid email',
            "any.required": 'Email is required',
          }),
      Password: joi.string().min(8).max(50).required().messages().messages({
        "string.base": 'Password must be a string',
        "string.empty": 'Password cant be empty',
        "string.max": 'Password cant be more than 50 characters',
        "string.min": 'Password must be atleast 8 characters long',
        "any.required": 'Password is required',
      }),
      
    });
    const register = async (email, username,password, firstName, lastName, avatar) => {
        setLoading(true)
        const { error, value } = RegisterSchema.validate({
            firstName: firstName,
            lastName: lastName,
            Username: username,
            Email: email,
            Password: password,
            
          });
        if (!JSON.stringify(error)){
            const res = await fetch(`http://localhost:5000/api/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    username,
                    password,
                    firstName,
                    lastName,
                    avatar
                })
    
            })
            const data = await res.json();
            if (!res.ok){
                setLoading(false);
                console.log('RUN')
                setError(error)
            }else {
                const d = new Date()
                d.setTime(d.getTime() + (1000 * 60 * 60 * 24 * 10))
                let expirationDate = d.toUTCString();
               document.cookie = `token=${data.msg}; expires=${expirationDate}; path=/`
               dispatch.dispatch({type: 'LOGIN', payload: data})
               setLoading(false)
               router.push('/')
            }
            return data;
        }else {
          console.log('run')
            setError(/*JSON.stringify(error.message).split('"')[1]*/error.details)
            setLoading(false)
        }
        
    }
    return {register, Error, loading}
}