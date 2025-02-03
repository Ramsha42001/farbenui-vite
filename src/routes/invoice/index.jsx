import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import InvoicePreview from '../../views/InvoicePreview.jsx'
import ScheduleInvoice from '../../views/ScheduleInvoice.jsx'

const DataRoutes=()=>{
    return(
        <>
        <Routes>
          <Route path="/">
          <Route index element={<Navigate to="preview" replace />} />
          <Route path="preview" element={<InvoicePreview />} />
          <Route path="schedule" element={<ScheduleInvoice />} />
          </Route>
        </Routes>
        </>
    )
}

export default DataRoutes;