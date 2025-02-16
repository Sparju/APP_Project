import React, { useState } from 'react';
import ReactServices from '../../services/ReactServices';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const CreateTopics = () => {
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleInputChange = (e) => {
        setTopic(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ReactServices.createTopic(topic);
            setMessage('Topic created successfully!');
            setTopic('');
        } catch (error) {
            setMessage('Error creating topic.');
        }
    };

    return (
        <div>
                        <Button onClick={()=>navigate("/topics")}> Topics</Button>

            <h2>Create New Topic</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="topic">Topic:</label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Create Topic</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateTopics;