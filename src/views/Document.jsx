import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Fade } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { listDocuments, setLoading,createDocument,deleteDocument } from '../redux/features/document/documentSlice';

function Documents() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [token, setToken] = useState(null);
  const userEmail = useSelector(state => state?.auth?.user?.email);
  const documents = useSelector(state => state?.document?.documents || []);

  const loading = useSelector(state => state?.document?.loading || false);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);
  
  useEffect(() => {
    if (token) {
      dispatch(listDocuments(userEmail));
    }
  }, [token, dispatch]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !token) return;
  
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append('file', file);
      
      await dispatch(createDocument({documentData:formData,token:token}));
      dispatch(listDocuments(userEmail));
      // If we reach here, the upload was successful
     
      setFile(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      dispatch(setLoading(false));
   
    
    }
  };

  const handleDeleteFile = (filename) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      dispatch(deleteDocument(filename,token))
        .then(() => {
          dispatch(listDocuments(userEmail));
        })
        .catch((error) => {
          console.error('Error deleting file:', error);
        });
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
              Uploaded Documents
            </Typography>
          </motion.div>
            
          {documents.length === 0 ? (
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
                <Table>
                  <TableHead className="bg-gray-50">
                    <TableRow>
                      <TableCell className="font-semibold">S.No</TableCell>
                      <TableCell className="font-semibold">File Name</TableCell>
                      <TableCell className="font-semibold">Type</TableCell>
                      <TableCell className="font-semibold">Status</TableCell>
                      <TableCell className="font-semibold">Uploaded At</TableCell>
                      <TableCell className="font-semibold">Last Updated</TableCell>
                      <TableCell className="font-semibold">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {documents.map((doc, index) => (
                      <motion.tr
                        key={doc.document_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onMouseEnter={() => setHoveredRow(doc.document_id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          backgroundColor: hoveredRow === doc.document_id ? 'rgba(59, 130, 246, 0.05)' : 'inherit',
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium text-gray-700">{doc.filename}</TableCell>
                        <TableCell>
                          <motion.span 
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 inline-block"
                          >
                            {doc.filename.split('.').pop().toUpperCase()}
                          </motion.span>
                        </TableCell>
                        <TableCell>
                          <motion.span 
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 inline-block"
                          >
                            Processed
                          </motion.span>
                        </TableCell>
                        <TableCell>{formatDate(doc.created_at)}</TableCell>
                        <TableCell>{formatDate(doc.updated_at)}</TableCell>
                        <TableCell>
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
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

export default Documents;