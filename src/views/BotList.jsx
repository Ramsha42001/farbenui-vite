import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Fab } from '@mui/material';
import { MoreVert, Chat, Edit, Delete, PlayArrow } from '@mui/icons-material';
import { motion } from 'framer-motion';

const BotList = () => {
  const navigate = useNavigate();
  const [showChatWidget, setShowChatWidget] = useState(false);

  // Dummy data
  const bots = [
    {
      id: 1,
      name: 'Customer Service Bot',
      status: 'Active',
      document: 'customer_service.pdf',
      prompt: 'You are a helpful customer service assistant...',
      model: 'gemini-1.5-pro'
    },
    {
      id: 2, 
      name: 'Sales Assistant',
      status: 'Inactive',
      document: 'sales_handbook.pdf',
      prompt: 'You are an experienced sales assistant...',
      model: 'gemini-1.5-flash'
    },
    {
      id: 3,
      name: 'Technical Support',
      status: 'Active',
      document: 'tech_manual.pdf',
      prompt: 'You are a technical support specialist...',
      model: 'gemini-1.5-pro'
    }
  ];

  const handleCreateBot = () => {
    navigate('/user/bots/setting');
  };

  const handleEditBot = (bot) => {
    navigate(`/user/bots/setting/${bot.id}`, { state: { bot } });
  };

  const handleDeleteBot = (botId) => {
    // Add delete logic
    console.log('Delete bot:', botId);
  };

  const handleTestBot = (botId) => {
    setShowChatWidget(true);
  };

  return (
    <Box className="min-h-screen">
      <Container maxWidth="xl" className="pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box className="flex justify-between items-center mb-8">
            <Typography variant="h4" className="font-bold text-gray-800">
              Your AI Agents
            </Typography>
            <Button
              variant="contained"
              startIcon={<span className="text-xl">+</span>}
              onClick={handleCreateBot}
              sx={{
                bgcolor: '#EB5A3C',
                '&:hover': { bgcolor: '#F07A63' },
                borderRadius: 2,
                px: 4
              }}
            >
              Create New Agent
            </Button>
          </Box>

          <TableContainer component={Paper} className="rounded-xl shadow-lg">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell className="font-semibold">Name</TableCell>
                  <TableCell className="font-semibold">Status</TableCell>
                  <TableCell className="font-semibold">Document</TableCell>
                  <TableCell className="font-semibold">Model</TableCell>
                  <TableCell className="font-semibold">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bots.map((bot) => (
                  <TableRow key={bot.id} hover>
                    <TableCell>{bot.name}</TableCell>
                    <TableCell>
                      <Chip 
                        label={bot.status}
                        color={bot.status === 'Active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{bot.document}</TableCell>
                    <TableCell>{bot.model}</TableCell>
                    <TableCell>
                      <Box className="flex gap-2">
                        <IconButton 
                          size="small"
                          onClick={() => handleTestBot(bot.id)}
                          className="text-primary hover:bg-primary/10"
                        >
                          <PlayArrow />
                        </IconButton>
                        <IconButton 
                          size="small"
                          onClick={() => handleEditBot(bot)}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          size="small"
                          onClick={() => handleDeleteBot(bot.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      </Container>

      {/* Chat Widget Button */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          bgcolor: '#EB5A3C',
          '&:hover': { bgcolor: '#F07A63' }
        }}
        onClick={() => setShowChatWidget(!showChatWidget)}
      >
        <Chat />
      </Fab>

      {/* Chat Widget */}
      {showChatWidget && (
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 100,
            right: 32,
            width: 350,
            height: 500,
            borderRadius: 2,
            p: 2
          }}
        >
          <Box className="flex justify-between items-center border-b pb-2">
            <Typography variant="h6">Chat with Bot</Typography>
            <IconButton size="small" onClick={() => setShowChatWidget(false)}>
              <MoreVert />
            </IconButton>
          </Box>
          {/* Add chat interface components here */}
        </Paper>
      )}
    </Box>
  );
};

export default BotList;
