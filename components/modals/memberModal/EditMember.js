import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const EditMember = ({setEditModal, rowId, setSuccess, setError}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const baseUrl = process.env.BASE_URL;
    const url =  `${baseUrl}/users/${rowId}`
    const url2 =  `${baseUrl}/users/${rowId}`

    useEffect(() => {
            const fetchPost = async () => {
            const res = await fetch(url)
            const data = await res.json();
            setUserName(data?.user.username)
            setEmail(data?.user.email)
            setPassword(data?.user.password)
        }
        fetchPost();
    },[rowId])

    
    const onSubmit = async (data) => {
      try {
      //   setLoading(true)
        const response = await fetch(url2, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username : userName,
            email : email,
            password : password
          }),
        });
  
        if (response.ok) {
          //window.location.reload(true)
          console.log('Meal updated successfully!');
          setSuccess('Meal updated successfully!')
          setError('')
          setEditModal(false)
          // setLoading(false)
        } else {
          console.log('Meal update failed!');
          setError('Meal update failed!');
          setSuccess('')
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="userName">
                                User Name
                            </label>
                            <input {...register("userName")} 
                            className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" 
                            value = {userName}
                            onChange={(e) => setUserName(e.target.value)} 
                            id="userName" 
                            type="text" 
                            placeholder="userName" />
                            {errors.expense && <p className="text-red-500 text-xs italic">Please set user name.</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                                Email
                            </label>
                            <input {...register("email")} 
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}  
                            className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" 
                            id="email"  
                            type="email" 
                            placeholder="Email" />
                            
                            {errors.email && <p className="text-red-500 text-xs italic">Please set email.</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input {...register("password")} 
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}  
                            className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" 
                            id="password"  
                            type="password"  
                            placeholder="password" />
                            
                            {errors.password && <p className="text-red-500 text-xs italic">Please set password.</p>}
                        </div>
                        
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setEditModal(false)}
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

export default EditMember