import React, { useState } from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import './App.css'; // Import the CSS file

const App = () => {
  const [area, setArea] = useState('');
  const [footTraffic, setFootTraffic] = useState('');
  const [energyGoal, setEnergyGoal] = useState('');
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const simulatedData = calculateResults(area, footTraffic, energyGoal);
    setResult(simulatedData);
    generateChartData(simulatedData);
  };

  const calculateResults = (area, footTraffic, energyGoal) => {
    const numberOfTiles = Math.ceil(area / 1.5);
    const energyOutput = numberOfTiles * footTraffic * 0.5;
    const cost = numberOfTiles * 100;
    const roi = (energyGoal / energyOutput).toFixed(2);

    return { numberOfTiles, energyOutput, cost, roi };
  };

  const generateChartData = (data) => {
    const chartData = [
      { name: 'Initial', cost: 0, energy: 0 },
      { name: 'Year 1', cost: data.cost, energy: data.energyOutput },
      { name: 'Year 5', cost: data.cost, energy: data.energyOutput * 5 },
      { name: 'Year 10', cost: data.cost, energy: data.energyOutput * 10 },
    ];
    setChartData(chartData);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">PZT Tile Calculator</h1>
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="form-group">
          <label>Area (sq m):</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Foot Traffic (people/hour):</label>
          <input
            type="number"
            value={footTraffic}
            onChange={(e) => setFootTraffic(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Energy Goal (kWh/year):</label>
          <input
            type="number"
            value={energyGoal}
            onChange={(e) => setEnergyGoal(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Calculate</button>
      </form>
      {result && (
        <div className="results">
          <h2 className="results-title">Results:</h2>
          <p><strong>Number of Tiles:</strong> {result.numberOfTiles}</p>
          <p><strong>Energy Output:</strong> {result.energyOutput} kWh/year</p>
          <p><strong>Cost:</strong> ${result.cost}</p>
          <p><strong>ROI:</strong> {result.roi} years</p>
        </div>
      )}
      {chartData.length > 0 && (
        <div className="chart-container">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="cost" stroke="#8884d8" name="Cost ($)" />
              <Line yAxisId="right" type="monotone" dataKey="energy" stroke="#82ca9d" name="Energy (kWh)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default App;
