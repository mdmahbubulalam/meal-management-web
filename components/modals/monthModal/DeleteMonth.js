import React, { useState } from 'react'

const DeleteMonth = ({setDeleteModal, rowId, months, setMonths, setSuccess, setError}) => {
    const baseUrl = process.env.BASE_URL;
    const url =  `${baseUrl}/months/${rowId}`

    const handleDelete = async () => {
        try {
         
          const response = await fetch(url, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            const filteredMonth = months.filter((item) => item._id !== rowId);
            setMonths(filteredMonth);
            console.log('Month Deleted successfully!');
            setSuccess('Month Deleted successfully!')
            setDeleteModal(false)
            // setLoading(false)
          } else {
            console.log('Failed to delete month!');
            setError('Failed to delete month!');
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
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Are you sure, you want to delete this item?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-emerald-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setDeleteModal(false)}
                  >
                    No
                  </button>
                  <button
                    className="bg-red-500 text-white text-red-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        handleDelete() 
                        }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  )
}

export default DeleteMonth