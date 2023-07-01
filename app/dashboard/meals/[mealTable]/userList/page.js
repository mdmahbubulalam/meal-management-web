"use client"
import AddMeal from '@/components/modals/mealModal/AddMeal';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState([]);
    const [userEmail, setUserEmail] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/users/allUsers`

    useEffect(() => {
        const fetchPost = async () => {
          const res = await fetch(url)
          const data = await res.json();
          setUsers(data);
        }
    
        fetchPost();
      },[])
  return (
    <section className='flex flex-col gap-3'>
        <h2 className='font-bold py-2 px-4 text-center'>Please choose a member</h2>
        {
        error && <p className='text-md text-red-600 text-center'>{error}</p>
        }

        {
          success && <p className='text-md text-green-600 text-center'>{success}</p>
        }
        {
            users.map( user=> 
                <div 
                  className='bg-amber-500 hover:bg-amber-600 text-white p-4 rounded'
                  onClick={()=>{
                    setAddModal(true)
                    setUserName(user.username)
                    setUserEmail(user.email)
                  }}
                 >
                    <h4 className='text-xl font-bold'>Name: {user.username}</h4>
                    <p className='font-bold text-lg'>Email: {user.email}</p>
                </div>
                
                
            )
        }

        {
          addModal ? 
          <AddMeal
            userName={userName}
            userEmail={userEmail}
            setAddModal={setAddModal}
            setError ={setError}
            setSuccess ={setSuccess}
            
          />
          : null
        }

        
        
    </section>
  )
}

export default UserList