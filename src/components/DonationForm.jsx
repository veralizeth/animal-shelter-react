import axios from 'axios';
import React, { useState } from 'react';
import './DonationForm.css';

const DonationForm = () => {
    const [money, setMoney] = useState('');
    const [foodItems, setFoodItems] = useState([]);
    const [clothesItems, setClothesItems] = useState([]);
    const [foodInput, setFoodInput] = useState('');
    const [clothesInput, setClothesInput] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState([]);

    const handleMoneyChange = (event) => {
        setMoney(event.target.value);
    };

    const handleFoodChange = (event) => {
        setFoodInput(event.target.value);
    };

    const handleClothesChange = (event) => {
        setClothesInput(event.target.value);
    };

    const addFoodItem = () => {
        if (foodInput.trim()) {
            setFoodItems([...foodItems, foodInput.trim()]);
            setFoodInput('');
        }
    };

    const addClothesItem = () => {
        if (clothesInput.trim()) {
            setClothesItems([...clothesItems, clothesInput.trim()]);
            setClothesInput('');
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const id = Math.random();
        axios
            .post('http://localhost:3001/data', {
                id: id,
                name: name,
                donations: {
                    clothesItems: clothesItems,
                    foodItems: foodItems,
                    money: money,
                },
                date: date,
            })
            .then((res) => {
                setData([...data, res.data]);
                setName('');
                setDate('');
                setFoodItems([]);
                setClothesItems([]);
                setMoney('');
            })
            .catch((err) => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                ></input>
            </div>
            <div>
                <label>
                    Amount of Money:
                    <input
                        type="number"
                        value={money}
                        onChange={handleMoneyChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Food Items:
                    <input
                        type="text"
                        value={foodInput}
                        onChange={handleFoodChange}
                    />
                    <button type="button" onClick={addFoodItem}>
                        Add Food Item
                    </button>
                </label>
                <ul>
                    {foodItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <label>
                    Clothes Items:
                    <input
                        type="text"
                        value={clothesInput}
                        onChange={handleClothesChange}
                    />
                    <button type="button" onClick={addClothesItem}>
                        Add Clothes Item
                    </button>
                </label>
                <ul>
                    {clothesItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <input
                    type="date"
                    placeholder="Select a Date"
                    onChange={(e) => setDate(e.target.value)}
                ></input>
            </div>
            <button>Add</button>
        </form>
    );
};

export default DonationForm;
