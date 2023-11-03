import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a request to server to reset password
            const response = await axios.post('/api/reset-password', { email });

            // Assuming the server responds with a message
            setMessage(response.data.message);
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <>

            <section style={{backgroundColor: "#282c34"}}>
                <h1>Forgot Password ?</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <button type="submit">Reset Password</button>
                </form>
                <p>{message}</p>
                <p>
                    <span className="line">
                        {/*put router link here*/}
                        <Link to="/login"> Log In</Link>
                    </span> <br />

                </p>
            </section>

        </>
    )
}

export default ForgotPassword