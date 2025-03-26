import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

function TotalVisitorChart() {
  const [view, setView] = useState("week");
  const [data, setData] = useState({ labels: [], values: [] });

  // Fetch data from backend based on view
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/api/visitor/${view}`);
      const { labels, values } = response.data;

      setData({ labels, values });
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [view]);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: `Total Visitors (${view})`,
        data: data.values,
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Adjust step size if needed
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 w-full">
      <h3 className="text-gray-700 text-lg font-semibold">Total Visitors</h3>
      <div className="flex justify-between items-center mt-4 mb-2">
        <select
          className="border border-gray-300 rounded px-3 py-1 text-gray-700"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default TotalVisitorChart;
