const Task = require('../models/Task');


exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId; // Obtém o userId do token JWT (passado pelo middleware authenticate)
  
    console.log("User ID recebido:", userId);  // Verifique se o userId foi corretamente adicionado
  
    try {
      // Criação da tarefa associada ao userId
      const newTask = new Task({
        title,
        description,
        userId, // Passa o userId corretamente
      });
  
      // Salva a tarefa no banco de dados
      await newTask.save();
  
      res.status(201).json({
        message: 'Tarefa criada com sucesso!',
        task: newTask,
      });
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      res.status(500).json({ message: 'Erro ao criar tarefa', error });
    }
  };

exports.getAllTasks = async (req, res) => {
    const userId = req.userId;

    try {
        const tasks = await Task.find({userId});

        res.status(200).json({tasks});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao listar tarefas', })
    }
}

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status} = req.body;
    const userId = req.userId;

    try{

        const task = await Task.findOne({_id:id, userId});

        if(!task) {
            return res.status(404).json({message: 'Tarefa não encontrada ou não autorizada'})
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        await task.save();

        res.status(200).json({message: 'Tarefa atualizada com sucesso!', task})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao atualizar tarefa', error})
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {

        const task = await Task.findOneAndDelete({_id: id, userId});

        if(!task) {
            return res.status(404).json({message: 'Tarefa não encontrada'})
        }

        res.status(200).json({message: 'Tarefa deletada com sucesso!'})
    } catch (error){
        console.error(error);
        res.status(500).json({message:'Erro ao deletar tarefa', error})
    }
}

exports.markTaskAsDone = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try{

        const task = await Task.findOne({_id: id, userId});

        if (!task) {
            return res.status(404).json({message:'Tarefa não encontrada'});
        }

        task.status = 'concluída';

        await task.save();

        res.status(200).json({message: 'Tarefa marcada como concluída', task});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao marcar tarefa como concluída', error})
    }
}

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;

    try {
        const task = await Task.findOne({_id: id, userId});

        if (!task) {
            return res.status(404).json({message: 'Tarefa não encontrada'})
        }

        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro ao buscar tarefa', error});
    }
};







/*
const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, '../data/tasks.json');

function readTask(){
    const data = fs.readFileSync(filepath);
    return JSON.parse(data);

}

function writeTasks(tasks) {
    fs.writeFileSync(filepath,JSON.stringify(tasks,null,2));
}

exports.getAllTasks = (req, res) => {
    const tasks = readTask();
    res.json(tasks);
};

exports.createTask = (req, res) => {
    const tasks = readTask();
    const newTask = {
        id: Date.now().toString(),
        title: req.body.title,
        done: false
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
}

exports.getTaskById = (req, res) => {
    const tasks = readTask();
    const index = tasks.findIndex(t => t.id ==req.params.id);
    tank ? res.json(task) : res.status(404).json({error: 'Tarefa não encontrada'});
};

exports.updateTask = (req, res) => {
    const tasks = readTask();
    const index = tasks.findIndex(t => t.id ==req.params.id);
    if (index === -1) return res.status(404).json({error: 'Tarefa não encontrada'});

    tasks[index].title = req.body.title;
    writeTasks(tasks);
    res.json(tasks[index]);
};

exports.markTaskAsDone = (req,res) => {
    const tasks = readTask();
    const index = tasks.findIndex(t => t.id === req.params.id);
    if(index === -1) return res.status(404).json({error: 'Tarefa não encontrada'});

    tasks[index].done = true;
    writeTasks(tasks);
    res.json(tasks[index]);
}

exports.deleteTask = (req, res) => {
    let tasks = readTask();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({error: 'Tarefa não encontrada'});

    tasks = tasks.filter(t => t.id !== req.params.id);
    writeTasks(tasks);
    res.status(204).end();
}*/