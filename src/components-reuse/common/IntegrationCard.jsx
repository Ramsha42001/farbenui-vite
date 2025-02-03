import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const IntegrationCard = ({ name, description, icon, onIntegrate }) => {
    return (
        <Card 
            className="h-full transition-all duration-300 hover:shadow-lg"
            sx={{
                borderRadius: '16px',
                background: 'white',
                height: '100%'
            }}
        >
            <CardContent className="flex flex-col items-center text-center h-full p-6">
                <Box 
                    className="mb-4 p-3 rounded-full bg-orange-50 transition-transform duration-300 hover:scale-110"
                >
                    {icon}
                </Box>
                
                <Typography 
                    variant="h6" 
                    className="mb-3 font-semibold text-gray-800"
                >
                    {name}
                </Typography>
                
                <Typography 
                    variant="body2" 
                    className="mb-6 text-gray-600 flex-grow"
                >
                    {description}
                </Typography>
                
                <Button
                    variant="contained"
                    onClick={onIntegrate}
                    className="w-full transition-all duration-300 hover:shadow-md"
                    sx={{
                        backgroundColor: '#EB5A3C',
                        borderRadius: '10px',
                        textTransform: 'none',
                        padding: '10px',
                        '&:hover': {
                            backgroundColor: '#f87b63'
                        }
                    }}
                >
                    Integrate
                </Button>
            </CardContent>
        </Card>
    );
};

export default IntegrationCard;
