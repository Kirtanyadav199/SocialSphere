import { createContext, useState, useEffect } from "react";
import {login,register,getMe} from './services/auth.api'
import {toast} from 'react-toastify'

export const AuthContext = createContext() 

export const AuthProvider = ({children}) =>{

    const[user,setUser] = useState(null)
    const[loading,setLoading] = useState(false)

    useEffect(() => {
    async function fetchUser() {
        try {
            const response = await getMe()
            setUser(response.user)
        }
        catch(err){
            setUser(null)
        }
    }

    fetchUser()
}, [])

    const handleLogin = async (username , password)=>{
        setLoading(true)
        try{
            const response = await login(username,password)
            setUser(response.user)
        }catch(err){
            toast.error(err.response.data.message);  
        }
        finally{
            setLoading(false)
        }
    }

    const handleRegister = async (username , email, password)=>{

        setLoading(true)

        try{
            const response = await register(username,email,password)
            setUser(response.user)
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{user,loading,handleLogin,handleRegister}}>
            {children}
        </AuthContext.Provider>
    )
}