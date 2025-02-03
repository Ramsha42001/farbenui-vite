import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components-reuse/features/Sidebar';


const DashboardLayout = () => {
    return (
        <>
           <Sidebar />
           <div className='w-[100%] mt-[10px]'>
           <Outlet />
           </div>

        </>
    )
                        }

export default DashboardLayout;