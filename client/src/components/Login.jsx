import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import style from '../assets/css/auth.module.css';
import {login} from '../app/features/auth/authThunk';
import {resetAuthState, resetMessage} from "../app/features/auth/authSlice";
import {toast} from "react-toastify";

const LoginForm = () => {

    const [formData, setFormData] = useState({email: '', password: ''});
    const {email, password} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {success, error, loading, user} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(resetAuthState());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            dispatch(resetMessage());
            user?.role === 'user' ? navigate('/api/tasks') : navigate('/api/dashboard');
            setFormData({email: '', password: ''});
        }
    }, [success, navigate, dispatch, user]);


    const handleChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value,
        })
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(resetAuthState());
        dispatch(login(formData)).then((res) => {
            toast.success(res.payload.message);
        })
    }

    return (
        <div className={style.formContainer}>
            <div className={style.formWrapper}>
                <div className={style.formHeader}>
                    <h2>Welcome Back</h2>
                </div>
                <form className={style.registerForm} onSubmit={handleSubmit}>
                    <div className={style.formGroup}>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Email Address</label>
                        <span className={style.focusBorder}></span>
                    </div>
                    <div className={style.formGroup}>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label>Password</label>
                        <span className={style.focusBorder}></span>
                    </div>

                    <p style={
                        {
                            color: 'red',
                            textAlign: 'center',
                            fontSize: '16px',
                            fontFamily: 'monospace',
                            margin: '11px 0',
                            height: '19px'
                        }
                    }>{error}</p>

                    <button type="submit">
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                    <div className={style.formFooter}>
                        <p>Don't have an account? <Link to={'/register'}>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;