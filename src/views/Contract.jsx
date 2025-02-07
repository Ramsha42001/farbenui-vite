import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Fade, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { listContracts, setLoadingContract, createContract, deleteContract} from '../redux/features/contract/contractSlice';
import { generateInvoice, getInvoiceByEmail } from '../redux/features/preview/previewSlice';
import { useNavigate } from 'react-router-dom';

function Contracts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [token, setToken] = useState(null);
  const [invoiceFiles, setInvoiceFiles] = useState([]);
  const [generatingInvoice, setGeneratingInvoice] = useState(null);
  const userEmail = useSelector(state => state?.auth?.user?.email);
  const contracts = useSelector(state => state?.contract?.contracts || []);
  const loading = useSelector(state => state?.contract?.loading || false);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);
  
  const fetchContracts = async () => {
    if (token) {
      await dispatch(listContracts(userEmail));
    }
  };

  const fetchInvoices = async () => {
    if (token) {
      const response = await dispatch(getInvoiceByEmail());
      if (response) {
        setInvoiceFiles(response);
      }
    }
  };

  useEffect(() => {
    fetchContracts();
    fetchInvoices();
  }, [token, dispatch]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const checkFile = (filename) => {
    return invoiceFiles && invoiceFiles.includes(filename);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !token) return;
  
    try {
      dispatch(setLoadingContract(true));
      const formData = new FormData();
      formData.append('file', file);
      
      await dispatch(createContract({documentData:formData,token:token}));
      await fetchContracts();
      setFile(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      dispatch(setLoadingContract(false));
    }
  };

  const handleDeleteFile = async (filename) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await dispatch(deleteContract(filename,token));
        await fetchContracts();
        alert('File deleted successfully');
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('Error deleting file');
      }
    }
  };

  const handleDownload = async (filename) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contracts/download/${filename}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const handlePreview = (filename) => {
    localStorage.setItem('filename', filename);
    navigate('/user/invoice/preview', { state: { filename } });
  };

  const handleGenerateInvoice = async (filename) => {
    try {
      setGeneratingInvoice(filename);
      await dispatch(generateInvoice(filename));
      await fetchInvoices();
      alert('Invoice generated successfully!');
    } catch (error) {
      console.error('Error generating invoice:', error);
      alert('Failed to generate invoice. Please try again.');
    } finally {
      setGeneratingInvoice(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const ModalContent = () => (
    <Box sx={modalStyle}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <Typography variant="h5" className="mb-6 font-semibold text-gray-800">
          Upload New File
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Box className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors duration-300">
            <CloudUploadIcon className="text-gray-400 text-5xl mb-2" />
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                component="span"
                variant="outlined"
                disabled={loading}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  mb: 2
                }}
              >
                Choose File
              </Button>
            </label>
            {file && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {file.name}
              </Typography>
            )}
          </Box>
          <Box className="flex justify-end gap-3">
            <Button 
              variant="outlined" 
              onClick={() => setShowModal(false)}
              disabled={loading}
              sx={{
                outline:'1px solid #EB5A3C',
                color:'#EB5A3C',
                borderRadius:'8px',
                textTransform:'none',
                '&:hover':{
                  bgcolor:'#EB5A3C',
                  color:'white',
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained"
              type="submit"
              disabled={!file || loading}
              sx={{
                bgcolor:'#EB5A3C',
                color:'white',
                borderRadius:'8px',
                textTransform:'none',
                '&:hover':{
                  bgcolor:'#f87b63',
                  color:'white',
                }
              }}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </Box>
        </form>
      </motion.div>
    </Box>
  );

  return (
    <Box className="min-h-[100vh] h-[auto] w-[100%]">
      <Box className="p-8 transition-all duration-300 ease-in-out">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        >
          <Box className="flex justify-between items-center mb-8">
            <Typography variant="h4" className="text-gray-800 font-bold tracking-tight">
              Data Upload Center
            </Typography>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={() => setShowModal(true)}
                sx={{ 
                  borderRadius: '8px', 
                  textTransform: 'none', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  bgcolor: '#EB5A3C',
                  '&:hover': {
                    bgcolor: '#EB5A3C',
                  }
                }}
              >
                Upload New File
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Fade in={showModal}>
            <div>
              <ModalContent />
            </div>
          </Fade>
        </Modal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-8"
        >
          <motion.div variants={itemVariants}>
            <Typography variant="h6" className="mb-6 text-gray-700 font-semibold">
              Uploaded Contracts
            </Typography>
          </motion.div>
            
          {contracts.length === 0 ? (
            <motion.div variants={itemVariants}>
              <Typography className="text-center text-gray-500 mt-8 italic">
                No files have been uploaded yet.
              </Typography>
            </motion.div>
          ) : (
            <motion.div 
              variants={itemVariants}
              className="shadow-lg rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            >
    <TableContainer component={Paper}>
  <Table sx={{ minWidth: 750, borderCollapse: 'separate', borderSpacing: 0 }}> {/* Increased minWidth */}
    <TableHead className="bg-gray-50">
      <TableRow>
        <TableCell className="font-semibold py-3 px-4">S.No</TableCell>
        <TableCell className="font-semibold py-3 px-4">File Name</TableCell>
        <TableCell className="font-semibold py-3 px-4">Type</TableCell>
        <TableCell className="font-semibold py-3 px-4">Status</TableCell>
        <TableCell className="font-semibold py-3 px-4">Uploaded At</TableCell> {/* Added Uploaded At */}
        <TableCell className="font-semibold py-3 px-4">Last Updated</TableCell>
        <TableCell className="font-semibold py-3 px-4">Download Contract</TableCell>
        <TableCell className="font-semibold py-3 px-4">Preview Invoice</TableCell>
        <TableCell className="font-semibold py-3 px-4">Generate Invoice</TableCell>
        <TableCell className="font-semibold py-3 px-4">Delete Contract</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {contracts.map((doc, index) => (
        <motion.tr
          key={doc.document_id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onMouseEnter={() => setHoveredRow(doc.document_id)}
          onMouseLeave={() => setHoveredRow(null)}
          style={{
            backgroundColor: hoveredRow === doc.document_id? 'rgba(59, 130, 246, 0.05)': 'inherit',
          }}
        >
          <TableCell className="py-2 px-4">{index + 1}</TableCell>
          <TableCell className="font-medium text-gray-700 py-2 px-4">{doc.filename}</TableCell>
          <TableCell className="py-2 px-4">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 inline-block"
            >
              {doc.filename.split('.').pop().toUpperCase()}
            </motion.span>
          </TableCell>
          <TableCell className="py-2 px-4">
            <motion.span
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 inline-block"
            >
              Processed
            </motion.span>
          </TableCell>
          <TableCell className="py-2 px-4">{formatDate(doc.created_at)}</TableCell> {/* Added Uploaded At */}
          <TableCell className="py-2 px-4">{formatDate(doc.updated_at)}</TableCell>
          <TableCell className="py-2 px-4">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => handleDownload(doc.filename)}
                className="text-blue-500 hover:text-blue-700"
              >
                <DownloadIcon />
              </IconButton>
            </motion.div>
          </TableCell>
          <TableCell className="py-2 px-4">
          { checkFile(doc.filename) ? <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => handlePreview(doc.filename)}
                className="text-green-500 hover:text-green-700"
              >
                <PreviewIcon />
              </IconButton>
            </motion.div> : <Typography className="text-gray-500">Invoice not generated</Typography>}
          </TableCell>
          <TableCell className="py-2 px-4">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              { checkFile(doc.filename) ? <Typography className="text-gray-500">Invoice generated</Typography> :
              generatingInvoice === doc.filename ? (
                <CircularProgress size={24} className="text-orange-500" />
              ) : (
                <IconButton
                  onClick={() => handleGenerateInvoice(doc.filename)}
                  className="text-orange-500 hover:text-orange-700"
                >
                  <ReceiptIcon />
                </IconButton>
              )}
            </motion.div>
          </TableCell>
          <TableCell className="py-2 px-4">
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                onClick={() => handleDeleteFile(doc.filename)}
                className="text-red-500 hover:text-red-700"
              >
                <DeleteIcon />
              </IconButton>
            </motion.div>
          </TableCell>
        </motion.tr>
      ))}
    </TableBody>
  </Table>
</TableContainer>
            </motion.div>
          )}
        </motion.div>
      </Box>
    </Box>
  );
}

export default Contracts;