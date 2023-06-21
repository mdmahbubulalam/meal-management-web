"use client"
import React, {  useState } from 'react'
import { useForm } from "react-hook-form";


const AddMonth = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const onSubmit = async (data) => {
        const monthName = data.monthName;
        const baseUrl = process.env.BASE_URL;
        const url = `${baseUrl}/months/addMonth`
    
        try {
        //   setLoading(true)
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                monthName
            }),
          });
    
          if (response.ok) {
            console.log('Month added successfully!');
            setSuccess('Month added successfully!')
            // setLoading(false)
          } else {
            console.log('Month added failed!');
            setError('Month added failed!');
            // setLoading(false)
            
          }
        } catch (error) {
          console.log(error);
        }
    };
  return (
        <section className='flex justify-center mt-6'>
            <div className="w-full max-w-xs ">
                {
                    error && <p className='text-md text-red-600 text-center pb-4'>{error}</p>
                }

                {
                    success && <p className='text-md text-green-600 text-center pb-4'>{success}</p>
                }
                
                <form className="bg-white shadow-md shadow-amber-500 rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="monthName">
                            Write Month Name
                        </label>
                        <input {...register("monthName", { required: true })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" id="monthName" type="monthName" placeholder="Month Name" />
                        {errors.monthName && <p className="text-red-500 text-xs italic">Please write the month name.</p>}
                    </div>
                    
                    <div className="flex items-center justify-between">
                        <input type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  />
                    </div>
                   
                </form>
                
            </div>
        </section>
  )
}

export default AddMonth