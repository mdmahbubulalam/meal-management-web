"use client"
import React, { useContext, useState } from 'react'
import { HiMenuAlt3, HiUsers,  HiOutlineChevronDown} from "react-icons/hi";
import { MdOutlineDashboard,MdCalendarMonth } from "react-icons/md";
import { GiMeal } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SideBar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const menus = [
    { name: "Dashboard", click: "/dashboard/dashboard",  icon: MdOutlineDashboard },
    { name: "Months", icon: MdCalendarMonth, submenu: true, submenuItems:[
      {name: "Add Month", click: "/dashboard/months/addMonth" ,  icon: MdCalendarMonth},
      {name: "Manage Month", click: "/dashboard/months/manageMonth", icon: MdCalendarMonth},
    ] },
    { name: "Meals",  icon:  GiMeal},
    { name: "Users",  icon: HiUsers },
    { name: "Log Out",  icon: FiLogOut,  margin: true  },
  ];
  
  return (
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => {
              setOpen(!open) 
              setSubmenuOpen(false)}}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <div
             onClick={() => menu?.click && router.push( menu?.click) }

              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group text-sm cursor-pointer font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div className='flex  justify-between items-center '>
                <div className='flex gap-3.5 items-center'>
                  <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}00ms`,
                    }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                </h2>
                </div>
                {
                  menu.submenu && (
                    <div onClick={() => setSubmenuOpen(!submenuOpen)}>
                      <HiOutlineChevronDown />
                    </div>
                    
                  )
                }
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </div>

              {
                 menu.submenu && submenuOpen && (
                  <div  className='mt-4 flex flex-col gap-4'>
                    {
                      menu.submenuItems.map((submenuItem, i) => 
                        <h2
                        onClick={() => router.push(submenuItem?.click)}
                          key={i}
                          className='cursor-pointer font-medium hover:bg-amber-600 rounded p-2'
                        >

                          {submenuItem.name}
                        </h2>
                    )}
                  </div>
                  )
                }
              
            </div>
            
             
            
          ))}
        </div>
      </div>
      
      
  )
}

export default SideBar