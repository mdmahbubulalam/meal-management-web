import React, { useEffect, useState } from 'react'

const MemberMealInfo = ({email, mealRate, monthName, userName}) => {
    const baseUrl = process.env.BASE_URL;
    const url =  `${baseUrl}/meals/userMealInfo?email=${email}&monthName=${monthName}`
    const [individualMeals, setIndividualMeals] = useState([]);
    
    const initialValue = 0;
    const singleUserExpense = individualMeals.reduce((accumulator, currentValue) => accumulator + currentValue.expense, initialValue);
    const singleUserMealCount = individualMeals.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);
    const totalTaka = Math.round(singleUserMealCount * mealRate);
    const giveOrTake = Math.round(singleUserExpense-totalTaka);

    useEffect(()=>{
        // setLoading(true)
        const fetchPost = async () => {
        const res = await fetch(url)
        const data = await res.json();
        setIndividualMeals(data.meal);
        // setLoading(false)
      }
      fetchPost()
    },[email,monthName])
  return (
    <div className='p-5 text-justify bg-black text-white font-bold text-lg rounded flex flex-col'>
        <p><span className='text-amber-400'>Name : </span> {userName} </p>
        <p><span className='text-amber-400'>Email : </span>{email} </p>
        <p><span className='text-amber-400'>Month : </span> {monthName} </p>
        <p><span className='text-amber-400'>Total Meal : </span> {singleUserMealCount}</p>
        <p><span className='text-amber-400'>Total Expense : </span> {singleUserExpense} </p>
        <p><span className='text-amber-400'>Total Taka : </span> {totalTaka} </p>
        <p><span className='text-amber-400'>{giveOrTake<0 ? "Give" : "Take"} : </span> {giveOrTake} </p>
    </div>
  )
}

export default MemberMealInfo