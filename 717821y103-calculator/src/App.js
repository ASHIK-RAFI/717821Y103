import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function App() {
  const [id, setId] = useState(null);
  const [numbers, setNumbers] = useState([]);
  const [average, setAverage] = useState(null);

  const handleIdChange = (event) => {
    setId(event.target.value);
    setNumbers([]);
    setAverage(null);
  };

  useEffect(() => {
    async function fetchData() {
      let url = '';
      switch (id) {
        case 'p':
          url = 'http://20.244.56.144/numbers/primes';
          break;
        case 'f':
          url = 'http://20.244.56.144/numbers.fibo';
          break;
        case 'e':
          url = 'http://20.244.56.144/numbers/even';
          break;
        case 'r':
          url = 'http://20.244.56.144/numbers/rand';
          break;
        default:
          url = '';
      }

      if (url) {
        const response = await fetch(url);
        const data = await response.json();
        const numbersData = data.numbers || data; 
        setNumbers(prevNumbers => [...new Set([...prevNumbers, ...numbersData])]);
      }
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (numbers.length > 0 && numbers.length < Infinity) {
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      setAverage(sum / numbers.length);

      fetch(`http://localhost:9876/numbers/e`)
        .then(response => response.json())
        .then(data => {
          setAverage(data.average);
        });
    }
  }, [numbers]);

  return (
    <div className='main'>
      <div className='head'>
            <h3>CALCULATOR HTTP MICROSERVICE</h3>
          </div>
    <div className="container">
      
      <div className="row">
        <div className="col-md-4">
          
          <form>
            <div className="form-group">
              <label htmlFor="id">ENTER ID:</label>
              <input type="text" className="form-control" id="id" value={id} onChange={handleIdChange} />
            </div>
          </form>
        </div>
        <div className="col-md-8">
          <div className="numbers-container">
            {numbers.map(number => (
              <div key={number} className="number-item">{number}</div>
            ))}
            {average && <div className="average-item">Average: {average}</div>}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;