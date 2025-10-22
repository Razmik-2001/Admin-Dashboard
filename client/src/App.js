import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.css';
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./components/Login";
import Register from "./components/Register";
import {ToastContainer} from "react-toastify";
import UserTasks from "./pages/UserTasks";

function App() {
    return (
        <div className="App">
            <ToastContainer/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/" element={<Navigate to="/login"/>}/>

                <Route path="/api" element={<Layout/>}>
                    <Route index element={<Tasks/>}/>

                    <Route path="tasks" element={<Tasks/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="notifications" element={<Notifications/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path='user-tasks' element={<UserTasks/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
