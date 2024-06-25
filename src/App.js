import './App.css';
import { Routes, Route } from 'react-router-dom';
import DonationForm from './components/Donation/DonationForm';
import DonationList from './components/DonationList/DonationList';

function App() {
    return (
        <Routes>
            <Route path="/" element={<DonationForm />}></Route>
            <Route path="/donationList" element={<DonationList />}></Route>
        </Routes>
    );
}

export default App;
