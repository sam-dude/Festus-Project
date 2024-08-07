// src/components/BarChart.js
"use client";

import React from 'react';
import { Bar, } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { LineElement, PointElement} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

export default BarChart;

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export const CurveChart = ({ data, options }) => {
  return <Line data={data} options={options} />;
};
;

