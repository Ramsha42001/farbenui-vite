import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Outlet, useRoutes, Navigate } from 'react-router-dom';

import AuthRoute from './auth/index.jsx'
import Dashboard from './dashboard/index.jsx';
import DataRoutes from './data/index.jsx';
import BotRoutes from './bots/index.jsx';
import InvoiceRoutes from './invoice/index.jsx';

//import main page and other page components
import Home from '../views/Home.jsx'
import Marketplace from '../views/Marketplace.jsx'
import Instruction from '../views/Instructions.jsx'
import DashboardRoutes from './dashboard/index.jsx';
import Header from '../components-reuse/features/Header';
import Sidebar from '../components-reuse/features/Sidebar';


const Layout = ({ children }) => (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="w-[100%] mt-[10px] h-[calc(100vh-100px)]">
          {children}
        </div>
      </div>
    </>
  );
  
  const SimpleLayout = ({ children }) => (
      <>
        <Header />
        <div className="w-[100%] mt-[10px] h-[calc(100vh-100px)]">
          {children}
        </div>
      </>
    );



const AppRoute = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <SimpleLayout><Outlet /></SimpleLayout>,
      children: [
        { index: true, element: <Home /> },
        { path: 'auth/*', element: <AuthRoute /> },
      ]
    },
    {
      path: '/user',
      element: <Layout><Outlet /></Layout>,
      children: [
        { path: 'dashboard/*', element: <DashboardRoutes /> },
        { path: 'data/*', element: <DataRoutes /> },
        { path: 'bots/*', element: <BotRoutes /> },
        { path: 'marketplace', element: <Marketplace /> },
        { path: 'instruction', element: <Instruction /> },
        { path: 'invoice/*', element: <InvoiceRoutes /> },
        { path: '*', element: <Navigate to="dashboard" replace /> } // 404 to dashboard

      ]
    },

  ]);

  return element;
};

export default AppRoute;