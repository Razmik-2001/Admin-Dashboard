import React from 'react';
import Header from "./Header";
import {Outlet} from "react-router-dom";
import style from '../assets/css/header.module.css'

function Layout() {
    return (
        <>
            <Header/>
            <div className={style.mainContainer}>
                <Outlet/>
            </div>
        </>
    );
}

export default Layout;

