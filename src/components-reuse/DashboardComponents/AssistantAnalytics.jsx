import React, { lazy, Suspense } from 'react';
import { cardData, dates, usersLatest, usersPrevious, sessionsLatest, sessionsPrevious, topIntents, intentCounts, tokensPerDay, averageTokens, interactions, previousInteractions, primaryColor } from '../../data/DashboardData';
import { Box, Card, CardContent, Typography, CircularProgress } from '@mui/material';

const Chart = lazy(() => import('react-apexcharts'));

const AssistantAnalytics = () => {
  const filteredCardData = cardData.filter(
    (card) =>
      ![
        'Total Interactions',
        'Unique users', 
        'Unique sessions',
        'Recognition Rate',
        'Fallback Rate',
      ].includes(card.title)
  );

  const renderChart = (title) => {
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
        show: true,
        borderColor: '#f3f4f6',
        strokeDashArray: 4
      },
      tooltip: {
        theme: 'light',
        style: {
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif'
        },
        x: {
          show: true
        }
      }
    };

    const chartTypes = {
      'Users': {
        type: 'line',
        data: {
          categories: dates,
          series: [
            { name: 'Latest', data: usersLatest },
            { name: 'Previous', data: usersPrevious }
          ]
        },
        options: {
          colors: ['#EB5A3C', '#1f2937'],
          stroke: { width: 3, curve: 'smooth' },
          markers: {
            size: 5,
            hover: { size: 7 }
          }
        }
      },
      'Sessions': {
        type: 'line',
        data: {
          categories: dates,
          series: [
            { name: 'Latest', data: sessionsLatest },
            { name: 'Previous', data: sessionsPrevious }
          ]
        },
        options: {
          colors: ['#EB5A3C', '#1f2937'],
          stroke: { width: 3, curve: 'smooth' },
          markers: {
            size: 5,
            hover: { size: 7 }
          }
        }
      },
      'Top Intents': {
        type: 'bar',
        data: {
          categories: topIntents,
          series: [{ name: 'Intent Count', data: intentCounts }]
        },
        options: {
          colors: [primaryColor],
          plotOptions: { 
            bar: { 
              horizontal: true,
              borderRadius: 6,
              dataLabels: {
                position: 'top'
              }
            } 
          }
        }
      },
      'Tokens Plot': {
        type: 'area',
        data: {
          categories: dates,
          series: [{ name: 'Tokens', data: tokensPerDay }]
        },
        options: {
          colors: [primaryColor],
          stroke: { width: 3, curve: 'smooth' },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
              stops: [0, 90, 100]
            }
          },
          dataLabels: { enabled: false },
          markers: {
            size: 4,
            hover: { size: 6 }
          }
        }
      },
      'Interactions Line': {
        type: 'line',
        data: {
          categories: dates.slice(0, interactions.length),
          series: [
            { name: 'Latest', data: interactions },
            { name: 'Previous', data: previousInteractions }
          ]
        },
        options: {
          colors: ['#EB5A3C', '#1f2937'],
          stroke: { width: 3, curve: 'smooth' },
          markers: {
            size: 5,
            hover: { size: 7 }
          }
        }
      }
    };

    const chartConfig = chartTypes[title];
    if (!chartConfig) return null;

    const options = {
      ...layoutSettings,
      ...chartConfig.options,
      chart: {
        ...layoutSettings.chart,
        id: `${title.toLowerCase()}-chart`,
        type: chartConfig.type
      },
      xaxis: {
        ...layoutSettings.xaxis,
        categories: chartConfig.data.categories
      }
    };

    return (
      <Suspense fallback={
        <Box className="flex justify-center items-center h-[350px]">
          <CircularProgress className="text-primary" />
        </Box>
      }>
        <Chart 
          options={options} 
          series={chartConfig.data.series} 
          type={chartConfig.type} 
          height={350}
        />
      </Suspense>
    );
  };

  return (
    <Box className="p-8">
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCardData.map((card) => (
          <Card 
            key={card.id} 
            className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100"
          >
            <CardContent className="p-6">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4">
                {renderChart(card.title)}
              </div>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AssistantAnalytics;