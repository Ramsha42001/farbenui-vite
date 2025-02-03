import React, { lazy, Suspense } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { cardData, dates, interactions, previousInteractions, recognitionRate, totalInteractions, primaryColor } from '../../data/DashboardData';

const Chart = lazy(() => import('react-apexcharts'));

const ConversationalAnalytics = () => {
  const chartOptions = {
    chart: {
      toolbar: { show: false },
      background: 'transparent',
      fontFamily: 'Inter, sans-serif',
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      }
    },
    title: {
      text: 'Conversation Analytics',
      align: 'center',
      style: {
        fontSize: '24px',
        fontWeight: '600',
        fontFamily: 'Inter, sans-serif',
        color: '#1a1a1a'
      }
    },
    stroke: {
      width: 3,
      curve: 'smooth'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: dates,
      axisBorder: { show: true, color: '#e5e7eb' },
      axisTicks: { show: true, color: '#e5e7eb' },
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          colors: '#4b5563'
        }
      }
    },
    colors: [primaryColor, '#1f2937'],
    markers: {
      size: 5,
      hover: { size: 7 }
    }
  };

  const chartSeries = [
    {
      name: 'Latest',
      data: interactions
    },
    {
      name: 'Previous',
      data: previousInteractions
    }
  ];

  return (
    <Box className="w-full p-6 bg-gray-50">
      {/* <Typography variant="h6" className="text-gray-400 mb-6 text-center font-medium">
        Track and Analyze Your Chatbot's Performance
      </Typography> */}
      
      <Box className="grid gap-6">
        <Card className="shadow-lg">
          <CardContent>
            <Suspense fallback={<CircularProgress />}>
              <Chart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={350}
              />
            </Suspense>
          </CardContent>
        </Card>

        <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="text-center">
              <Typography variant="h6" className="text-gray-600 mb-2">
                Total Conversations
              </Typography>
              <Typography variant="h4" className="text-gray-900 font-semibold">
                {totalInteractions}
              </Typography>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="text-center">
              <Typography variant="h6" className="text-gray-600 mb-2">
                Recognition Rate
              </Typography>
              <Typography variant="h4" className="text-gray-900 font-semibold">
                {recognitionRate}%
              </Typography>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="text-center">
              <Typography variant="h6" className="text-gray-600 mb-2">
                Average Response Time
              </Typography>
              <Typography variant="h4" className="text-gray-900 font-semibold">
                2.5s
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ConversationalAnalytics;