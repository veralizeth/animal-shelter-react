import axios from 'axios';
import React, { useState } from 'react';
import './DonationForm.css';

const DonationForm = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const initialState = {
        money: '',
        foodItems: [],
        clothesItems: [],
        foodInput: '',
        clothesInput: '',
        name: '',
        date: '',
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, dataset } = e.target;

        if (dataset.arrayname) {
            const arrayName = dataset.arrayname;

            setFormData((prevState) => ({
                ...prevState,
                [arrayName]: [...prevState[arrayName], value],
                [name]: '',
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const addFoodItem = () => {
        if (formData.foodInput.trim()) {
            setFormData((prevState) => ({
                ...prevState,
                foodItems: [...prevState.foodItems, formData.foodInput.trim()],
                foodInput: '',
            }));
        }
    };

    const addClothesItem = () => {
        if (formData.clothesInput.trim()) {
            setFormData((prevState) => ({
                ...prevState,
                clothesItems: [
                    ...prevState.clothesItems,
                    formData.clothesInput.trim(),
                ],
                clothesInput: '',
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            !formData.money &&
            formData.foodItems.length === 0 &&
            formData.clothesItems.length === 0
        ) {
            setError(
                'Please provide at least one type of donation: money, food, or clothes.'
            );
            return;
        }

        const id =
            Math.random().toString(36).substr(2, 9) + Date.now().toString(36);

        axios
            .post('http://localhost:3001/data', {
                id: id,
                name: formData.name,
                donations: {
                    clothesItems: formData.clothesItems,
                    foodItems: formData.foodItems,
                    money: formData.money,
                },
                date: formData.date,
            })
            .then((res) => {
                setData([...data, res.data]);
                setFormData(initialState);
            })
            .catch((err) => console.log(err));
    };

    const removeClothesItem = (index) => {
        // Using (_) Just need to access the index of the array but no need to use the element itself.
        const newClothesItems = formData.clothesItems.filter(
            (_, i) => i !== index
        );
        setFormData({
            ...formData,
            clothesItems: newClothesItems,
        });
    };

    const removeFoodItem = (index) => {
        const newFoodItems = formData.foodItems.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            foodItems: newFoodItems,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div>
                <input
                    required
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                ></input>
            </div>
            <div>
                <label>
                    Amount of Money:
                    <input
                        type="number"
                        value={formData.money}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    Food Items:
                    <input
                        type="text"
                        name="foodInput"
                        value={formData.foodInput}
                        data-arrayname="foodItems"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                foodInput: e.target.value,
                            })
                        }
                    />
                    <button type="button" onClick={addFoodItem}>
                        Add Food Item
                    </button>
                </label>
                <ul>
                    {formData.foodItems.map((item, index) => (
                        <li key={index}>
                            {item}
                            <button
                                className="remove-item-btn"
                                type="button"
                                onClick={() => removeFoodItem(index)}
                            >
                                <span className="icon">X</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <label>
                    Clothes Items:
                    <input
                        type="text"
                        name="clothesInput"
                        value={formData.clothesInput}
                        data-arrayname="clothesItems"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                clothesInput: e.target.value,
                            })
                        }
                    />
                    <button type="button" onClick={addClothesItem}>
                        Add Clothes Item
                    </button>
                </label>
                <ul>
                    {formData.clothesItems.map((item, index) => (
                        <li key={index}>
                            {item}
                            <button
                                type="button"
                                className="remove-item-btn"
                                onClick={() => removeClothesItem(index)}
                            >
                                <span className="icon">X</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <input
                    type="date"
                    name="date"
                    placeholder="Select a Date"
                    onChange={handleChange}
                    required
                ></input>
            </div>
            <button>Add</button>
        </form>
    );
};

export default DonationForm;
