import React, { useEffect, useState } from 'react'

const SummeryModal = ({monthName, email, mealRate, setSummeryModal}) => {
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
    <div>
        
        
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                
                <div className="relative p-6 flex-auto">
                    <p className='text-slate-500 text-lg font-bold leading-relaxed'><span className='text-black'>Email :</span> {email} </p>
                    <p className='text-slate-500 text-lg font-bold leading-relaxed'><span className='text-black'>Month :</span> {monthName} </p>
                    <p className='text-slate-500 text-lg font-bold leading-relaxed'><span className='text-black'>Total Meal :</span> {singleUserMealCount} </p>
                    <p className='text-slate-500 text-lg font-bold leading-relaxed'><span className='text-black'>Total Expense :</span> {singleUserExpense} Taka </p>
                    <p className='text-slate-500 text-lg font-bold leading-relaxed'><span className='text-black'>Total Taka : </span> {totalTaka} Taka</p>
                    <p className='text-slate-500 text-lg font-bold leading-relaxed'><span className='text-black'>{giveOrTake<0 ? "Give" : "Take"} :</span> {giveOrTake} Taka </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-red-500 text-white text-red-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setSummeryModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  )
}

export default SummeryModal