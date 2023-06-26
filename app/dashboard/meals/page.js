"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const MonthList = () => {
    const router = useRouter();
    const [months, setMonths] = useState([]);
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/months/allMonths`

    useEffect(() => {
        const fetchPost = async () => {
          const res = await fetch(url)
          const data = await res.json();
          data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
          setMonths(data);
        }
    
        fetchPost();
      },[])
    
  return (
    <section className='flex flex-col gap-3'>
        <h2 className='font-bold py-2 px-4 text-center'>Please choose a month</h2>
        {
            months.map( month=> 
                <button 
            onClick={() => router.push(`/dashboard/meals/${month.monthName}`)} 
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                {month.monthName}
            </button>
                
            )
        }
        
    </section>
  )
}

export default MonthList