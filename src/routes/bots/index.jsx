import React from 'react'
import {Route,Routes} from 'react-router-dom'
import BotList from '../../views/BotList.jsx'
import BotSettings from '../../views/BotSettings.jsx'

const BotRoutes=()=>{
    return(
        <>
        <Routes>
            <Route path="/" element={<BotList />}   />
            <Route path="/setting" element={<BotSettings />} />
        </Routes>
        </>
    )
}

export default BotRoutes;