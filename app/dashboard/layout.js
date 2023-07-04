"use client"

import { UserContext } from '@/context/Contex';
import React, { useContext, useEffect, useState } from 'react'
import SignIn from '../signIn/page';
import SideBar from '@/components/SideBar';

const DashboardLayout = ({children}) => {
  //const [userEmail, setUserEmail] = useState({})
    const [loggedInUser] = useContext(UserContext);
    const userEmail = localStorage.getItem("userEmail");
    

    useEffect(() => {

      const userEmail = JSON.stringify(loggedInUser.email)
      if(userEmail){
        localStorage.setItem("userEmail", userEmail);
      }
      
    },[])
   
    
  return (
    <section>
      {
        userEmail? 
        <aside className="flex gap-6">
            <SideBar/>
            <div className="m-3 text-xl text-gray-900 font-semibold">
                {children}
            </div>
        </aside>
        : 
        <SignIn/>
      }
    </section>
  )
}

export default DashboardLayout