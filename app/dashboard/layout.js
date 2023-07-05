"use client"

import { UserContext } from '@/context/Contex';
import React, { useContext, useEffect, useState } from 'react'
import SignIn from '../signIn/page';
import SideBar from '@/components/SideBar';
import { getFromStorage } from '@/context/LocalStorage';

const DashboardLayout = ({children}) => {
    const [loggedInUser] = useContext(UserContext);
    const userEmail = JSON.parse(getFromStorage('userEmail'))
    console.log('fromLayout', userEmail)
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