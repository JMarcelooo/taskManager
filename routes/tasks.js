// routes/tasks.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../controllers/authController'); // Middleware de autenticação
const taskController = require('../controllers/taskController');


router.post('/', authenticate, taskController.createTask);
router.get('/', authenticate, taskController.getAllTasks);
router.get('/:id', authenticate, taskController.getTaskById);
router.put('/:id/done', authenticate, taskController.markTaskAsDone);
router.put('/:id', authenticate, taskController.updateTask);
router.delete('/:id', authenticate, taskController.deleteTask);

module.exports = router;
