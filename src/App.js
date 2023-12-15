import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Chart from 'chart.js/auto';
import './App.css'; // Asegúrate de importar tu archivo CSS

function App() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const csvFilePath = process.env.PUBLIC_URL + '/ingresos.csv';

    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      complete: (result) => {
        setCsvData(result.data);
        createChart(result.data);
      },
      error: (error) => {
        console.error('Error al leer el archivo CSV:', error);
      },
    });
  }, []);

  const createChart = (data) => {
    const dates = data.map((row) => row.Fecha);
    const amounts = data.map((row) => row.Monto);

    const ctx = document.getElementById('myChart').getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
        datasets: [{
          label: 'Ingresos',
          data: amounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="container">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1>Development</h1>
            <div className="user-profile">
              <img src="https://picsum.photos/40" alt="Imagen de Usuario" />
              <span>Nombre de Usuario</span>
            </div>
            <div className="login-button">
              <button type="button">Iniciar Sesión</button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <h1>Contenido del CSV</h1>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Concepto</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, index) => (
              <tr key={index}>
                <td>{row.Fecha}</td>
                <td>{row.Concepto}</td>
                <td>{row.Monto}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Agregar un lienzo para la gráfica */}
        <canvas id="myChart" width="400" height="200"></canvas>
      </main>

      <footer className="footer">
        <div className="container">
          <nav className="footer-nav">
            {/* Agrega aquí los enlaces de tu pie de página si es necesario */}
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
