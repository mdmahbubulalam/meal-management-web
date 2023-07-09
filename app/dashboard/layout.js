"use client"

import { UserContext } from '@/context/Contex';
import React, { useContext, useEffect, useState } from 'react'
import SignIn from '../signIn/page';
import SideBar from '@/components/SideBar';
import { getFromStorage } from '@/context/LocalStorage';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({children}) => {
    const router = useRouter()
    const [loggedInUser] = useContext(UserContext);
    const userEmail = getFromStorage('userEmail')
    console.log('fromLayout', userEmail)
    return (
      <section>
         { 
         userEmail ?
          <aside className="flex gap-6">
              <SideBar/>
              <div className="m-3 text-xl text-gray-900 font-semibold">
                  {children}
              </div>
          </aside>
          :
          router.push('/')
         }
      </section>
  )
}

export default DashboardLayout