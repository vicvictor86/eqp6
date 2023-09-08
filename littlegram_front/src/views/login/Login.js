import './Login.css';
import LoginSVG from "../../assets/imgs/login.svg"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'
import { isNoAuth } from '../validators';
const instance = axios.create({
  baseURL: config.baseURL,
  headers:{
    'Access-Control-Allow-Origin': '*'
  }
});
function validarSenha(senha) {
  // Verifica se a senha tem pelo menos 8 caracteres
  if (senha.length < 8) {
    return false;
  }

  // Verifica se a senha contém pelo menos um caractere especial
  const caractereEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;
  if (!caractereEspecial.test(senha)) {
    return false;
  }

  // Verifica se a senha contém pelo menos uma letra maiúscula
  const letraMaiuscula = /[A-Z]/;
  if (!letraMaiuscula.test(senha)) {
    return false;
  }

  // Se todos os critérios forem atendidos, a senha é válida
  return true;
}
function Login() {
  const navigate = useNavigate()
  // "variaveis"
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // erros

  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);
  const [userInvalid, setUserInvalid] = useState(false)
  const [esperandoConfirmError, setEsperandoConfirmError] = useState(false)
  const isEmail = (email) => {
    const emailRegex = /^([a-zA-Z][^<>\"!@[\]#$%¨&*()~^:;ç,\-´`=+{}º\|/\\?]{1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(String(email).toLowerCase())
  }
  useEffect(() => {
    isNoAuth(navigate)
  })
  async function logar() {

    setEmailError(email === "" || !isEmail(email) ? true : false)
    setSenhaError(senha === "" || !validarSenha(senha) ? true : false)

    if (senha !== "" && email !== "" && isEmail(email) && validarSenha(senha)) {

   
      instance.post('/sessions', {
        email: email,
        password: senha
      })
      .then(function (response) {
        if(response.status === 200){
          if(response.data['user']['confirmed'] === false){
            setEsperandoConfirmError(true)
          }else{
            setEsperandoConfirmError(false)
            setUserInvalid(false)
            localStorage.setItem('username', response.data['user']['username'])
            localStorage.setItem('avatar', response.data['user']['avatar'])
            localStorage.setItem('token', response.data['token'])
            localStorage.setItem('user_id', response.data['user']['id'])

            navigate("/home")
          }
          
        }
      })
      .catch(function (error) {
        if(error.response.data['message'] == "Email or password incorrect"){
          setUserInvalid(true)
        }
      });
    }
  }

  return (
    <div className="Container">
      <div className="Image">
        <div className='ContainerImage'>
          <h1 className="Tittle">Entre para se conectar e compartilhar momentos.</h1>
          <img src={LoginSVG} alt="" />
        </div>

      </div>
      <div className="Form">
        <div style={{ display: 'block' }}>
          <h3 className='AppName'>Littlegram</h3>
          <label htmlFor='email' className='LabelPadrao' style={{ color: emailError ? '#FF2E2E' : 'white' }} >email</label>
          <input id='email' className='InputPadrao' style={{ border: emailError ? '#FF2E2E 2px solid' : 'white 2px solid', background: emailError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} typeof='text' value={email} onChange={(event) => {
            setEmail(event.target.value);
          }} />
          <label htmlFor='password' className='LabelPadrao' style={{ color: senhaError ? '#FF2E2E' : 'white' }} >senha</label>

          <input id='password' className='InputPadrao' style={{ marginBottom: userInvalid ? 5 : 15, border: senhaError ? '#FF2E2E 2px solid' : 'white 2px solid', background: senhaError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='password' value={senha} onChange={(event) => {
            setSenha(event.target.value);
          }} />

          <label className='LabelPadrao' style={{ color: userInvalid ? '#FF2E2E' : 'white', display:  userInvalid ? 'block' : 'none', margin: 'auto', marginBottom: 15 }} >email ou senha inválidos</label>

          <label className='LabelPadrao' style={{ color: esperandoConfirmError ? '#FF2E2E' : 'white', display:  esperandoConfirmError ? 'block' : 'none', margin: 'auto', marginBottom: 15 }} >esperando confirmar o email</label>


          <button id = 'advance' className='Button' onClick={logar}>Avançar</button>

          <div className='ToRegistro'>
            não tem uma conta? <Link to="/register">Registre-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
