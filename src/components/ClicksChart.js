import React, { useState, useEffect, useCallback } from 'react';
import { fetchLinkRedirects } from '../services/authService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ClicksChart = ({ short }) => {
  const [clicksData, setClicksData] = useState([]);
  const [error, setError] = useState(null);
  const [interval, setInterval] = useState('day');

  const groupByInterval = (data, interval) => {
    const formatDate = (date) => {
      const d = new Date(date);
      if (interval === 'day') {
        return d.toISOString().split('T')[0];
      } else if (interval === 'hour') {
        return `${d.toISOString().split('T')[0]} ${String(d.getHours()).padStart(2, '0')}:00`;
      } else if (interval === 'minute') {
        return `${d.toISOString().split('T')[0]} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      }
      return date;
    };

    const groupedData = data.reduce((acc, timestamp) => {
      const formattedDate = formatDate(timestamp);
      acc[formattedDate] = (acc[formattedDate] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(groupedData).map(([timestamp, count]) => ({
      timestamp,
      count,
    }));
  };

  const handleChangeInterval = (newInterval) => {
    setInterval(newInterval);
  };

  const loadClicksData = useCallback(async () => {
    try {
      const data = await fetchLinkRedirects(short);
      if (Array.isArray(data)) {
        const transformedData = groupByInterval(data, interval);
        setClicksData(transformedData);
      } else {
        setError('Дані про кліки мають бути у вигляді масиву');
      }
    } catch (err) {
      setError('Помилка при завантаженні кліків');
      console.error('Помилка при завантаженні кліків:', err);
    }
  }, [short, interval]);

  useEffect(() => {
    loadClicksData();
  }, [loadClicksData]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {clicksData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={clicksData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(tick) => {
                const date = new Date(tick);
                if (interval === 'day') {
                  return date.toISOString().split('T')[0];
                } else if (interval === 'hour') {
                  return `${String(date.getHours()).padStart(2, '0')}:00`;
                } else if (interval === 'minute') {
                  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                }
                return tick;
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div>Немає даних для побудови графіка</div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          onClick={() => handleChangeInterval('day')}
          style={buttonStyle}
        >
          За днями
        </button>
        <button
          onClick={() => handleChangeInterval('hour')}
          style={buttonStyle}
        >
          За годинами
        </button>
        <button
          onClick={() => handleChangeInterval('minute')}
          style={buttonStyle}
        >
          За хвилинами
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '0 10px',
  fontSize: '16px',
  cursor: 'pointer',
  border: '1px solid #ddd',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  transition: 'background-color 0.3s',
};

export default ClicksChart;
