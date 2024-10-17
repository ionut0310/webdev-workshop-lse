import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState(''); // stare pentru culoarea de fundal
  const [catImage, setCatImage] = useState(''); // stare pentru imaginea pisicii
  const [location, setLocation] = useState(''); // stare pentru locația utilizatorului

  const colors = ['red', 'green', 'blue', 'yellow', 'purple']; // array de culori
  const [colorIndex, setColorIndex] = useState(0); // indexul culorii curente

  const changeBackgroundColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // crește indexul și revine la 0 dacă depășește lungimea array-ului
    setBgColor(colors[colorIndex]); // setează culoarea de fundal
  };

  // useEffect pentru a apela API-ul de locație
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('http://ip-api.com/json/');
        const data = await response.json();
        setLocation(`${data.city}, ${data.country}`); // setează locația în format "oraș, țară"
      } catch (error) {
        console.error('Eroare la obținerea locației:', error);
        setLocation('Nu s-a putut obține locația');
      }
    };

    fetchLocation();
  }, []); // rulează o singură dată

  // useEffect pentru a apela API-ul de pisici
  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search');
        const data = await response.json();
        setCatImage(data[0].url); // setează URL-ul imaginii pisicii
      } catch (error) {
        console.error('Eroare la obținerea imaginii pisicii:', error);
      }
    };

    fetchCat();
  }, []); // dependențe goale pentru a rula o singură dată

  return (
    <div style={{ backgroundColor: bgColor, transition: 'background-color 0.5s' }}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Alex</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <button onClick={changeBackgroundColor}>
          Schimbă culoarea de fundal
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {catImage && <img src={catImage} alt="Pisică" style={{ width: '300px', height: 'auto' }} />}
      </div>
      <p className="read-the-docs">
        Locația ta este: {location}
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
