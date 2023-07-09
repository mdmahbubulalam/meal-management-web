"use client"
import Nav from '@/components/Nav';
import Link from 'next/link';
import React from 'react'
import { useForm } from "react-hook-form";


const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
    const url = `https://meal-management-server.onrender.com/api/auth/signIn`
    try {
      setLoading(true)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const userEmail = {
          email:email
        }
        setLoggedInUser(userEmail)
        console.log('User signed in successfully!');
        setLoading(false)
        router.push(`/signIn`);
        // Additional actions after successful sign-in, such as navigating to another screen
      } else {
        console.log('Sign-in failed.');
        setLoading(false)
        
        // Handle sign-in failure, such as displaying an error message
      }
    } catch (error) {
      console.log(error);
      // Handle any other error that may occur during sign-in
    }
    };
    return (
      <>
      <Nav/>
      <section className='flex justify-center mt-6'>
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md shadow-amber-500 rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Name
                    </label>
                    <input {...register("errorText", { required: true })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" id="username" type="text" placeholder="Name" />
                    {errors.errorText && <p className="text-red-500 text-xs italic">Please write your name.</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                        Email
                    </label>
                    <input {...register("errorText", { required: true })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" id="email" type="email" placeholder="Email" />
                    {errors.errorText && <p className="text-red-500 text-xs italic">Please write the email.</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input {...register("errorText", { required: true })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" id="password" type="password" placeholder="******************" />
                    {errors.errorText && <p className="text-red-500 text-xs italic">Please write the password.</p>}
                    
                </div>
                <div className="flex items-center justify-between">
                    <input type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  />
                </div>
                <p className='text-center text-gray text-sm font-bold pt-2'>Already registered? <Link href='/signIn' className='text-amber-500 hover:text-amber-600'>SignIn</Link></p>
            </form>
            
        </div>
      </section>
      </>
      
        
        
    )
}

export default SignUp