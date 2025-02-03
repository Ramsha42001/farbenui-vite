import React, { useState } from "react";
import { Box, Typography, TextField, Container } from '@mui/material';
import { TbBrandSlack, TbBrandGoogleDrive, TbBrandZoom } from "react-icons/tb";
import IntegrationCard from "../components-reuse/common/IntegrationCard";
import { motion } from "framer-motion";

const Marketplace = () => {
  const integrationsData = [
    { 
      id: 1, 
      name: 'Slack',
      icon: <TbBrandSlack className="text-primary text-5xl" /> 
    },
    { 
      id: 2, 
      name: 'Google Drive',
      icon: <TbBrandGoogleDrive className="text-primary text-5xl" /> 
    },
    { 
      id: 3, 
      name: 'Zoom',
      icon: <TbBrandZoom className="text-primary text-5xl" /> 
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const handleIntegrate = (integrationName) => {
    alert(`Initiating integration with ${integrationName}`);
  };

  const filteredIntegrations = integrationsData.filter(integration =>
    integration.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    hover: {
      scale: 1.05,
      rotate: [0, 2, -2, 0],
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <Box className="min-h-[100vh] h-[auto] w-[100%] bg-white">
      <Box className="flex">
        <Box className="flex-1 py-12">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography 
                variant="h4" 
                style={{marginBottom: '10px'}}
                className="mb-[10px] font-bold text-gray-900"
              >
                Available Integrations
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search available integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{marginBottom: '50px'}}
                className="mb-16"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '4px',
                    backgroundColor: '#f8fafc',
                    '&:hover fieldset': {
                      borderColor: '#64748b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#475569',
                    },
                  }
                }}
              />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-[14px]"
            >
              {filteredIntegrations.map(integration => (
                <Box 
                  key={integration.id}
                  className="w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)]"
                >
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    style={{ height: "300px" }}
                  >
                    <IntegrationCard
                      name={integration.name}
                      icon={integration.icon}
                      onIntegrate={() => handleIntegrate(integration.name)}
                      color="#475569"
                    />
                  </motion.div>
                </Box>
              ))}
            </motion.div>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Marketplace;
