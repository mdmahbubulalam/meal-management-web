"use client"
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import DeleteMember from '@/components/modals/memberModal/DeleteMember';
import EditMember from '@/components/modals/memberModal/EditMember';


const MemberList = () => {
    const [members, setMembers] = useState([]);
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [rowId, setRowId] = useState('')
    const baseUrl = process.env.BASE_URL;
    const url = `${baseUrl}/users/allUsers`

  
    const columns = [
        {
            name: 'Name',
            selector: row => row.username,
        },
        {
            name: 'Email',
            selector: row => row.email,
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
      <button onClick={() => setAddModal(true)} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Member</button>
      <DataTable
            title = 'Manage Table'
            columns={columns}
            data={members}
            customStyles={customStyle}
        />


        {
          editModal ? 
          <EditMember
            rowId={rowId} 
            setEditModal={setEditModal}
            setError ={setError}
            setSuccess ={setSuccess}
            members={members} 
            setMembers={setMembers} 
          />
          : null
        }



        {
          deleteModal ?
            <DeleteMember 
              rowId={rowId}
              members={members} 
              setMembers={setMembers} 
              setDeleteModal = {setDeleteModal}
              setError ={setError}
              setSuccess ={setSuccess}
              /> 
            : null

        }
    </section>
  )
}

export default MemberList