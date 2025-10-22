import React, {useEffect} from 'react';
import app from "../App.module.css";
import style from '../assets/css/notifications.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getAllNotifications, readAllNotif, readOneNotification} from '../app/features/notifications/notificationThunk';
import Spinner from 'react-bootstrap/Spinner';


function Notifications() {
    const dispatch = useDispatch();
    const {notif, loading} = useSelector((state) => state.notif);

    useEffect(() => {
        dispatch(getAllNotifications());
    }, [dispatch]);

    return (
        <div className={app.container}>
            <h1 className={app.title}>Notifications</h1>

            <div className={style.notificationsContainer}>
                <div className={style.notificationsHeader}>
                    <h2 className={style.notificationsTitle}>Notifications</h2>
                    <button
                        className={style.markAllRead}
                        onClick={() => {
                            dispatch(readAllNotif()).then(() => {
                                dispatch(getAllNotifications());
                            })
                        }}
                    >
                        <i className="fas fa-check-double"></i>
                        Mark all as read

                    </button>
                </div>

                <ul className={style.notificationList}>
                    {
                        loading ?
                            (
                                <div className={style.loading}>
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </Spinner>
                                </div>
                            ) :
                            notif.length > 0 ?
                                (
                                    notif.map((notification) => (
                                        <li
                                            key={notification._id}
                                            className={`${style.notificationItem} ${notification.isRead ? style.read : style.unread}`}
                                        >
                                            <div className={`${style.notificationIcon} ${style.iconPrimary}`}>
                                                {notification.type === 'system' && <i className="fas fa-cog"></i>}
                                                {notification.type === 'message' && <i className="fas fa-envelope"></i>}
                                                {notification.type === 'comment' && <i className="fas fa-comment"></i>}
                                                {notification.type === 'report' &&
                                                    <i className="fas fa-exclamation-triangle"></i>}
                                            </div>
                                            <div className={style.notificationContent}>
                                                <p className={style.notificationMessage}>
                                                    {notification.content}
                                                </p>
                                                <div className={style.notificationTime}>
                                                    <i className="far fa-clock"></i>
                                                    {new Date(notification.createdAt).toLocaleString()}
                                                </div>
                                                <div className={style.notificationActions}>
                                                    <button className={style.notificationAction}>
                                                        <i className="fas fa-eye"></i> View Task
                                                    </button>
                                                    <button className={style.notificationAction}
                                                            onClick={() => dispatch(readOneNotification(notification._id)).then(() => {
                                                                dispatch(getAllNotifications());
                                                            })}>
                                                        <i className="fas fa-check"></i> Mark Complete
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <div className={style.emptyNotifications}>
                                        <i className="far fa-bell-slash"></i>
                                        <h3>No notifications</h3>
                                        <p>You're all caught up! Check back later for new updates.</p>
                                    </div>
                                )
                    }
                </ul>


            </div>
        </div>
    );
}

export default Notifications;