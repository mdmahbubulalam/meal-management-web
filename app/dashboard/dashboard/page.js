"use client"

import { UserContext } from '@/context/Contex';
import React, { useContext, useEffect, useState } from 'react'
import SignIn from '../../signIn/page';
import Link from 'next/link';
import MemberMealInfo from '@/components/MemberMealInfo';

const Dashboard = () => {
  const [month, setMonth] = useState([]);
  const [meals, setMeals] = useState([]);
  const [members, setMembers] = useState([]);
  const monthName = month.monthName;
  const baseUrl = process.env.BASE_URL;
  const url = `${baseUrl}/months/allMonths`;
  const url2 = `${baseUrl}/meals/currentMonthMealInfo?monthName=${monthName}`;
  const url3 = `${baseUrl}/users/allUsers`
  

  const initialValue = 0;
  const totalExpense = meals.reduce((accumulator, currentValue) => accumulator + currentValue.expense, initialValue);
  const totalMealCount = meals.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);
  const mealRate = totalExpense/totalMealCount;

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(url)
      const data = await res.json();
      data.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1)
      setMonth(data[0]);
    }
    fetchPost();
  },[])

  useEffect(()=>{
    const fetchPost = async () => {
    const res = await fetch(url2)
    const data = await res.json();
    setMeals(data.meal);
  }
  fetchPost()
},[monthName])

useEffect(()=>{
  const fetchPost = async () => {
  const res = await fetch(url3)
  const data = await res.json();
  setMembers(data);
}
fetchPost()
},[])
  
  return (
    <section className='w-full'>
      <h1 className='text-2xl font-bold uppercase mb-5'>Summery of <Link href={`/dashboard/meals/${month.monthName}`}><span className='text-amber-600 hover:text-amber-700'>{monthName}</span></Link> </h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10 text-amber-400 text-xl font-bold mb-5'>
        <div className='p-5 text-center bg-black rounded'>
          <h1 >Total Meal</h1>
          <p>{totalMealCount}</p>
        </div>
        <div className='p-5 text-center bg-black rounded'>
          <h1>Total Expense</h1>
          <p>{totalExpense}</p>
        </div>
        <div className='p-5 text-center bg-black rounded'>
          <h1>Meal Rate</h1>
          <p>{mealRate ? mealRate : 0}</p>
        </div>
      </div>
      <hr/>
    
      <h1 className='text-2xl font-bold uppercase mb-5 mt-5'>Summery of Individual member </h1>
      
      <div className='grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-10 mb-5 '>
        {
          members.map(member =>
           <MemberMealInfo
              email={member.email}
              userName={member.username}
              mealRate = {mealRate}
              monthName = {monthName}
           />
          )
        }
      </div>
    </section>
  )
}

export default Dashboard