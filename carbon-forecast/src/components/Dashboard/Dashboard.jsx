import React, { useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import "./Dashboard.css";

ChartJS.register(...registerables);

// Metrics
import m_comp from "../../data/mape_comparison.json";
import metComp from "../../data/metrics_comparison.json";
import naturalGas from "../../data/natural_gas_electric_power_sector_co2_emissions.json";
import statFirst from "../../data/stationarity_first_difference.json";
import statMov from "../../data/stationarity_moving_average_differenced.json";
import statOrig from "../../data/stationarity_original_series.json";
import statSeaDif from "../../data/stationarity_seasonal_difference.json";
import statSeaFirst from "../../data/stationarity_seasonal_first_difference.json";

function Dashboard() {
  const [modalChart, setModalChart] = useState(null);

  // Calculate dataset and total emissions progress
  const datasetEmissions = 11295.36;
  const totalEmissions = 217000.0;
  const emissionsPercentage = ((datasetEmissions / totalEmissions) * 100).toFixed(2);

  // Prepare Doughnut Pie Chart Data
  const doughnutData = {
    labels: ["Dataset Emissions", "World's Total"],
    datasets: [
      {
        label: "Emissions Progress",
        data: [datasetEmissions, totalEmissions - datasetEmissions],
        backgroundColor: ["#007bff", "#6c757d"],
        hoverOffset: 10,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      title: {
        display: true,
        text: `Emissions Progress (${emissionsPercentage}%)`,
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };

  // Prepare yearly emissions data
  const years = Array.from({ length: 2015 - 1974 + 1 }, (_, i) => (1974 + i).toString());
  const yearlyEmissions = years.map((year) => {
    const yearData = naturalGas[0].data.labels
      .map((label, index) => (label.startsWith(year) ? naturalGas[0].data.datasets[0].data[index] : 0))
      .reduce((sum, value) => sum + value, 0);
    return yearData.toFixed(2);
  });

  // Prepare heatmap data
  const heatmapData = {
    labels: years,
    datasets: [
      {
        label: "Yearly Emissions (MMT)",
        data: yearlyEmissions,
        backgroundColor: yearlyEmissions.map((value) =>
          `rgba(${Math.min(value * 10, 255)}, ${Math.max(255 - value * 5, 0)}, 50, 0.8)`
        ),
      },
    ],
  };

  const heatmapOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Yearly Emissions Breakdown (1974–2015)",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Years",
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

  const charts = [
    {
      id: 1,
      title: "Mean Absolute Percentage Error (MAPE) Comparison",
      type: Bar,
      data: m_comp[0].data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Mean Absolute Percentage Error (MAPE) Comparison",
          },
        },
      },
    },
    {
      id: 2,
      title: "Model Performance Comparison",
      type: Bar,
      data: metComp[0].data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Model Performance Comparison",
          },
        },
      },
    },
    {
      id: 3,
      title: "Natural Gas Electric Power Sector CO2 Emissions",
      type: Line,
      data: naturalGas[0].data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Natural Gas Electric Power Sector CO2 Emissions",
          },
        },
      },
    },
    {
      id: 4,
      title: "Rolling Mean & Standard Deviation (First Difference)",
      type: Line,
      data: statFirst[0].data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Rolling Mean & Standard Deviation (First Difference)",
          },
        },
      },
    },
    {
      id: 5,
      title: "Rolling Mean & Standard Deviation (Moving Average Differenced)",
      type: Line,
      data: statMov[0].data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Rolling Mean & Standard Deviation (Moving Average Differenced)",
          },
        },
      },
    },
    {
      id: 6,
      title: "Rolling Mean & Standard Deviation (Original Series)",
      type: Line,
      data: statOrig[0].data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Rolling Mean & Standard Deviation (Original Series)",
          },
        },
      },
    },
    {
      id: 7,
      title: "Rolling Mean & Standard Deviation (Seasonal Difference)",
      type: Line,
      data: statSeaDif[0].data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Rolling Mean & Standard Deviation (Seasonal Difference)",
          },
        },
      },
    },
    {
      id: 8,
      title: "Rolling Mean & Standard Deviation (Seasonal First Difference)",
      type: Line,
      data: statSeaFirst[0].data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: "Rolling Mean & Standard Deviation (Seasonal First Difference)",
          },
        },
      },
    },
  ];

  const handleChartClick = (chart) => {
    setModalChart(chart);
  };

  const closeModal = () => {
    setModalChart(null);
  };

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
    }
  };

  return (
    <div className="dashboard">
      <div className="card-section">
        <div className="card-header">
          <h2 className="card-title">Emission Cast</h2>
        </div>
        <div
          className="card clickable"
          onClick={() =>
            handleChartClick({
              id: "total",
              title: `Emissions Progress (${emissionsPercentage}%)`,
              type: Doughnut,
              data: doughnutData,
              options: doughnutOptions,
            })
          }
        >
          <div className="total-emissions-content">
            <div className="metric">
              <h3>Total Emissions</h3>
              <p>
                {datasetEmissions} MMT / {totalEmissions} MMT
              </p>
            </div>
            <div className="chart">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
          </div>
        </div>
        <div
          className="card clickable"
          onClick={() =>
            handleChartClick({
              id: "heatmap",
              title: "Yearly Emissions Breakdown (1974–2015)",
              type: Bar,
              data: heatmapData,
              options: heatmapOptions,
            })
          }
        >
          <Bar data={heatmapData} options={heatmapOptions} />
        </div>
        <div className="card-grid">
          {charts.map((chart) => (
            <div
              key={chart.id}
              className="card clickable"
              onClick={() => handleChartClick(chart)}
            >
              <chart.type data={chart.data} options={chart.options} />
            </div>
          ))}
        </div>
      </div>

      {modalChart && (
        <div className="modal" onClick={handleBackgroundClick}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{modalChart.title}</h2>
            <modalChart.type data={modalChart.data} options={modalChart.options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
