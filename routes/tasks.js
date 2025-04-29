const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');  // Verifique a importação

// Verifique se as funções são referenciadas corretamente:
router.get('/', taskController.getAllTasks);                // Listar tarefas
router.post('/', taskController.createTask);               // Criar nova tarefa
router.get('/:id', taskController.getTaskById);            // Buscar tarefa por ID
router.put('/:id', taskController.updateTask);             // Atualizar tarefa
router.patch('/:id/done', taskController.markTaskAsDone);  // Marcar como concluída
router.delete('/:id', taskController.deleteTask);          // Deletar tarefa

module.exports = router;
