import { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, redirect } from "react-router-dom";
import AuthService from "../../services/auth.registerUser";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addUserId} from '../../store/slices/UserSlices';


const Login = () => {
    const dispatch = useDispatch();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();

    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(user, pwd)
            const res = await AuthService.login(user, pwd);
            toast.success("Successfull!", {
                autoClose: 20000,
            });
            dispatch(addUserId(res.data.id));
            navigate("/dashboard");
            
        } catch (err) {
            if (!err?.response) {
                toast.error("Error No Server Response!", {
                    autoClose: 20000,
                });


            } else if (err.response?.status === 409) {
                toast.error("Error Email Taken!", {
                    autoClose: 20000,
                });
            } else {
                toast.error("Invalid Username or Password!", {
                    autoClose: 20000,
                });
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <section style={{backgroundColor: "#282c34"}}>
                <Toaster />
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emial">Email:</label>
                    <input
                        type="email"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    <span className="line">
                        <Link to='/forgotPassword'>Forget Password</Link>

                    </span> <br />
                    <span className="line">
                        {/* link here*/}
                        <Link to='/register'>Sign Up</Link>

                    </span>
                </p>
            </section>

        </>
    )
}

export default Login