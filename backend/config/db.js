const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Conectar ao MongoDB sem a opção 'useNewUrlParser'
    await mongoose.connect('mongodb://localhost:27017/todolist');

    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);  // Encerra o processo se a conexão falhar
  }
};

module.exports = connectDB;
