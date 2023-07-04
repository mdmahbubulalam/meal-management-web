"use client"
import { UserContext } from '@/context/Contex';
import Image from 'next/image'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { MdAccountCircle } from 'react-icons/md';


const Nav = () => {
    const [loggedInUser] = useContext(UserContext);
    const [member, setMember] = useState([]);
    const baseUrl = process.env.BASE_URL;
    
    const userEmail = JSON.parse(localStorage.getItem("userEmail"));
    console.log('loggedInUser',loggedInUser)
    const url = `${baseUrl}/users/findByEmail?email=${userEmail}`

    console.log(member?.username)

    useEffect(()=>{
        const fetchPost = async () => {
        const res = await fetch(url)
        const data = await res.json();
        setMember(data.user[0]);
      }
      fetchPost()
      },[])
    return (
        <nav className="flex bg-zinc-900 pt-2 pb-2 pl-8 pr-8">
            <div className="flex-grow lg:flex lg:items-center md:justify-between  md:w-auto">
                <Link href='/' className="flex items-center sm:justify-center">
                    <Image
                    src={'/assets/logo.png'}
                    alt = 'logo'
                    width = {40}
                    height = {40}
                    />
                    <h1 className='text-amber-500 font-bold pl-2 text-2xl'>Meal Management</h1>
                </Link>
                <div className='sm:text-center'>
                {
                    userEmail ? 
                        <h2 className='text-lg text-white font-bold '>{member.username}</h2> 
                        : 
                        <h2 className='text-lg text-white font-bold '><MdAccountCircle size='2rem'/></h2>    
                }
                    
                </div>
            </div>
        </nav>
    )
}

export default Nav