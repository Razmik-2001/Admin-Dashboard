import React from 'react';
import app from "../App.module.css";
import style from '../assets/css/notFound.module.css'
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";

function NotFoundPage() {
    const {user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    return (
        <div className={`${app.container}`}>
            <div className={style.main}>
                <h1 className={style.status}>404</h1>
                <h1 className={style.errorMessage}>Page Not Found</h1>
                <h3 className={style.text}>This page does not exist</h3>
                <div className={style.btnBox}>
                    {
                        user?.role === 'admin' ?
                            <button className={style.btn} onClick={() => navigate('/api/dashboard')}>Go Dashboard
                                Page</button> :
                            <button className={style.btn} onClick={() => navigate('/api/tasks')}>Go Tasks Page</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;