"use client"
import React, { useContext } from 'react'
import SignIn from './signIn/page'
import { UserContext } from '@/context/Contex';
import { useRouter } from 'next/navigation';


const Home = () => {
  const router = useRouter()
  const [loggedInUser] = useContext(UserContext);
  const userEmail = loggedInUser.email
  //const userEmail = JSON.parse(getFromStorage('userEmail'))

  return (
    <section>
         {!userEmail && router.push('/')}
    </section>
  )
}

export default Home