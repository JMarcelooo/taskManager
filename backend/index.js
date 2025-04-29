const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/authRoute')
const connectDB = require('./config/db')


connectDB();

app.use(express.json());
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes)

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
