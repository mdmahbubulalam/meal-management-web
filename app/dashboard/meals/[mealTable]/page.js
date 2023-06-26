"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useParams, useRouter } from 'next/navigation'

const MealTable = () => {
    const params = useParams();
    const router = useRouter();
    const monthName = params.mealTable;
    const [meals, setMeals] = useState([]);
    const [latestMonth, setLatestMonth] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [rowId, setRowId] = useState("")
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/meals/currentMonthMealInfo?monthName=${monthName}`

    console.log(meals)

  
    const columns = [
        {
            name: 'Date',
            selector: row => row.date,
        },
        {
            name: 'Name',
            selector: row => row.userName,
            sortable: true,
        },

        {
          name: 'Expense',
          selector: row => row.expense,
          sortable: true,
        },

        {
          name: 'Meal Count',
          selector: row => row.mealCount,
          sortable: true,
        },


        {
           name: 'Action',
           cell : row =>  
           <p className='flex gap-3'>
            <button
             onClick={() => {
              setEditModal(true)
              setRowId(row._id)
            }
          }>
              <FaEdit className='text-cyan-950' size={15}/>
            </button> 
            <button 
              onClick={() => {
                setDeleteModal(true)
                setRowId(row._id)
              }
                 
                }>
              <AiFillDelete className='text-red-500' size={15}/>
            </button>
           </p>
        }
    ];

    useEffect(()=>{
      const fetchPost = async () => {
      const res = await fetch(url)
      const data = await res.json();
      setMeals(data.meal);
    }
    fetchPost()
  },[monthName])
      
      const customStyle = {
        headCells : {
          style : {
            backgroundColor : 'lightGray',
            fontWeight : 'bold',
            fontSize : '15px',
            color : 'gary',
            border : '2px',
            textTransform: 'uppercase'
          }
        },

        rows : {
          style : {
            backgroundColor : '#F9FAFB',
            fontWeight : '500',
            fontSize : '15px',
            color : '#788088'
          }
        },
      }
  return (
    <section className='w-full text-center flex flex-col justify-center'>
      {
        error && <p className='text-md text-red-600 text-center'>{error}</p>
      }

      {
        success && <p className='text-md text-green-600 text-center'>{success}</p>
      }
      <button onClick={() => router.push(`/dashboard/meals/${monthName}/userList`)}  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Meal</button>
      <DataTable
            title = 'Manage Table'
            columns={columns}
            data={meals}
            customStyles={customStyle}
        />

        {/* {
          deleteModal ?
            <DeleteMonth 
              months={months} 
              setMonths={setMonths} 
              rowId={rowId} 
              setDeleteModal = {setDeleteModal}
              setError ={setError}
              setSuccess ={setSuccess}
              /> 
            : null

        }

        {
          addModal ? 
          <AddMonth
            months={month}
            setMonths={setMonth} 
            setAddModal={setAddModal}
            setError ={setError}
            setSuccess ={setSuccess}
            
          />
          : null
        }

{
          editModal ? 
          <EditMonth
            rowId={rowId} 
            setEditModal={setEditModal}
            setError ={setError}
            setSuccess ={setSuccess}
            setMonths={setMonths} 
            months={months}
          />
          : null
        } */}

       

    </section>
  )
}

export default MealTable