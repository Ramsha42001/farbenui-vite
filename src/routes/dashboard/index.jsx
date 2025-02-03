import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import Dashboard from '../../views/Dashboard.jsx'
import AssistantAnalytics from '../../components-reuse/DashboardComponents/AssistantAnalytics.jsx'
import ConversationAnalytics from '../../components-reuse/DashboardComponents/ConversationalAnalytics.jsx'
import UserAnalytics from '../../components-reuse/DashboardComponents/UserAnalytics.jsx'

const DashboardRoutes=()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<Dashboard />}>
             <Route index element={<Navigate to="assistant" replace />} />
             <Route path="assistant"  element={<AssistantAnalytics />}/>
             <Route path="conversation"  element={<ConversationAnalytics />}/>
             <Route path="user"  element={<UserAnalytics />}/>
            </Route>
        </Routes>
        </>
    )
}

export default DashboardRoutes

