import React from 'react';
import {useSelector} from 'react-redux';
import style from "../assets/css/task.module.css";
import app from "../App.module.css";
import Spinner from "react-bootstrap/Spinner";
import {FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

function UserTasks() {
    const {tasks, loading, error} = useSelector(state => state.dashboard);
    console.log(tasks)

    const navigate = useNavigate();

    return (
        <div className={style.container}>

            <h1 className={`${app.title}`}>
                All Tasks - UserId : &nbsp;
                {tasks && tasks.length > 0 && tasks[0]?.assignedTo
                    ? tasks[0].assignedTo._id || tasks[0].assignedTo
                    : "N/A"}
            </h1>


            <div className={style.taskContainer}>
                <div className={style.taskHeader}>
                    <span className={style.arrow} onClick={() => navigate('/api/dashboard')}>
                        <FaArrowLeft/>
                    </span>
                </div>

                <div className={style.taskList} id="taskList">
                    {loading ? (
                        <div className={style.loading}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : error ? (
                        <h3 style={{marginTop: '100px', textAlign: "center"}}>{error}</h3>
                    ) : tasks && tasks.length > 0 ? (
                        tasks.map(task => (
                            <div className={style.taskCard} data-id={task._id} key={task._id}>
                                <div className={style.todoHeader}>
                                    <div className={style.todoTitle}>
                                        <p style={{
                                            display: 'inline-block',
                                            fontWeight: '100',
                                            fontStyle: 'italic',
                                            fontSize: '17px',
                                            marginRight: '5px'
                                        }}>Task title:</p>
                                        {task.title}
                                    </div>

                                    <span className={`${style.statusBadge} ${style[`status${task.status
                                        .split('-')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join('')}`]}`}>
                                        {task.status}
                                    </span>

                                    <div className={style.taskActions}>
                                        <button type="button" className={`${style.actionBtn} ${style.editBtn}`}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button type="button" className={`${style.actionBtn} ${style.deleteBtn}`}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className={style.taskDetails}>
                                    <p style={{
                                        display: 'inline-block',
                                        fontWeight: '100',
                                        fontStyle: 'italic',
                                        fontSize: '17px',
                                        marginRight: '5px'
                                    }}>Task description:</p>
                                    {task.description}
                                </div>

                                <div className={style.taskMeta}>
                                    <span>
                                        <i className="far fa-calendar"></i>
                                        Due: {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "N/A"}
                                    </span>
                                    <span>
                                        <i className="far fa-user"></i>
                                        Assignee: {task.assignedTo?.name || task.assignedTo || "Unknown"}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h3 style={{marginTop: '100px', textAlign: "center"}}>No Tasks Available</h3>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserTasks;
