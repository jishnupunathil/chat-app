import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSignup = () => {
    const {setAuthUser}=useAuthContext()
  const [loading,setLoading]=useState(false)

  const signup=async(inputs)=>{

    const validation= handleInputError(inputs)
    if(!validation) return 
    
    setLoading(true)
    try{
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs),
        });

        const data = await res.json();
        if(data.error){
            throw new Error(data.error)
        }
        //localstorage
        localStorage.setItem("chat-user",JSON.stringify(data))
        //context
        setAuthUser(data)

    }catch(error){
        toast.error(error.message)
    }finally{
        setLoading(false)
    }
  }

  return {loading,signup}
}

export default useSignup



const handleInputError=(inputs)=>{

    const {fullName,userName,password,confirmPassword,gender}=inputs

    if(!fullName || !userName, !password || ! confirmPassword || !gender){
        toast.error('please fill in all fields')
        return false
    }

    if(password !== confirmPassword){
        toast.error('password do not match')
        return false
    }

    if(password.length<6){
        toast.error("password must be atleast 6 character")
        return false
    }


    return true

}