import React from 'react'
import {Route,Routes,Navigate} from 'react-router-dom'
import DataPage from '../../views/DataPage.jsx'
import DocumentPage from '../../views/Document.jsx'
import Contract from '../../views/Contract.jsx'
import Approve from '../../views/Approve.jsx'

const DataRoutes=()=>{
    return(
        <>
        <Routes>
          <Route path="/">
          <Route index element={<Navigate to="documents" replace />} />
          <Route path="documents" element={<DocumentPage />} />
          <Route path="invoice" element={<Contract />} />
          <Route path="approve" element={<Approve />} />
          </Route>
        </Routes>
        </>
    )
}

export default DataRoutes;