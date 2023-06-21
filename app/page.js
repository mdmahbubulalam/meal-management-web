"use client"
import React, { useContext } from 'react'
import SignIn from './signIn/page'
import { UserContext } from '@/context/Contex';
import SideBar from '@/SideBadr';


const Home = () => {
  const [loggedInUser] = useContext(UserContext);
  console.log(loggedInUser)
  
  return (
    <section>
         {!loggedInUser.email && <SignIn/>}
    </section>
  )
}

export default Home