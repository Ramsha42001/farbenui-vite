import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Divider,
  Paper,
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  List,
  ListItem,
  IconButton,
  Tooltip,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GetAppIcon from '@mui/icons-material/GetApp';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { scheduleInvoice ,getSchedules} from '../redux/features/schedule/scheduleSlice';
import { previewInvoice } from '../redux/features/preview/previewSlice';

const ScheduleInvoice = () => {
  const dispatch = useDispatch();
  const filename = localStorage.getItem('filename');
  const token=localStorage.getItem('token');
  const invoiceResponse = JSON.parse(localStorage.getItem('invoicePreview')) || {};
  let invoiceData = JSON.parse(localStorage.getItem('invoiceData'));

  if(!token || !invoiceResponse){
    navigate('/auth/login');
  }

  const [formData, setFormData] = React.useState({
    customerName: invoiceData.clientName,
    email: invoiceData.clientEmail,
    location: invoiceData.country + ', ' + invoiceData.state,
    phoneNumber: invoiceData.contactNumber,
    invoiceSendTo: '',
    invoiceDeliveryTo: '',
    schedulerDate: null,
    time: null,
    repeatMonths: 0,
  });

  const [scheduleDates, setScheduleDates] = useState([]);
  const [invoiceSchedule,setInvoiceSchedule] = useState([]);
  const [response,setResponse] = useState([]);

  // Handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, schedulerDate: date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time: time });
  };

  const createSchedule = (repeatMonths, startDate, startTime) => {
    
    if(!startDate || !startTime){
        return [];
    }
    const newScheduleDates = [];
    const startingDate = new Date(startDate);

    const startTimeHours = startTime.hour();
    const startTimeMinutes = startTime.minute();
    for (let i = 0; i < repeatMonths; i++) {
      const nextDate = new Date(startingDate);
      nextDate.setMonth(startingDate.getMonth() + i);
      nextDate.setHours(startTimeHours, startTimeMinutes, 0, 0);
      newScheduleDates.push(dayjs(nextDate)); // Convert to dayjs object for consistency
    }
    
    return newScheduleDates;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      invoiceData = {
        ...invoiceData,
        time: formData.repeatMonths,
      };
      console.log(invoiceData);

      // Generate schedule before dispatching
      const schedule = createSchedule(
        formData.repeatMonths,
        formData.schedulerDate,
        formData.time
      );
      setScheduleDates(schedule); // Update state with the generated schedule

      const response = await dispatch(scheduleInvoice(invoiceData));
      setInvoiceSchedule(response);
      if (response.status === 200) {
        console.log(response);
        alert("Invoice scheduled successfully");
      }
      console.log(response);
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    }
  };

 useEffect(() => {
  const response = dispatch(getSchedules(invoiceResponse.client.email)).then((res) => {
    setResponse(res.dates);
  });
 }, []);

 console.log(response);


 

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        p: 0,
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '100vh',
        height: 'auto', // Ensure full viewport height
      }}
    >
      {/* Left Section - Invoice Preview (20%) */}
      <Paper
        elevation={2}
        sx={{
          width: '25%',
          overflowY: 'auto',
          minHeight: '500px',
          height: 'auto',
          p: 2,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        className="mx-1 my-4"
      >
        <Typography variant="h6" className="font-bold mb-2" sx={{ fontSize: '16px' }}>
          Invoice
        </Typography>
        <Divider className="mb-4" />

        {/* Invoice Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            textAlign: 'right',
          }}
        >
          <Typography variant="body2" className="mb-1 text-left" sx={{ fontSize: '12px' }}>
            <strong className="font-small">Invoice ID:</strong>{' '}
            {invoiceResponse.invoice_id}
          </Typography>
          <Typography variant="body2" className="mb-1" sx={{ fontSize: '12px' }}>
          <strong className="font-small">Date:</strong>{' '}
          {new Date(invoiceResponse.date).toLocaleDateString()}
          </Typography>
        </Box>
        <Typography variant="body2" className="mb-4" sx={{ fontSize: '12px' }}>
        <strong className="font-small">Address:</strong>{' '}
        {invoiceResponse.client.address}
        </Typography>

        {/* Client Information */}
        <Typography
          variant="body2"
          className="mb-1"
          sx={{ fontSize: '12px', marginTop: '20px' }}
        >
            <strong className="font-medium"> Bill To: </strong> {invoiceResponse.client.email}
        </Typography>
        <Typography variant="body2" className="mb-1" sx={{ fontSize: '12px' }}>
        {invoiceResponse.client.name}
        </Typography>

        <Typography
          variant="body2"
          className="font-bold mb-2"
          sx={{ marginTop: '20px' }}
        >
          Items:
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            marginTop: '10px',
            width: '250px', // Fixed width
            border: '1px solid black',
            borderRadius: '0px',
          }}
        >
          <Table
            size="small"
            aria-label="a dense table"
            sx={{ tableLayout: 'fixed' }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: '40%',
                    fontSize: '10px',
                    padding: '6px',
                    border: '1px solid black',
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
                  }}
                >
                  total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceResponse.line_items.map((item, index) => (
                <TableRow key={index}>
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
                    {item.description }
                    </TableCell>
                    <TableCell
                    align="right"
                    sx={{
                        fontSize: '10px',
                        padding: '6px',
                        border: '1px solid black',
                    }}
                    >
                    {item.quantity}
                    </TableCell>
                    <TableCell
                    align="right"
                    sx={{
                        fontSize: '10px',
                        padding: '6px',
                        border: '1px solid black',
                    }}
                    >
                    {item.price}
                    </TableCell>
                    <TableCell
                    align="right"
                    sx={{
                        fontSize: '10px',
                        padding: '6px',
                        border: '1px solid black',
                    }}
                    >
                    {item.quantity * item.price}
                    </TableCell>
                </TableRow>
                ))}

              {/* Total Row */}
              <TableRow>
                <TableCell
                  colSpan={3}
                  align="right"
                  sx={{
                    fontSize: '10px',
                    padding: '6px',
                    border: '1px solid black',
                  }}
                >
                  Total
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    fontSize: '10px',
                    padding: '6px',
                    border: '1px solid black',
                  }}
                >
                   {invoiceData.total}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Line Items (Simplified) */}

        {/* {invoiceScheduleData.map((item, index) => (
          <Box key={item.id} className="flex justify-between text-sm mb-1">
            <Typography variant="body2">
              {index + 1}. {item.invoiceDate}
            </Typography>
            <Typography variant="body2">${item.total}</Typography>
          </Box>
        ))} */}
        <Divider className="my-2" />
      </Paper>

      {/* Middle Section (50%) - Scheduling Form */}
      <Paper
        elevation={2}
        sx={{
          width: '50%',
          p: 3,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        className="my-4"
      >
        <Typography variant="h5" className="font-bold mb-4">
          Schedule Invoice
        </Typography>
        <Divider className="mb-4" />
        <form onSubmit={handleSubmit}>
          {/* <Typography variant="h6" className="font-bold my-2">
            Customer Details
          </Typography> */}
          <Container
            maxWidth={false}
            disableGutters
            sx={{ marginTop: '20px', marginBottom: '20px' }}
          >
            {/* Use Container instead of Grid */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {' '}
              {/* Use Box for vertical layout */}
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <TextField
                  sx={{ width: '50%' }}
                  label="Customer Name"
                  name="customerName"
                  value={invoiceResponse.client.name}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  className="bg-gray-100"
                />
                <TextField
                  sx={{ width: '50%' }}
                  label="Location"
                  name="location"
                  value={invoiceResponse.client.address}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  className="bg-gray-100"
                />
              </Box>
              <TextField
                fullWidth
                label="Email ID"
                name="email"
                value={invoiceResponse.client.email}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                type="email"
                className="bg-gray-100"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={invoiceResponse.client.phone}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                type="tel"
                className="bg-gray-100"
              />
              {/* <TextField
                fullWidth
                label="Invoice Sending To"
                name="invoiceSendTo"
                value={formData.invoiceSendTo}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                className="bg-gray-100"
              /> */}
              {/* <TextField
                fullWidth
                label="Invoice Delivery To"
                name="invoiceDeliveryTo"
                value={formData.invoiceDeliveryTo}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                className="bg-gray-100"
              /> */}
            </Box>
          </Container>

          <Container
            maxWidth={false}
            disableGutters
            sx={{ marginTop: '120px' }}
          >
            <Typography
              variant="h6"
              className="font-bold mb-2 mt-4"
              sx={{ marginBottom: '10px' }}
            >
              Scheduler
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: '50%' }}
                    label="Date"
                    value={formData.schedulerDate}
                    onChange={handleDateChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        className="bg-gray-100"
                      />
                    )}
                  />
                  <TimePicker
                    sx={{ width: '50%' }}
                    label="Time"
                    value={formData.time}
                    onChange={handleTimeChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size="small"
                        className="bg-gray-100"
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
              <Typography variant="body1" className="mb-2">
                Repeat:
              </Typography>
              <Select
                sx={{ marginBottom: '20px' }}
                fullWidth
                value={formData.repeatMonths}
                onChange={(e) =>
                  setFormData({ ...formData, repeatMonths: e.target.value })
                }
                variant="outlined"
                size="small"
                className="bg-gray-100"
              >
                <MenuItem value={0}>Don't Repeat</MenuItem>
                <MenuItem value={1}>Every Month</MenuItem>
                <MenuItem value={3}>Every 3 Months</MenuItem>
                <MenuItem value={6}>Every 6 Months</MenuItem>
                <MenuItem value={12}>Every Year</MenuItem>
              </Select>
            </Box>
          </Container>

          <Button
            type="submit" // Make the button a submit button
            variant="contained"
            color="primary"
            className="mt-4"
            sx={{ backgroundColor: '#EB5A3C' }}
          >
            Schedule
          </Button>
        </form>
      </Paper>

      {/* Right Section (30%) - Invoice Schedule List */}
      <Paper
        elevation={2}
        sx={{
          width: '30%',
          p: 2,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        className="mx-1 my-4"
      >
        <div className="bg-white rounded-lg shadow-md p-6"> {/* Card styling */}
      <Typography variant="h6" className="font-bold mb-4 text-xl text-gray-800"> {/* Improved heading */}
        Invoice Schedule
      </Typography>
      <div className="mb-6 border-b border-gray-200"></div> {/* Styled divider */}
      <ul className="list-none pl-0"> {/* Unordered list for better spacing control */}
        {response.map((item, index) => (
          <li key={index} className="py-2 border-b border-gray-200 last:border-b-0"> {/* List item styling */}
            <div className="flex items-center"> {/* Flexbox for icon and text */}
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0c0 .55.22.99.5.99H13.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H6.5a.5.5 0 00-.5.5v1zM6 14a1 1 0 112 0 1 1 0 01-2 0zm7 0a1 1 0 112 0 1 1 0 01-2 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Typography variant="body1" className="text-gray-700"> {/* Improved text styling */}
                {item}
              </Typography>
            </div>
          </li>
        ))}
      </ul>
    </div>
      </Paper>
    </Container>
  );
};

export default ScheduleInvoice;