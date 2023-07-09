"use client"
import React, { useContext, useEffect } from 'react'
import SignIn from './signIn/page'
import { UserContext } from '@/context/Contex';
import { useRouter } from 'next/navigation';


const Home = () => {
  const router = useRouter()
  const [loggedInUser] = useContext(UserContext);
  const userEmail = loggedInUser.email ? loggedInUser.email : ''
  //const userEmail = JSON.parse(getFromStorage('userEmail'))

  if(!userEmail) {
    useEffect(() => {
      router.push('/')
  },[])
  }
  
}

export default Home