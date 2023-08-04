"use client";
import Link from "next/link";
import React,{useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast";
import axios from "axios";


export default function LoginPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () =>{
        try{
           setLoading(true);
           const response =  await axios.post("/api/users/login", user);
           console.log("Login success", response.data);
           toast.success("Login success");
           router.push("/profile");
        }catch(error:any){
            console.log("Login Failed", error.message);
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
            <h1>{loading?"Processing":"login"}</h1>
            <hr/>
           
            <label htmlFor="email">email</label>
            <input id="email" type="email" value={user.email} onChange={(e) => setUser({...user, email:e.target.value})} placeholder="email" className="text-black" />
            <label htmlFor="password">password</label>
            <input id="password" type="password" value={user.password} onChange={(e) => setUser({...user, password:e.target.value})} placeholder="password" className="text-black"/>
            <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={onLogin} >Login here </button>
            <Link href="/signup">Visit signup  page</Link>
        </div>
    )

}