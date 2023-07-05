"use client"
import { UserContext } from '@/context/Contex';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { Spinner } from "@material-tailwind/react";
import { saveToStorage } from '@/context/LocalStorage';



const SignIn = () => {
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const onSubmit = async (data) => {
        const email = data.email;
        const password = data.password;
        //console.log(data.email, data.password)
        const baseUrl = process.env.BASE_URL;
        const url = `${baseUrl}/auth/signIn`
    
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
            const memberEmail = JSON.stringify(userEmail.email)
            saveToStorage('userEmail', memberEmail)
          
            console.log('User signed in successfully!');
            setLoading(false)
              router.push(`/dashboard/dashboard`);
            // Additional actions after successful sign-in, such as navigating to another screen
          } else {
            setLoggedInUser('')
            router.push(`/signIn`);
            console.log('Sign-in failed.');
            setError('Wrong username or password')
            setLoading(false)
            
            // Handle sign-in failure, such as displaying an error message
          }
        } catch (error) {
          console.log(error);
          // Handle any other error that may occur during sign-in
        }
    };
    return (
        <section className='flex justify-center mt-6'>
         
            <div className="w-full max-w-xs ">
                {
                loading && <div className="flex justify-center"><Spinner className="h-10 w-10 text-blue-700/20" /></div>
                }
                <p className='text-md text-red-600 text-center pb-4'>{error}</p>
                <form className="bg-white shadow-md shadow-amber-500 rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                            Email
                        </label>
                        <input {...register("email", { required: true })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" id="email" type="email" placeholder="Email" />
                        {errors.email && <p className="text-red-500 text-xs italic">Please write the email.</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input {...register("password", { required: true })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500"  id="password" type="password" placeholder="******************" />
                        {errors.password && <p className="text-red-500 text-xs italic">Please write the password.</p>}
                        
                    </div>
                    <div className="flex items-center justify-between">
                        <input type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  />
                    </div>
                    <p className='text-center text-gray text-sm font-bold pt-2'>Not yet registered? <Link href='/signUp' className='text-amber-500 hover:text-amber-600'>SignUp</Link></p>
                </form>
                
            </div>
        </section>
        
        
    )
}

export default SignIn