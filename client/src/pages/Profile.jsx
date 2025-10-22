import React, {useEffect, useState} from 'react';
import app from "../App.module.css";
import style from '../assets/css/profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {changePassword, changeUserInfo, uploadProfileImage} from "../app/features/profile/profileThunk";
import {resetError, resetMessage} from "../app/features/profile/profileSlice";
import {toast} from "react-toastify";
import {getUserInfo} from "../app/features/auth/authThunk";

function Profile() {
    const [profileData, setProfileData] = useState({
        name: '',
        surname: '',
        email: '',
        tel: '',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        password: '',
        confirmPassword: '',
    });

    const {name, surname, email, tel} = profileData;
    const {currentPassword, password, confirmPassword} = passwordData;

    const {user} = useSelector((state) => state.auth);
    const {error} = useSelector((state) => state.profile);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                surname: user.surname || '',
                email: user.email || '',
                tel: user.tel || '',
            });
        }

        if (error) {
            toast.error(error);
            dispatch(resetError());
        }
    }, [user, error, dispatch]);


    const handleChangeProfile = (e) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangePassword = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (ev) => {
        const file = ev.target.files[0];

        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);
        dispatch(uploadProfileImage(formData)).then((res) => {
            toast.success(res.payload.message);
            setTimeout(() => {
                resetMessage();
            }, 100);
            dispatch(getUserInfo());
        })
    }

    return (
        <div className={app.container}>
            <h1 className={app.title}>Profile</h1>

            <div className={style.profileContainer}>
                <div className={style.profileHeader}>
                    <div className={style.profileAvatar}>
                        <img src={user?.avatar} alt="User Avatar"/>
                        <div className={style.avatarEdit}>
                            <i className="fas fa-camera"></i>
                            <input
                                type="file"
                                name='avatar'
                                className={style.avatarInput}
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className={style.profileInfo}>
                        <h2>{`${user?.name} ${user?.surname}`}</h2>
                        <p>{user?.email}</p>
                        {user?.role === 'user' ? <span className={style.profileStatus}>{user?.status}</span> : ''}
                    </div>
                </div>

                <div className={style.profileContent}>
                    <div className={style.profileSection}>
                        <h3 className={style.sectionTitle}>
                            <i className="fas fa-user-circle"></i> Personal Information
                        </h3>

                        <div className={style.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={style.formControl}
                                value={name}
                                onChange={handleChangeProfile}
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label htmlFor="surname">Surname</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                className={style.formControl}
                                value={surname}
                                onChange={handleChangeProfile}
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={style.formControl}
                                value={email}
                                onChange={handleChangeProfile}
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="tel"
                                className={style.formControl}
                                value={tel}
                                onChange={handleChangeProfile}
                            />
                        </div>

                        <div className={style.actionButtons}>
                            <button className={`${style.btn} ${style.btnPrimary}`}
                                    onClick={() =>
                                        dispatch(changeUserInfo(profileData)).then((res) => {
                                            if (res.payload?.message) {
                                                toast.success(res.payload.message);
                                                dispatch(getUserInfo());
                                            }
                                            dispatch(resetMessage());
                                        })}>
                                <i className="fas fa-save"></i> Change User Info
                            </button>
                        </div>
                    </div>

                    <div className={style.profileSection}>
                        <h3 className={style.sectionTitle}>
                            <i className="fas fa-lock"></i> Security
                        </h3>

                        <div className={style.formGroup}>
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={currentPassword}
                                className={style.formControl}
                                placeholder="Enter current password"
                                onChange={handleChangePassword}
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label htmlFor="newPassword">New Password</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="password"
                                value={password}
                                className={style.formControl}
                                placeholder="Enter new password"
                                onChange={handleChangePassword}
                            />
                        </div>

                        <div className={style.formGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                className={style.formControl}
                                placeholder="Confirm new password"
                                onChange={handleChangePassword}
                            />
                        </div>
                    </div>

                    <div className={style.actionButtons}>
                        <button
                            className={`${style.btn} ${style.btnPrimary}`}
                            onClick={() =>
                                dispatch(changePassword(passwordData)).then((res) => {
                                    if (res.payload?.success) {
                                        toast.success(res.payload?.message || "Password changed successfully");
                                        setPasswordData({
                                            currentPassword: '',
                                            password: '',
                                            confirmPassword: ''
                                        });
                                    }
                                    dispatch(resetMessage());
                                }).catch(() => {
                                    toast.error("Something went wrong");
                                })
                            }
                        >
                            <i className="fas fa-save"></i> Change Password
                        </button>
                        <button className={`${style.btn} ${style.btnDanger}`} style={{marginLeft: "auto"}}>
                            <i className="fas fa-trash"></i> Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
