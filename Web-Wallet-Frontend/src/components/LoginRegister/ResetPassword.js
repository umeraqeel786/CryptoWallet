import { useState } from 'react';
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // add code to send request to server to reset password

        setMessage('Password reset successful');
    };

    return (
        <>

            <section style={{backgroundColor: "#282c34"}}>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emial">New Password:</label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />

                    <label htmlFor="emial">Confirm Password:</label>
                    <input
                        type="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />

                    <button type="submit">Submit</button>
                </form>
                <p>{message}</p>
            </section>

        </>
    )
}

export default ResetPassword