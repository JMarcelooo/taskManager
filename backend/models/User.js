/*Esse arquivo faz é responsável pela criação do esquema do Banco de Dados na aplicação
nesse caso em relação ao banco de dados de usuários, com os campos name, email e password
*/
//Importação das dependências mongoose para utilizar o mongoDB e o bcryptjs para criptografar a senha
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//Criação do esquema do BDD feito em json
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, //Torna o campo obrigatório
        trim: true //Remove espaços extras desnecessários
    },
    email: {
        type: String,
        required: true,
        unique: true, //Torna o campo único no BDD, não pode haver 2 usuários com emails iguais
        trim: true,
        lowercase: true //transforma os caracteres em lowercase
    },
    password: {
        type: String,
        required: true,
        minlenght: 6 //tamanho mínimo
    }
}, {timestamps: true});


//Método de criptografia da senha
userSchema.pre('save', async function(next) {

    //Apenas criptografa a senha se ela for modificada

    if(!this.isModified('password')) return next();

    //Cria uma série de caracteres aleatórios que serão usados para a criação do Hash
    const salt = await bcrypt.genSalt(10);
    
    //Usa os caracteres aleatórios para criptografar a senha
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

//Método para compara a senha fornecida com a registrada no banco
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;