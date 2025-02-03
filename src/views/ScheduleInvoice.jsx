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
import { useDispatch } from 'react-redux';
import { scheduleInvoice } from '../redux/features/schedule/scheduleSlice';
import { previewInvoice } from '../redux/features/preview/previewSlice';

const ScheduleInvoice = () => {
  const dispatch = useDispatch();
  const filename = localStorage.getItem('filename');
  let invoiceData = JSON.parse(localStorage.getItem('invoiceData'));

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
      
      if (response.status === 200) {
        console.log(response);
        alert("Invoice scheduled successfully");
      }
      console.log(response);
    } catch (err) {
      console.error('An unexpected error occurred:', err);
    }
  };

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
          <Typography variant="body2" className="mb-1" sx={{ fontSize: '12px' }}>
            <strong className="font-small">Invoice ID:</strong>{' '}
            {invoiceData.invoiceId}
          </Typography>
          <Typography variant="body2" className="mb-1" sx={{ fontSize: '12px' }}>
            Date
          </Typography>
        </Box>
        <Typography variant="body2" className="mb-4" sx={{ fontSize: '12px' }}>
          <strong className="font-medium">Address:</strong>{' '}
          {new Date(invoiceData.date).toLocaleDateString()}
        </Typography>

        {/* Client Information */}
        <Typography
          variant="body2"
          className="mb-1"
          sx={{ fontSize: '12px', marginTop: '20px' }}
        >
          <strong className="font-medium">Bill To:</strong> {invoiceData.clientEmail}
        </Typography>
        <Typography variant="body2" className="mb-1" sx={{ fontSize: '12px' }}>
        {invoiceData.clientName}
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
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {invoiceData.invoiceLineItems.map((item, index) => (
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
                    {item.itemName}
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
                ))} */}

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
                  value={formData.customerName}
                  onChange={handleInputChange}
                  variant="outlined"
                  size="small"
                  className="bg-gray-100"
                />
                <TextField
                  sx={{ width: '50%' }}
                  label="Location"
                  name="location"
                  value={formData.location}
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
                value={formData.email}
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
                value={formData.phoneNumber}
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
        <Typography variant="h6" className="font-bold mb-2">
          Invoice Schedule
        </Typography>
        <Divider className="mb-4" />
        <List>
          {scheduleDates.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  p: 1,
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)', // Subtle hover effect
                  },
                }}
                className="rounded-md"
              >
                <Container
                  maxWidth={false}
                  disableGutters
                  sx={{ display: 'flex', alignItems: 'center', px: 1 }}
                >
                  {' '}
                  <Box sx={{ width: '33%', textAlign: 'left' }}>
                    <Typography variant="body1" className="font-bold">
                      {/* Display Month and Time */}
                      {item.format('MMM')} 
                    </Typography>
                  </Box>
                  <Box sx={{ width: '33%', textAlign: 'center' }}>
                    <Typography variant="body1">
                      {/* Display Date */}
                      {item.format("DD MMM")}
                    </Typography>
                  </Box>
                  <Box sx={{ width: '33%', textAlign: 'right' }}>
                  <Typography variant="body1">
                      {/* Display Time */}
                      {item.format("hh:mm A")}
                    </Typography>
                    {/* <Tooltip title="View">
                      <IconButton
                        size="small"
                        sx={{
                          color: "#007bff",
                          "&:hover": {
                            color: "#0056b3",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton
                        size="small"
                        sx={{
                          color: "#28a745",
                          "&:hover": {
                            color: "#1e7e34",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <GetAppIcon />
                      </IconButton>
                    </Tooltip> */}
                  </Box>
                </Container>
              </ListItem>
              {index < scheduleDates.length - 1 && (
                <Divider
                  sx={{
                    m: 0,
                    p: 0,
                    borderColor: "#e0e0e0",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ScheduleInvoice;