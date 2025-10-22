import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import style from '../assets/css/auth.module.css';
import {register} from '../app/features/auth/authThunk'
import {resetAuthState} from "../app/features/auth/authSlice";

const RegisterForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        tel: '+374',
        role: 'user'
    });

    const {name, surname, email, password, tel, confirmPassword, role} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error, success, loading, message} = useSelector(state => state.auth);

    useEffect(() => {
        if (success) {
            setFormData({
                name: '',
                surname: '',
                email: '',
                password: '',
                confirmPassword: '',
                tel: '+374',
                role: 'user'
            });
            navigate('/login');
            dispatch(resetAuthState());
        }

        if (message) {
            toast.success(message);
        }

        if (error) {
            toast.error(error);
        }
    }, [success, navigate, dispatch, message, error]);

    const handleChange = (ev) => {
        setFormData({
            ...formData,
            [ev.target.name]: ev.target.value
        });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        dispatch(register(formData));
    }

    return (
        <div className={style.formContainer}>
            <div className={style.formWrapper}>
                <div className={style.formHeader}>
                    <h2>Create Account</h2>
                </div>
                <form className={style.registerForm} onSubmit={handleSubmit}>
                    <div className={style.formGroup}>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label htmlFor="name">Name</label>
                        <span className={style.focusBorder}></span>
                    </div>

                    <div className={style.formGroup}>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={surname}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label htmlFor="surname">Surname</label>
                        <span className={style.focusBorder}></span>
                    </div>

                    <div className={style.formGroup}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label htmlFor="email">Email Address</label>
                        <span className={style.focusBorder}></span>
                    </div>

                    <div className={style.formGroup}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label htmlFor="password">Password</label>
                        <span className={style.focusBorder}></span>
                    </div>

                    <div className={style.formGroup}>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <span className={style.focusBorder}></span>
                    </div>
                    <div className={style.formGroup}>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="tel"
                            value={tel}
                            onChange={handleChange}
                            placeholder=" "
                        />
                        <label htmlFor="phoneNumber">Phone number</label>
                        <span className={style.focusBorder}></span>
                    </div>

                    <div className={style.roleSelection}>
                        <div className={style.roleOption}>
                            <input
                                type="radio"
                                id="user-role"
                                name="role"
                                value="user"
                                checked={role === "user"}
                                onChange={handleChange}
                            />
                            <label htmlFor="user-role" className="user">User</label>
                        </div>
                        <div className={style.roleOption}>
                            <input
                                type="radio"
                                id="admin-role"
                                name="role"
                                value="admin"
                                checked={role === "admin"}
                                onChange={handleChange}
                            />
                            <label htmlFor="admin-role" className="admin">Admin</label>
                        </div>
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
                        {loading ? 'Loading...' : ' Register Now'}
                    </button>

                    <div className={style.formFooter}>
                        <p>Already have an account? <Link to="/">Sign In</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
