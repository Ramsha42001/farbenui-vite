import React, { lazy, Suspense } from 'react';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import {
  userData,
  userAcquisitionData,
  userActivityDates,
  userActivityData,
  primaryColor,
  secondaryColor,
} from '../../data/DashboardData';

const Chart = lazy(() => import('react-apexcharts'));

const UserAnalytics = () => {
  const renderUserChart = (title) => {
    const layoutSettings = {
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
        text: title,
        align: 'center',
        style: {
          fontSize: '24px',
          fontWeight: '600',
          fontFamily: 'Inter, sans-serif',
          color: '#1a1a1a'
        }
      },
      xaxis: {
        show: true,
        showAlways: true,
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
      yaxis: {
        show: true,
        showAlways: true,
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
      grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 5,
      },
    };

    if (title === 'User Growth') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'user-growth-chart',
          type: 'line',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: userData.dates,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          min: 0,
          max: Math.max(...userData.activeUsers) + 10,
        },
        colors: [primaryColor],
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
        markers: {
          size: 5,
          hover: { size: 7 }
        }
      };

      const series = [
        {
          name: 'Active Users',
          data: userData.activeUsers,
        },
      ];

      return (
        <Suspense fallback={<Box className="flex justify-center items-center h-[350px]"><CircularProgress /></Box>}>
          <Chart options={options} series={series} type="line" height={350} />
        </Suspense>
      );
    } else if (title === 'User Acquisition') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'user-acquisition-chart',
          type: 'bar',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: userAcquisitionData.sources,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          min: 0,
          max: Math.max(...userAcquisitionData.users) + 5,
        },
        colors: [primaryColor, secondaryColor, '#10B981', '#8B5CF6'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 8,
            dataLabels: {
              position: 'top'
            }
          },
        },
      };

      const series = [
        {
          name: 'Users',
          data: userAcquisitionData.users,
        },
      ];

      return (
        <Suspense fallback={<Box className="flex justify-center items-center h-[350px]"><CircularProgress /></Box>}>
          <Chart options={options} series={series} type="bar" height={350} />
        </Suspense>
      );
    } else if (title === 'User Activity') {
      const options = {
        ...layoutSettings,
        chart: {
          ...layoutSettings.chart,
          id: 'user-activity-chart',
          type: 'heatmap',
        },
        xaxis: {
          ...layoutSettings.xaxis,
          categories: userActivityDates,
        },
        yaxis: {
          ...layoutSettings.yaxis,
          labels: {
            formatter: (value) => Math.round(value),
          },
        },
        colors: [primaryColor],
        dataLabels: {
          enabled: false,
        },
        theme: {
          mode: 'light',
          palette: 'palette1',
        }
      };

      const series = userActivityData.map((dayData, index) => ({
        name: `Day ${index + 1}`,
        data: dayData.map((value) => ({
          x: userActivityDates[index],
          y: value,
        })),
      }));

      return (
        <Suspense fallback={<Box className="flex justify-center items-center h-[350px]"><CircularProgress /></Box>}>
          <Chart options={options} series={series} type="heatmap" height={350} />
        </Suspense>
      );
    }

    return null;
  };

  const userCardData = [
    { id: 1, title: 'User Growth' },
    { id: 2, title: 'User Acquisition' },
    { id: 3, title: 'User Activity' },
  ];

  return (
    <Box className="w-full p-6 bg-gray-50">
      {/* <Typography variant="h6" className="text-gray-400 mb-6 text-center font-medium">
        Track and Analyze Your User Metrics
      </Typography> */}
      
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden lg:col-span-2">
          <CardContent className="p-4">
            {renderUserChart('User Growth')}
          </CardContent>
        </Card>
        {userCardData.slice(1).map((card) => (
          <Card key={card.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
            <CardContent className="p-4">
              {renderUserChart(card.title)}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default UserAnalytics;