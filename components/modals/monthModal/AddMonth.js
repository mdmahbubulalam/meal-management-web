import React from 'react'
import { useForm } from 'react-hook-form';

const AddMonth = ({setAddModal, setSuccess, setError, months, setMonths}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {

       
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
              monthName: data.monthName,
            }),
          });
    
          if (response.ok) {
            console.log('Month added successfully!');
            setSuccess('Month added successfully!')
            setAddModal(false)
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="monthName">
                                Write Month Name
                            </label>
                            <input {...register("monthName", { required: true })} className="shadow border appearance-none  shadow-amber-500 rounded w-full py-2 px-3 text-gray-700 mb-3 focus:outline-none focus:border-amber-500" id="monthName" type="monthName" placeholder="Month Name" />
                            {errors.monthName && <p className="text-red-500 text-xs italic">Please write the month name.</p>}
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

export default AddMonth