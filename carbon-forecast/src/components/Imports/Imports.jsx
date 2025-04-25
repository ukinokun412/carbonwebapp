import React, { useState } from "react";
import Papa from "papaparse";
import "./Imports.css"; // Linking the external CSS file for styling

const Imports = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March"],
    datasets: [{ label: "Carbon Emissions", data: [100, 200, 300] }],
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage(`Selected file: ${selectedFile.name}`);
    } else {
      setFile(null);
      setMessage("No file selected.");
    }
  };

  const handleImport = () => {
    if (file) {
      setMessage(`Importing file: ${file.name}...`);
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setMessage("File imported successfully!");
          setChartData({
            labels: results.data.map((row) => row.date),
            datasets: [
              {
                label: "Carbon Emissions",
                data: results.data.map((row) => parseFloat(row.emissions)),
              },
            ],
          });
        },
      });
    } else {
      setMessage("Please select a file to import.");
    }
  };

  const handleExport = () => {
    const csvData = [
      ["Label", "Value"],
      ...chartData.labels.map((label, index) => [
        label,
        chartData.datasets[0].data[index],
      ]),
    ];

    const csvContent = csvData.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chart_data.csv";
    link.click();
    setMessage("Data exported successfully!");
  };

  return (
    <div className="import-page">
      <h1 className="import-title">Import and Export Data</h1>
      <p className="import-description">
        Upload a file to import data or export datasets for carbon emission analysis.
      </p>

      <div className="file-upload-section">
        <input type="file" accept=".csv" onChange={handleFileChange} className="file-input" />
        <button onClick={handleImport} className="import-button">Import</button>
      </div>

      <div className="export-section">
        <button onClick={handleExport} className="export-button">Export</button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Imports;
