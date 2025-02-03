import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const Instruction = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const paperVariants = {
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

    return (
        <Box className="min-h-[100vh] h-[auto] w-[100%] bg-gradient-to-br from-white to-gray-50">
            <Container maxWidth="lg" className="py-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Typography 
                        variant="h4" 
                        className="text-left mb-12 font-bold text-gray-900"
                        style={{marginBottom: '30px'}}
                    >
                        Getting Started Guide
                    </Typography>
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    <motion.div variants={paperVariants}>
                        <Paper elevation={3} className="p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <Typography variant="h5" className="mb-4 font-semibold text-gray-800 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm">1</span>
                                Document Upload Process
                            </Typography>
                            <Typography variant="body1" className="mb-4 text-gray-600 pl-11">
                                Streamline your document management with our intuitive upload system:
                            </Typography>
                            <Box component="ol" className="ml-11 space-y-3 text-gray-700">
                                <li className="transition-all duration-200 hover:text-blue-600">Access the "Upload" section from the main navigation dashboard</li>
                                <li className="transition-all duration-200 hover:text-blue-600">Select your documents using our drag-and-drop interface or file browser</li>
                                <li className="transition-all duration-200 hover:text-blue-600">Review and confirm your selection before initiating the upload</li>
                                <li className="transition-all duration-200 hover:text-blue-600">Track the upload progress in real-time with our status indicators</li>
                            </Box>
                        </Paper>
                    </motion.div>

                    <motion.div variants={paperVariants}>
                        <Paper elevation={3} className="p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <Typography variant="h5" className="mb-4 font-semibold text-gray-800 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm">2</span>
                                AI Agent Configuration
                            </Typography>
                            <Typography variant="body1" className="mb-4 text-gray-600 pl-11">
                                Set up your intelligent AI agents in just a few steps:
                            </Typography>
                            <Box component="ol" className="ml-11 space-y-3 text-gray-700">
                                <li className="transition-all duration-200 hover:text-green-600">Navigate to the "AI Agents" dashboard in your workspace</li>
                                <li className="transition-all duration-200 hover:text-green-600">Choose from our selection of pre-configured AI models or create custom ones</li>
                                <li className="transition-all duration-200 hover:text-green-600">Define agent parameters and optimization settings</li>
                                <li className="transition-all duration-200 hover:text-green-600">Deploy and monitor your agent's performance in real-time</li>
                            </Box>
                        </Paper>
                    </motion.div>

                    <motion.div variants={paperVariants}>
                        <Paper elevation={3} className="p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <Typography variant="h5" className="mb-4 font-semibold text-gray-800 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 text-sm">3</span>
                                Integration Setup
                            </Typography>
                            <Typography variant="body1" className="mb-4 text-gray-600 pl-11">
                                Connect your existing tools and platforms seamlessly:
                            </Typography>
                            <Box component="ol" className="ml-11 space-y-3 text-gray-700">
                                <li className="transition-all duration-200 hover:text-purple-600">Explore available integrations in the Integration Hub</li>
                                <li className="transition-all duration-200 hover:text-purple-600">Select your desired integration and authorize the connection</li>
                                <li className="transition-all duration-200 hover:text-purple-600">Configure data synchronization and automation rules</li>
                                <li className="transition-all duration-200 hover:text-purple-600">Test and verify the integration functionality</li>
                            </Box>
                        </Paper>
                    </motion.div>

                    <motion.div variants={paperVariants}>
                        <Paper elevation={3} className="p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <Typography variant="h5" className="mb-4 font-semibold text-gray-800 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-3 text-sm">4</span>
                                Advanced Settings & Customization
                            </Typography>
                            <Typography variant="body1" className="mb-4 text-gray-600 pl-11">
                                Tailor the platform to your specific needs:
                            </Typography>
                            <Box component="ol" className="ml-11 space-y-3 text-gray-700">
                                <li className="transition-all duration-200 hover:text-orange-600">Access the comprehensive Settings dashboard</li>
                                <li className="transition-all duration-200 hover:text-orange-600">Customize notification preferences and automation rules</li>
                                <li className="transition-all duration-200 hover:text-orange-600">Configure security settings and access controls</li>
                                <li className="transition-all duration-200 hover:text-orange-600">Set up custom workflows and reporting preferences</li>
                            </Box>
                        </Paper>
                    </motion.div>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Instruction;
