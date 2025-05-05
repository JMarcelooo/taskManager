import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);


    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login');
            setToken(response.data.token);
            alert('Login realizado com sucesso!');
        } catch (error) {
            alert('Erro no login:' + error.response.data.message);
        }
    };


    return (
        <div className='login-container'>
            <h1>Login</h1>
            <input type="email" placeholder='Email' onChange={e => setEmail(e.target)}></input>
            <input type='password' placeholder='Senha' onChange={e => setPassword(e.target.value)}></input>
            <a href="" className='forgot-password'>Esqueceu sua senha?</a>
            <button onClick={handleLogin}>Login</button>
            <a href="" className='register-link'>Crie sua conta</a>
        </div>
    )
}

export default Login;