const Task = require('../models/task.schema');
const User = require('../models/user.schema');
const Notification = require('../models/notification.schema');

class TaskController {
    static async addTask(req, res) {
        const {id} = req.params;
        const adminId = req.userId;
        const {title, description, status} = req.body;


        try {
            const newTask = new Task({
                title,
                description,
                status,
                assignedTo: id,
                createdBy: adminId
            });

            const newNotification = new Notification({
                recipientId: id,
                recipientRole: 'user',
                type: 'system',
                refId: newTask._id,
                content: `The admin has given a new task. ${title}`,
                isRead: false
            });

            await newTask.save();
            await newNotification.save();

            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({message: "User not found", success: false});
            }

            user.tasks.push(newTask._id);
            await user.save();

            res.status(201).json({
                message: 'Task added successfully.',
                success: true,
                task: newTask
            });
        } catch (err) {
            console.error('Error adding new task', err);
            res.status(500).json({
                message: 'Error adding new task',
                success: false,
            });
        }
    }

    static async getTasks(req, res) {
        const userId = req.userId;

        try {
            if (!userId) {
                return res.status(404).json({message: "User not found", success: false});
            }

            const tasks = await Task.find({assignedTo: userId});

            if (!tasks) {
                res.status(404).json({message: "Task not found", success: false});
            }

            res.status(200).json({
                success: true,
                tasks,
                message: 'get tasks successfully.'
            });
        } catch (err) {
            console.error('Error getting tasks', err);
            res.status(500).json({
                message: 'Error getting tasks',
                success: false,
            })
        }
    }

    static async updateStatus(req, res) {
        const {id} = req.params;

        try {
            const task = await Task.findById(id);
            if (!task) {
                return res.status(404).json({message: "Task not found", success: false});
            }

            task.status = 'in-progress';
            await task.save();

            return res.status(200).json({
                success: true,
                task,
                message: 'Task updated successfully.',
            });
        } catch (err) {
            return res.status(500).json({
                message: 'Error saving task',
                success: false,
                error: err.message
            });
        }
    }

    static async deleteTask(req, res) {
        try {
            const {id} = req.params;

            const deletedTask = await Task.findByIdAndDelete(id);

            if (!deletedTask) {
                return res.status(404).json({
                    message: "Task not found",
                    success: false
                });
            }

            return res.status(200).json({
                success: true,
                task: deletedTask,
                message: "Task deleted successfully."
            });

        } catch (err) {
            console.error('Error deleting task', err);
            return res.status(500).json({
                message: 'Error deleting task',
                success: false,
                error: err.message
            });
        }
    }

    static async getAllTask(req, res) {
        try {
            const allTasks = await Task.find({});

            return res.status(200).json({
                success: true,
                allTasks,
                message: 'get tasks successfully.'
            })
        } catch (err) {
            console.error('Error getting tasks', err);
            return res.status(500).json({
                message: 'Error getting task',
                success: false,
                error: err.message
            })
        }
    }
}


module.exports = TaskController;
