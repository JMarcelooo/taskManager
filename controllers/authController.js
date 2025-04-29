const User = require('../models/User');
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        
        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({message: 'Email já resgistrado!'});
        }

        const newUser = new User ({
            name,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: {name: newUser.name, email: newUser.email}
        });
    } catch (error) {
        res.status(500).json({
        message: 'Erro ao registrar usuário. Por favor, tente novamente.',
        error: error.message || error // Detalha o erro no JSON para ajudar na depuração
        });}
};

exports.login = async (req, res) => {
    
    const {email, password} = req.body;

    try{

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'Usuário não encontrado'});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: 'Senha Incorreta'});
        }

        const token = jwt.sign(
            {userid: user._id},
            'secret_key',
            {expiresIn: '1h'}
        );

        res.status(200).json({message: 'Login sucedido: ', token});
    } catch (error) {
        res.status(500).json({
            message: 'Erro no Login',
            error: error.message || error // Detalha o erro no JSON para ajudar na depuração
            });
    }

}

exports.authenticate = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(403).json({message:'Token ausente'});
    }

    try{
        const decoded = jwt.verify(token.split(' ')[1], 'secret key');
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({message:'Token inválido'})
    }
}