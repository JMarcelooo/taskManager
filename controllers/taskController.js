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
}