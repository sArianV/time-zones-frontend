import './App.css';
import TimeZonesState from './context/timeZones/timeZonesState';
import TimeZones from './pages/timeZones/TimeZones';


function App() {
  return (
    <div className="App">
      <TimeZonesState>
        <TimeZones />
      </TimeZonesState>
    </div>
  );
}

export default App;
