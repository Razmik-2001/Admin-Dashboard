import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import style from "../assets/css/header.module.css";
import {FaTasks} from "react-icons/fa";
import {RxDashboard} from "react-icons/rx";
import {MdLogout, MdNotificationsNone} from "react-icons/md";
import {CgProfile} from "react-icons/cg";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../app/features/auth/authThunk";
import {resetAuthState} from "../app/features/auth/authSlice";
import {resetDashboard} from "../app/features/dashboard/dashboardSlice";
import {getAllNotifications} from "../app/features/notifications/notificationThunk";

function Header() {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const {user, loading} = useSelector((state) => state.auth);
    const {notif} = useSelector((state) => state.notif);

    const isRead = notif.filter((notif) => notif.isRead === false).length > 0;

    const linksUser = [
        {to: "/api/tasks", icon: <FaTasks className={style.icon}/>, label: "Tasks"},
        {to: "/api/notifications", icon: <MdNotificationsNone className={`${style.icon}`}/>, label: "Notifications"},
        {to: "/api/profile", icon: <CgProfile className={style.icon}/>, label: "Profile"},
    ];

    const linksAdmin = [
        {to: "/api/dashboard", icon: <RxDashboard className={style.icon}/>, label: "Dashboard"},
        {to: "/api/notifications", icon: <MdNotificationsNone className={style.icon}/>, label: "Notifications"},
        {to: "/api/profile", icon: <CgProfile className={style.icon}/>, label: "Profile"},
    ];

    useEffect(() => {
        if (!token) {
            navigate("/login")
            return;
        }
        dispatch(getUserInfo());
        dispatch(getAllNotifications());
    }, [dispatch, navigate, token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch(resetAuthState());
        dispatch(resetDashboard());
        navigate("/login");
    };

    const links = user?.role === "user" ? linksUser : linksAdmin;

    return (
        <aside className={style.sidebar}>
            <div className={style.logo}>
                <h2>
                    <Link to={"/"} className={style.text}>
                        Task<br/> Manager
                    </Link>
                </h2>
            </div>

            {user && Object.keys(user).length > 0 && !loading && (
                <>
                    <ul className={style.navMenu}>
                        {links.map((link, index) => (
                            <li
                                key={index}
                                className={`${style.navItem} ${link.to === "/api/notifications" ? style.notif : ""}`}

                            >
                                {link.to === "/api/notifications" && isRead && (
                                    <span className={style.dot}></span>
                                )}
                                <Link
                                    to={link.to}
                                    className={`${style.navLink} ${currentPath === link.to ? `${style.navLinkActive} active` : ""}`}
                                >
                                    {link.icon}
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        ))}


                        <li className={style.navItem}>
                            <p
                                className={style.navLink}
                                onClick={handleLogout}
                                style={{cursor: "pointer"}}
                            >
                                <MdLogout className={style.icon}/>
                                <span>Logout</span>
                            </p>
                        </li>
                    </ul>

                    <div className={style.profileInfo}>
                        <div className={style.imageBox}>
                            <img src={user.avatar} alt="User_image"/>
                        </div>
                        <div>
                            <p>{user.name}</p>
                            <p>{user.surname}</p>
                        </div>
                    </div>
                </>
            )}
        </aside>
    );
}

export default Header;
