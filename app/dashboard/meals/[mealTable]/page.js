"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useParams, useRouter } from 'next/navigation'
import EditMeal from '@/components/modals/mealModal/EditMeal';
import DeleteMeal from '@/components/modals/mealModal/DeleteMeal';
import SummeryModal from '@/components/modals/summeryModal/SummeryModal';
import MemberList from '../../members/page';


const MealTable = () => {
    const params = useParams();
    const router = useRouter();
    const monthName = params.mealTable;
    const [meals, setMeals] = useState([]);
    const [members, setMembers] = useState([]);
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [summeryModal, setSummeryModal] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');
    const [rowId, setRowId] = useState('')
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/meals/currentMonthMealInfo?monthName=${monthName}`
    const url2 = `${baseUrl}/users/allUsers`

    const initialValue = 0;
    const totalExpense = meals.reduce((accumulator, currentValue) => accumulator + currentValue.expense, initialValue);
    const totalMealCount = meals.reduce((accumulator, currentValue) => accumulator + currentValue.mealCount, initialValue);
    const mealRate = totalExpense/totalMealCount;
    const ExpandedComponent = ({ data }) => <pre className='text-justify'>{JSON.stringify(data, null, 2)}</pre>;
    const columns = [
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
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

  useEffect(()=>{
    const fetchPost = async () => {
    const res = await fetch(url2)
    const data = await res.json();
    setMembers(data);
  }
  fetchPost()
},[])
      
      const customStyle = {
        headCells : {
          style : {
            backgroundColor : 'lightGray',
            fontWeight : 'bold',
            fontSize : '15px',
            color : 'gary',
            border : '2px',
            textTransform: 'uppercase',
          }
        },

        rows : {
          style : {
            backgroundColor : '#F9FAFB',
            fontWeight : '500',
            fontSize : '15px',
            color : '#788088',
          }
        },
      }
  return (
    <section className='grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-4'>
      <div className='lg:col-span-2 text-center'>
        <div>
        {
          error && <p className='text-md text-red-600 text-center'>{error}</p>
        }

        {
          success && <p className='text-md text-green-600 text-center'>{success}</p>
        }
       
        
        </div>

        <div>
        <button onClick={() => router.push(`/dashboard/meals/${monthName}/userList`)}  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Meal</button>
        <DataTable
                title = 'Manage Meal Table'
                columns={columns}
                data={meals}
                customStyles={customStyle}
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                dense
            />
        </div>
       
          
        

       
      </div>
      <div>
        <div className='bg-black p-4 text-white rounded'>
          <div className='pb-4'>
            <h1 className='text-2xl pb-2 uppercase'>Summery of {monthName}</h1>
            <p className='text-base'>Total Meal : {totalMealCount} </p>
            <p className='text-base'>Total Expense : {totalExpense} </p>
            <p className='text-base'>Meal Rate : {mealRate} </p>
          </div>
          <hr/>

        {
          members.map(member => 
            <div className='pt-5'>
              <button onClick={() => {
                setSummeryModal(true)
                setEmail(member.email)
              }}
              key={member._id} 
              className="w-full bg-amber-500 hover:bg-amber-600 text-white text-base font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Summery of {member.username}</button>
            </div>
          
            )
        }
         
          
        </div>
      </div>
      
      {
          editModal ? 
          <EditMeal
            rowId={rowId} 
            setEditModal={setEditModal}
            setError ={setError}
            setSuccess ={setSuccess}
          />
          : null
        }

        {
          deleteModal ?
            <DeleteMeal 
              rowId={rowId}
              meals={meals} 
              setMeals={setMeals} 
              setDeleteModal = {setDeleteModal}
              setError ={setError}
              setSuccess ={setSuccess}
              /> 
            : null

        }

        {
          summeryModal ?
          <SummeryModal
            monthName = {monthName}
            email = {email}
            mealRate = {mealRate}
            setSummeryModal = {setSummeryModal}
          />
          : null
        }
    </section>
  )
}

export default MealTable