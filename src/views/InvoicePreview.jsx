import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';
import { useLocation, useNavigate } from 'react-router-dom';
import { previewInvoice, updatePreview } from '../redux/features/preview/previewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const InvoicePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoiceResponse = JSON.parse(localStorage.getItem('invoicePreview')) || {};
  const filename = localStorage.getItem('filename');
  const userEmail = useSelector(state => state.auth.user?.email);



  useEffect(() => {
    console.log('State from navigation:', location.state);
  }, [location]);

  useEffect(() => {
    if (location.state?.filename) {
      dispatch(previewInvoice(location.state.filename));
      console.log('Dispatching preview invoice for:', location.state.filename);
    }
  }, [dispatch, location.state]);

  const initialInvoiceData = {
    file_name: invoiceResponse.filename || '',
    invoiceId: invoiceResponse.invoice_id || '',
    date: invoiceResponse.date || new Date().toISOString(),
    clientName: invoiceResponse.client?.name || '',
    clientEmail: invoiceResponse.client?.email || '',
    address: invoiceResponse.client?.address || '',
    contactNumber: invoiceResponse.client?.contact_number || '',
    country: invoiceResponse.client?.country || '',
    state: invoiceResponse.client?.state || '',
    orderId: invoiceResponse.order_id || '',
    customerId: invoiceResponse.customer_id || '',
    status: invoiceResponse.status || 'draft',
    invoiceLineItems: Array.isArray(invoiceResponse.line_items)
      ? invoiceResponse.line_items.map(item => ({
        id: uuidv4(),
        description: item.description || '',
        quantity: item.quantity || '1',
        price: item.price || '0',
        total: String((Number(item.quantity) || 1) * (Number(item.price) || 0)),
      }))
      : [],
    total: Array.isArray(invoiceResponse.line_items)
      ? invoiceResponse.line_items.reduce(
        (sum, item) => sum + (Number(item.quantity) || 1) * (Number(item.price) || 0),
        0
      )
      : 0,
    notes: '',
  };

  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);

  const handleInputChange = (field, value) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleItemChange = (id, field, value) => {
    const updatedItems = invoiceData.invoiceLineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = String(
            (Number(updatedItem.quantity) || 0) * (Number(updatedItem.price) || 0)
          );
        }
        return updatedItem;
      }
      return item;
    });

    const newTotal = updatedItems.reduce((sum, item) => sum + Number(item.total), 0);

    setInvoiceData(prev => ({
      ...prev,
      invoiceLineItems: updatedItems,
      total: newTotal,
    }));
  };

  const handleAddItem = () => {
    const newItem = {
      id: uuidv4(),
      description: '',
      quantity: '1',
      price: '0',
      total: '0',
    };

    setInvoiceData(prev => ({
      ...prev,
      invoiceLineItems: [...prev.invoiceLineItems, newItem],
    }));
  };

  const handleRemoveItem = (id) => {
    setInvoiceData(prev => ({
      ...prev,
      invoiceLineItems: prev.invoiceLineItems.filter(item => item.id !== id),
    }));
  };

  const handleSubmit = async isDraft => {
    const formattedData = {
      invoice_details: {
        file_name: filename,
        invoiceId: invoiceData.invoiceId,
        date: invoiceData.date,
        clientName: invoiceData.clientName,
        clientEmail: invoiceData.clientEmail,
        address: invoiceData.address,
        contactNumber: invoiceData.contactNumber,
        country: invoiceData.country,
        state: invoiceData.state,
        orderId: invoiceData.orderId,
        customerId: invoiceData.customerId,
        status: isDraft ? 'draft' : 'approved',
        invoiceLineItems: invoiceData.invoiceLineItems.map(({ id, ...item }) => item),
      },
    };
    console.log(formattedData);

    try {
      const response = await dispatch(updatePreview(formattedData));
      console.log('Invoice updated:', response);

      if (!isDraft) {
        localStorage.setItem('invoiceData', JSON.stringify(formattedData));
        navigate('/user/invoice/schedule', { state: { invoiceData: formattedData } });
      }
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
  };

  return (
    <div className="min-h-[100vh] h-auto w-[100%] p-8 flex gap-0">
      {/* Left: Invoice Preview */}
      <div className="w-1/2 bg-white rounded-xl shadow-lg p-10 mr-2 overflow-y-auto border border-gray-100">
        <div className="mb-8 border-b pb-6">
          <div>
            <div className='flex flex-row'>
          <div className='flex flex-col'>
          <h1 className="text-2xl font-bold mb-3">Invoice</h1>
          <p className="text-gray-600 text-md">No. {invoiceData.invoiceId}</p>
         
          <p className="text-gray-600 text-md">
            Date: {format(new Date(invoiceData.date), 'MMMM dd, yyyy')}
          </p>
          </div>
          <p className="text-gray-600 mt-2 text-right">{invoiceData.address}</p>
          </div>
          </div>
        </div>

        <div className="mb-8 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Bill to:</h2>
          <p className="text-gray-700 text-md font-medium">{invoiceData.clientName}</p>
       
          <p className="text-gray-600">{invoiceData.clientEmail}</p>
          <p className="text-gray-600">{invoiceData.contactNumber}</p>
        </div>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: '10px',
            width: '100%', // Fixed width
            border: '1px solid black',
            borderRadius: '0px',
          }}
        >
          <Table size="small" aria-label="a dense table" sx={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: '40%',
                    fontSize: '10px',
                    padding: '6px',
                    border: '1px solid black',
                    fontWeight: 'bold',
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: '20%',
                    fontSize: '10px',
                    padding: '6px',
                    border: '1px solid black',
                    fontWeight: 'bold',
                  }}
                >
                  Qty
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: '20%',
                    fontSize: '10px',
                    padding: '6px',
                    border: '1px solid black',
                    fontWeight: 'bold',
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    width: '20%',
                    fontSize: '10px',
                    padding: '6px',
                    border: '1px solid black',
                    fontWeight: 'bold',
                  }}
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.invoiceLineItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontSize: '10px',
                      padding: '6px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      border: '1px solid black',
                    }}
                  >
                    {item.description}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: '10px', padding: '6px', border: '1px solid black' }}
                  >
                    {item.quantity}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: '10px', padding: '6px', border: '1px solid black' }}
                  >
                    {Number(item.price).toFixed(2)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: '10px', padding: '6px', border: '1px solid black' }}
                  >
                    {Number(item.total).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="right"
                  sx={{ fontSize: '10px', padding: '6px', border: '1px solid black', fontWeight: 'bold' }}
                >
                  Total
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontSize: '10px', padding: '6px', border: '1px solid black', fontWeight: 'bold' }}
                >
                  {invoiceData.total.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      </div>

      {/* Right: Edit Form */}
      <div className="w-[60%] bg-white rounded-xl shadow-lg p-10 overflow-y-auto border border-gray-100">
        <h1 className="text-2xl font-bold text mb-8">Edit Invoice</h1>

        {/* Customer Details Form */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Details</h2>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={invoiceData.clientName}
            onChange={e => handleInputChange('clientName', e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={invoiceData.clientEmail}
            onChange={e => handleInputChange('clientEmail', e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            variant="outlined"
            margin="normal"
            value={invoiceData.address}
            onChange={e => handleInputChange('address', e.target.value)}
          />
          <TextField
            label="Contact Number"
            fullWidth
            variant="outlined"
            margin="normal"
            value={invoiceData.contactNumber}
            onChange={e => handleInputChange('contactNumber', e.target.value)}
          />
          <div className='flex flex-row'>
          <TextField
            label="Country"
            width='50%'
            variant="outlined"
            margin="normal"
            value={invoiceData.country}
            onChange={e => handleInputChange('country', e.target.value)}
          />
          <TextField
            label="State"
            fullWidth
            variant="outlined"
            margin="normal"
            value={invoiceData.state}
            onChange={e => handleInputChange('state', e.target.value)}
          />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Items:</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
              sx={{
                backgroundColor: '#EB5A3C',
                '&:hover': {
                  backgroundColor: '#f87c65',
                },
              }}
            >
              Add Item
            </Button>
          </div>

          {invoiceData.invoiceLineItems.map(item => (
            <div key={item.id} className="mb-4 border border-gray-200 p-6 rounded-lg bg-gray-50">
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                margin="normal"
                value={item.description}
                onChange={e => handleItemChange(item.id, 'description', e.target.value)}
              />
              <div className="flex items-center gap-4 mt-4">
                <TextField
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  className="w-32"
                  value={item.quantity}
                  onChange={e => handleItemChange(item.id, 'quantity', e.target.value)}
                />
                <TextField
                  label="Price"
                  type="number"
                  variant="outlined"
                  className="w-48"
                  value={item.price}
                  onChange={e => handleItemChange(item.id, 'price', e.target.value)}
                />
                <IconButton
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="delete"
                  className="text-red-500 hover:text-red-700"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>

        <TextField
          label="Notes"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={invoiceData.notes}
          onChange={e => handleInputChange('notes', e.target.value)}
          className="mb-8"
        />

        <div className="flex gap-4">
          <Button
            variant="contained"
            className="w-full py-3"
            sx={{
              backgroundColor: '#EB5A3C',
              '&:hover': {
                backgroundColor: '#f87c65',
              },
            }}
            onClick={() => handleSubmit(true)}
          >
            Save Draft
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="w-full py-3"
            sx={{
              backgroundColor: '#EB5A3C',
              '&:hover': {
                backgroundColor: '#f87c65',
              },
            }}
            onClick={() => handleSubmit(false)}
          >
            Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;