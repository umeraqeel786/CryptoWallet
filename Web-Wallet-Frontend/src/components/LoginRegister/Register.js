import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import toast, { Toaster } from "react-hot-toast";
import { useRef, useState, useEffect } from "react";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthService from "../../services/auth.registerUser";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate()
    const userRef = useRef();
    const errRef = useRef();

    const [user, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [userFocus, setEmailFocus] = useState(false);
    const [userSuccess, setUserSuccess] = useState(true);

    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
        console.log("first");
    }, [userSuccess]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = EMAIL_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        console.log("name", name, user, pwd);

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await AuthService.register(name, user, pwd, balance).then((response) => {
                setSuccess(true);
                setEmail("");
                setName("");
                setBalance("0");
                setPwd("");
                setMatchPwd("");
                console.log(response);
                setUserSuccess(true);
            });

            toast.success("Successfully signed up. Please login.", {
                autoClose: 30000,
            });
            setTimeout(() => {
                navigate('/login');
            }, 1000);

        } catch (err) {
            if (!err?.response) {
                toast.error("Error No Server Response!", {
                    autoClose: 20000,
                });

                setErrMsg("No Server Response");
            } else if (err.response?.status === 409) {
                toast.error("Error Email Taken!", {
                    autoClose: 20000,
                });
            } else {
                toast.error("Email or Username Already Used!", {
                    autoClose: 20000,
                });
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            <section style={{ backgroundColor: "#282c34" }}>
                <Toaster />
                <p
                    ref={errRef}
                    className={errMsg ? "errmsg" : "offscreen"}
                    aria-live='assertive'
                >
                    {errMsg}
                </p>
                <h1>Register User</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        id='name'
                        ref={userRef}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <label htmlFor='email'>
                        Email:
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={validEmail ? "valid" : "hide"}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={validEmail || !user ? "hide" : "invalid"}
                        />
                    </label>
                    <input
                        type='email'
                        id='email'
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setEmail(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby='uidnote'
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p
                        id='uidnote'
                        className={
                            userFocus && user && !validEmail ? "instructions" : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Matches the "@" symbol.
                        <br />
                        Letters, numbers, underscores allowed.
                    </p>

                    <label htmlFor='password'>
                        Password:
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={validPwd ? "valid" : "hide"}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={validPwd || !pwd ? "hide" : "invalid"}
                        />
                    </label>
                    <input
                        type='password'
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby='pwdnote'
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p
                        id='pwdnote'
                        className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.
                        <br />
                        Must include letters and number
                        <br />
                    </p>

                    <label htmlFor='confirm_pwd'>
                        Confirm Password:
                        <FontAwesomeIcon
                            icon={faCheck}
                            className={validMatch && matchPwd ? "valid" : "hide"}
                        />
                        <FontAwesomeIcon
                            icon={faTimes}
                            className={validMatch || !matchPwd ? "hide" : "invalid"}
                        />
                    </label>
                    <input
                        type='password'
                        id='confirm_pwd'
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby='confirmnote'
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p
                        id='confirmnote'
                        className={matchFocus && !validMatch ? "instructions" : "offscreen"}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>

                    <button
                        disabled={!validEmail || !validPwd || !validMatch ? true : false}
                    >
                        Sign Up
                    </button>
                </form>
                <p>
                    Already registered?
                    <br />
                    <Link to="/login"> Sign In</Link>

                </p>
            </section>
        </>
    );
};

export default Register;
