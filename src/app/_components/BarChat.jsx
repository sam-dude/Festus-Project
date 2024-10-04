"use client";

import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  Title, 
  Tooltip, 
  Legend
);

// Custom plugin to adjust bar height
const customBarHeightPlugin = {
  id: 'customBarHeight',
  beforeDatasetDraw: (chart) => {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    const datasets = chart.data.datasets;
    const yScale = chart.scales.y;

    datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];
        const scaledValue = yScale.getPixelForValue(value);
        const barHeight = chartArea.bottom - scaledValue;
        bar.height = barHeight;
      });
    });
  },
};

const BarChart = ({ data, options }) => {
  return <Bar data={data} options={options} plugins={[customBarHeightPlugin]} />;
};

export const CurveChart = ({ data, options }) => {
  const defaultOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0.4, // This makes the line curved
      },
      point: {
        radius: 0, // This hides the points
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return <Line data={data} options={mergedOptions} />;
};

export default BarChart;