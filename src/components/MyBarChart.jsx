import React, { useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Total Students',
      data: [170, 200, 185, 240, 280],
      backgroundColor: '#3399f9',
    },
    {
      label: 'Graduators',
      data: [25, 20, 12, 25, 40],
      backgroundColor: '#ff6384',
    },
  ],
};

const options = {
  indexAxis: 'x', // Set indexAxis to 'y' for horizontal bars
  scales: {
    x: {
      beginAtZero: true,
    },
  },
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: {
      position: 'top', // Adjust legend position as needed
    },
  },
};

const MyBarChart = () => {
  return <Bar data={data} options={options} />;
};

export default MyBarChart;

