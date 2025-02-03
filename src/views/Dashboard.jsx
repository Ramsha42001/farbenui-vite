import React,{useState} from 'react'
import { Outlet,useNavigate } from 'react-router-dom';
import { Box, CssBaseline, Toolbar,Typography } from '@mui/material';
import Sidebar from '../components-reuse/features/Sidebar';



const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('assistant');
    const navigate=useNavigate()

    const handleNavigation=(path)=>{
        navigate(path)
    }

    return (
        <>
        <div className="w-[100%] flex flex-col align-center mb-4 p-10 h-[100vh]">
             <Typography variant="h4" className="text-left">Analytics</Typography>
           <div className="flex flex-row w-[100%] h-[80px] justify-between mt-[50px] bg-white rounded-lg shadow-md">
                <div
                    className={`w-1/3 py-4 cursor-pointer border-r border-gray-200 hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center group relative ${activeTab === 'assistant' ? 'bg-primary/5' : ''}`}
                    onClick={() => {
                        setActiveTab('assistant');
                        handleNavigation('/user/dashboard/assistant');
                    }}
                >
                    <span className="text-gray-700 group-hover:primary font-medium text-lg">Assistant Analytics</span>
                    <div className={`h-1 ${activeTab === 'assistant' ? 'w-full' : 'w-0'} group-hover:w-full bg-primary transition-all duration-300 absolute bottom-0`}></div>
                </div> 
                <div
                    className={`w-1/3 py-4 cursor-pointer border-r border-gray-200 hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center group relative ${activeTab === 'conversational' ? 'bg-primary/10' : ''}`}
                    onClick={() => {setActiveTab('conversational'); handleNavigation('/user/dashboard/conversation');}}
                >
                    <span className="text-gray-700 group-hover:primary font-medium text-lg">Conversational Analytics</span>
                    <div className={`h-1 ${activeTab === 'conversational' ? 'w-full' : 'w-0'} group-hover:w-full bg-primary transition-all duration-300 absolute bottom-0`}></div>
                </div>
                <div
                    className={`w-1/3 py-4 cursor-pointer hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center group relative ${activeTab === 'user' ? 'bg-primary/10' : ''}`}
                    onClick={() => {setActiveTab('user'); handleNavigation('/user/dashboard/user');}}
                >
                    <span className="text-gray-700 group-hover:primary font-medium text-lg">User Analytics</span>
                    <div className={`h-1 ${activeTab === 'user' ? 'w-full' : 'w-0'} group-hover:w-full bg-primary transition-all duration-300 absolute bottom-0`}></div>
                </div>
            </div>
            <Outlet />
        </div>
        </>
    )
}

export default Dashboard;