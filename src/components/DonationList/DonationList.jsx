import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './DonationsList.css';

const DonationList = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(-1);
    const [editName, setEditName] = useState('');
    const [editFood, setEditFood] = useState([]);
    const [editMoney, setEditMoney] = useState('');
    const [editClothes, setEditClothes] = useState([]);
    const [editDate, setEditDate] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:3001/data')
            .then((res) => setData(res.data))
            .catch((er) => console.log(er));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('here');
        const id = data[data.length - 1].id + 1;
        axios
            .post('http://localhost:3001/data', {
                id: id,
                name: name,
                email: email,
            })
            .then((res) => {
                setData([...data, res.data]);
                setName('');
                setEmail('');
            })
            .catch((err) => console.log(err));
    };

    const handleEdit = (entry) => {
        setEditName(entry.name);
        setEditFood(entry.donations.foodItems);
        setEditMoney(entry.donations.money);
        setEditClothes(entry.donations.clothes);
        setEditId(entry.id);
    };

    const handleUpdate = () => {
        console.log('http://localhost:3001/data/' + editId);

        axios
            .put('http://localhost:3001/data/' + editId, {
                id: editId,
                name: editName,
                donations: {
                    clothesItems: editClothes,
                    foodItems: editFood,
                    money: editMoney,
                },
                date: editDate,
            })
            .then((res) => {
                const updatedData = data.map((entry) =>
                    entry.id === editId ? res.data : entry
                );
                setData(updatedData);
                setEditId(-1);
            })
            .catch((err) => console.log(err));
    };

    function handleEditFoodChange(index, newValue) {
        const updatedFoodItems = [...editFood];
        updatedFoodItems[index] = newValue;
        setEditFood(updatedFoodItems);
    }

    const handleDelete = (entry) => {
        axios
            .delete('http://localhost:3001/data/' + entry.id)
            .then((res) => {
                const updatedData = data.filter((item) => item.id !== entry.id);
                setData(updatedData);
                setEditId(-1);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Food</th>
                        <th>Money</th>
                        <th>Clothes</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, index) =>
                        entry.id === editId ? (
                            <tr>
                                <td>{entry.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) =>
                                            setEditName(e.target.value)
                                        }
                                    ></input>
                                </td>
                                <td>
                                    <ul>
                                        {editFood.map((item, index) => (
                                            <li key={index}>
                                                <input
                                                    type="text"
                                                    value={item}
                                                    onChange={(e) => {
                                                        console.log(
                                                            'Input value:',
                                                            e.target.value
                                                        );
                                                        handleEditFoodChange(
                                                            index,
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={editMoney}
                                        onChange={(e) =>
                                            setEditMoney(e.target.value)
                                        }
                                    ></input>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={editClothes}
                                        onChange={(e) =>
                                            setEditClothes(e.target.value)
                                        }
                                    ></input>
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={editDate}
                                        onChange={(e) =>
                                            setEditDate(e.target.value)
                                        }
                                    ></input>
                                </td>
                                <td>
                                    <button onClick={handleUpdate}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ) : (
                            <tr key={index}>
                                <td>{entry.id}</td>
                                <td>{entry.name}</td>
                                <td>
                                    {/* {entry.donations.foodItems} */}
                                    {entry.donations.foodItems.map(
                                        (item, index) => (
                                            <li key={index}>
                                                {item}
                                                {/* <button
                                                    onClick={() =>
                                                        handleEditItem(index)
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteItem(index)
                                                    }
                                                >
                                                    Delete
                                                </button> */}
                                            </li>
                                        )
                                    )}
                                </td>
                                <td>{entry.donations.money}</td>
                                <td>{entry.donations.clothes}</td>
                                <td>{entry.date}</td>
                                <td>
                                    <button onClick={() => handleEdit(entry)}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(entry)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DonationList;
