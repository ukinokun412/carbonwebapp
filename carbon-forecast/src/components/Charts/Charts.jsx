import React, { useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import "./Charts.css";

ChartJS.register(...registerables);

// Import JSON dataset
import naturalGas from "../../data/natural_gas_electric_power_sector_co2_emissions.json";

function Charts() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState('');

  // Prepare Line Chart Data
  const lineChartData = {
    labels: naturalGas[0].data.labels,
    datasets: [
      {
        label: "CO2 Emissions (MMT)",
        data: naturalGas[0].data.datasets[0].data,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Line Chart - CO2 Emissions Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates",
        },
      },
      y: {
        title: {
          display: true,
          text: "Emissions (MMT)",
        },
      },
    },
  };


  const barChartData = {
    labels: naturalGas[0].data.labels.slice(0, 12),
    datasets: [
      {
        label: "Monthly CO2 Emissions",
        data: naturalGas[0].data.datasets[0].data.slice(0, 12),
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6c757d"],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Bar Chart - Monthly CO2 Emissions",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        title: {
          display: true,
          text: "Emissions (MMT)",
        },
      },
    },
  };


  const pieChartData = {
    labels: naturalGas[0].data.labels.slice(0, 6),
    datasets: [
      {
        label: "CO2 Emissions Distribution",
        data: naturalGas[0].data.datasets[0].data.slice(0, 6),
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6c757d", "#17a2b8"],
        hoverOffset: 30,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "CO2 Emissions Distribution (Pie Chart)",
      },
      legend: {
        display: true,
        position: "right",
      },
    },
  };

  const openModal = (type) => {
    setChartType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="dashboard">
      <div className="card-section">
        <div className="card-header">Charts</div>
        <div className="card-grid">
          <div className="card" onClick={() => openModal('bar')}>
            <Bar data={barChartData} options={barOptions} />
          </div>
          <div className="card" onClick={() => openModal('pie')}>
            <Pie data={pieChartData} options={pieOptions} />
          </div>
          <div className="card" onClick={() => openModal('line')}>
            <Line data={lineChartData} options={lineOptions} />
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card">
              {chartType === "bar" && <Bar data={barChartData} options={barOptions} />}
              {chartType === "pie" && <Pie data={pieChartData} options={pieOptions} />}
              {chartType === "line" && <Line data={lineChartData} options={lineOptions} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Charts;
