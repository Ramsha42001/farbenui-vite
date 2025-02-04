import React, { useState ,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Select, MenuItem, Button, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch,useSelector } from 'react-redux';
import { insertBot } from '../redux/features/bot/botSlice';
import { listDocuments } from '../redux/features/document/documentSlice';

const BotSetting = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bot = location.state?.bot;
  const dispatch = useDispatch();


  const userEmail = localStorage.getItem('email') 
useEffect(()=>{
 
  console.log(userEmail)
    dispatch(listDocuments(userEmail));
    },[dispatch,userEmail]);

    const documents = useSelector(state=>state.document.documents);


  const [botName, setBotName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.5);
  const [model, setModel] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!botName || !prompt || !selectedDocument || !model) {
      setError("Please fill in all required fields.");
      return;
    }
    const botSettings = {
      email: userEmail,
      bot_name: botName,
      prompt,
      file_name: selectedDocument.filename,
      temperature: parseFloat(temperature),
      model,
    };
    setLoading(true);
    try {
      dispatch(insertBot(botSettings));
      console.log("Bot settings:", botSettings);
      navigate('/user/bots');
    } catch (err) {
      setError('Failed to create bot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen">
      <Container maxWidth="xl" className="pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" className="mb-8 font-bold text-gray-800 text-left" style={{ marginBottom: "20px" }}>
            Create Your AI Assistant
          </Typography>

          <form onSubmit={handleSubmit}>
            <Container maxWidth="xl" sx={{ display: 'flex', gap: 6 }}>
              {/* Left Column */}
              <Box sx={{ flex: '0 0 41.666%' }}>
                <Paper elevation={3} className="p-8 rounded-2xl bg-white shadow-lg">
                  <Typography variant="h5" className="mb-6 font-bold text-gray-800 border-b pb-3">
                    Bot Details
                  </Typography>

                  <div className="space-y-6">
                    <div>
                      <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-700">
                        Bot Name
                      </Typography>
                      <TextField
                        fullWidth
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                        required
                        variant="outlined"
                        placeholder="Enter a name for your bot"
                      />
                    </div>

                    <div>
                      <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-700">
                        Training Document
                      </Typography>
                      <Select
                        fullWidth
                        value={selectedDocument ? selectedDocument.filename : ''}
                        onChange={(e) => {
                          const doc = documents.find(d => d.filename === e.target.value);
                          setSelectedDocument(doc);
                        }}
                        required
                      >
                        <MenuItem value="">Select a document</MenuItem>
                        {documents.map((doc) => (
                          <MenuItem key={doc.filename} value={doc.filename}>
                            {doc.filename}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-700">
                        Model Selection
                      </Typography>
                      <Select
                        fullWidth
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                      >
                        <MenuItem value="">Select a model</MenuItem>
                        <MenuItem value="gemini-1.5-flash">Gemini 1.5 Flash</MenuItem>
                        <MenuItem value="gemini-1.5-pro">Gemini 1.5 Pro</MenuItem>
                      </Select>
                    </div>

                    <div>
                      <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-700">
                        Temperature
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        inputProps={{ min: 0, max: 1, step: 0.1 }}
                        required
                        helperText="Controls randomness (0 = deterministic, 1 = creative)"
                      />
                    </div>
                  </div>
                </Paper>
              </Box>

              {/* Right Column */}
              <Box sx={{ flex: '0 0 58.333%' }}>
                <Paper elevation={3} className="p-8 rounded-2xl bg-white shadow-lg">
                  <Typography variant="h5" className="mb-6 font-bold text-gray-800 border-b pb-3">
                    Bot Personality & Behavior
                  </Typography>

                  <div className="space-y-6">
                    <div>
                      <Typography variant="subtitle1" className="mb-2 font-semibold text-gray-700">
                        System Prompt
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={12}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                        variant="outlined"
                        placeholder="Describe how your AI assistant should behave, its personality, and its primary functions..."
                      />
                    </div>

                    {error && (
                      <Typography color="error" className="text-center">
                        {error}
                      </Typography>
                    )}

                    <div className="flex justify-end pt-4">
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        sx={{
                          bgcolor: '#EB5A3C',
                          color: 'white',
                          px: 8,
                          py: 2,
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: '#F07A63',
                          },
                        }}
                        className="shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        {loading ? 'Creating...' : 'Create Agent'}
                      </Button>
                    </div>
                  </div>
                </Paper>
              </Box>
            </Container>
          </form>
        </motion.div>
      </Container>
    </Box>
  );
};

export default BotSetting;