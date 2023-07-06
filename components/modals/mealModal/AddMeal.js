import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const AddMeal = ({setAddModal, setSuccess, setError, userName , userEmail }) => {
    const params = useParams();
    const monthName = params.mealTable;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/meals/addMeal`
    const onSubmit = async (data) => {
        const dt = new Date(data.mealDate);
        const x = dt.toISOString().split('T');
        const x1 = x[0].split('-');
        const dateSelected = x1[2] + '-' + x1[1] + '-' + x1[0];

        try {
        //   setLoading(true)
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName,
                userEmail: userEmail,
                monthName: monthName,
                expense: data.expense,
                mealCount: data.mealCount,
                date: dateSelected
            }),
          });
    
          if (response.ok) {
            console.log('Meal added successfully!');
            setSuccess('Meal added successfully!')
            setAddModal(false)
            // setLoading(false)
          } else {
            console.log('Meal added failed!');
            setError('Meal added failed!');
            // setLoading(false)
            
          }
        } catch (error) {
          console.log(error);
        }
    };
  return (
    <div>
        
        
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                
                <div className="relative p-6 flex-auto">
                    <form className="bg-white shadow-md shadow-amber-500 rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="expense">
                                Todays expense
                            </label>
                            <input {...register("expense", { required: true, valueAsNumber: true, pattern:{value: /^(0|[1-9]\d*)(\.\d+)?$/}, })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" id="expense"  placeholder="Expense" />
                            {errors.expense && <p className="text-red-500 text-xs italic">Please add todays total expense.</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="expense">
                                Todays meal count
                            </label>
                            <input {...register("mealCount", { required: true, valueAsNumber: true, pattern:{value: /^(0|[1-9]\d*)(\.\d+)?$/}, })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" id="mealCount"  placeholder="Meal Count" />
                            {errors.mealCount && <p className="text-red-500 text-xs italic">Please add todays total meal.</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="mealDate">
                                Todays date
                            </label>
                            <input {...register("mealDate", { required: true })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" id="mealDate"  type="date" placeholder="Meal date" />
                            {errors.mealDate && <p className="text-red-500 text-xs italic">Please add todays date.</p>}
                        </div>
                        
                        
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setAddModal(false)}
                            >
                                No
                            </button>
                            <button
                                className="bg-amber-500 text-white text-red-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                                
                            >
                                Submit
                            </button>
                        </div>
                    
                    </form>
                </div>
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  )
}

export default AddMeal