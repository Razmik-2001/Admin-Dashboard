import React, {useEffect} from 'react';
import style from '../assets/css/task.module.css';
import app from "../App.module.css";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask, fetchTasks, updateTaskStatus} from "../app/features/tasks/taskThunk";
import Spinner from "react-bootstrap/Spinner";

function Tasks() {
    const {tasks, loading, error} = useSelector(state => state.tasks);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleUpdate = (id) => {
        dispatch(updateTaskStatus(id)).then(() => {
            dispatch(fetchTasks());
        })
    }

    const handleDelete = (ev, id) => {
        ev.stopPropagation();
        dispatch(deleteTask(id)).then(() => {
            dispatch(fetchTasks());
        })
    }

    return (
        <div className={style.container}>
            <h1 className={app.title}>All Tasks</h1>
            <div className={style.taskContainer}>
                <div className={style.taskHeader}>
                    <p className={style.taskTitle}>Tasks</p>
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
                            <div className={style.taskCard} data-id={task._id} key={task._id}
                                 onClick={() => handleUpdate(task._id)}>
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
                                    <span
                                        className={`${style.statusBadge} ${style[`status${task.status
                                            .split('-')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join('')}`]}`}>
                                        {task.status}
                                    </span>
                                    <div className={style.taskActions}>
                                        <button type={'button'} className={`${style.actionBtn} ${style.editBtn}`}>
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            type="button"
                                            className={`${style.actionBtn} ${style.deleteBtn}`}
                                            onClick={(ev) => handleDelete(ev, task._id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                        <button type={'button'} className={`${style.actionBtn} ${style.completeBtn}`}>
                                            <i className="fas fa-check"></i>
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
                            Due: {task.createdAt || "N/A"}
                        </span>
                                    <span>
                            <i className="far fa-user"></i>
                            Assignee: {task.assignedTo || "Unknown"}
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

export default Tasks;
