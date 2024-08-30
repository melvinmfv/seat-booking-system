import './index.css';
import './App.css';
import LogInPage from './components/LoginPage';
import SeatGridPage from './components/SeatGridPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContent';


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LogInPage />} />
          <Route path="/booking" element={<SeatGridPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App
