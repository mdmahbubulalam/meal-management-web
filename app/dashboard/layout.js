"use client"

import { UserContext } from '@/context/Contex';
import React, { useContext } from 'react'
import SignIn from '../signIn/page';
import SideBar from '@/components/SideBar';

const DashboardLayout = ({children}) => {
    const [loggedInUser] = useContext(UserContext);
  return (
    <section>
      {
        loggedInUser.email ? 
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