import './App.css';
import { Routes, Route } from 'react-router-dom';
import DonationForm from './components/Donation/DonationForm';

function App() {
    return (
        <Routes>
            <Route path="/" element={<DonationForm />}></Route>
        </Routes>
    );
}

export default App;
