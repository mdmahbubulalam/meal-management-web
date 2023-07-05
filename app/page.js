"use client"
import React, { useContext } from 'react'
import SignIn from './signIn/page'
import { UserContext } from '@/context/Contex';


const Home = () => {
  const [loggedInUser] = useContext(UserContext);
  const userEmail = JSON.parse(getFromStorage('userEmail'))

  return (
    <section>
         {!userEmail && <SignIn/>}
    </section>
  )
}

export default Home