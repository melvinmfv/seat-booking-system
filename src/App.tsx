import './index.css';
import './App.css';
import LogInPage from './components/LoginPage';
import SeatGridPage from './components/SeatGridPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkin from './components/Checkin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/checkin/:code' element={<Checkin />} />
        <Route path='/' element={<LogInPage />} />
        <Route path='/booking' element={<SeatGridPage />} />
      </Routes>
    </Router>
  );
}

export default App;
