import './Register.css';
import RegisterSVG from "../../assets/imgs/register.svg"
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  // "variaveis"
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // erros

  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);

  const isEmail = (email) => {
    const emailRegex = /^([a-zA-Z][^<>\"!@[\]#$%¨&*()~^:;ç,\-´`=+{}º\|/\\?]{1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(String(email).toLowerCase())
  }
  function logar() {

    setEmailError(email == "" || !isEmail(email) ? true : false)
    setSenhaError(senha == "" ? true : false)

    if (senha != "" && email != "" && isEmail(email)) {
      console.log("deu")
    }
  }

  return (
    <div className="Container">
      <div className="Image">
        <div className='ContainerImage'>
          <h1 className="Tittle">Registre-se agora para aproveitar todos os benefícios.</h1>
          <img src={RegisterSVG} alt="" />
        </div>

      </div>
      <div className="Form">
        <div style={{ display: 'block' }}>
          <h3 className='AppName'>Littlegram</h3>
          <label className='LabelPadrao' style={{ color: emailError ? '#FF2E2E' : 'white' }} >email</label>
          <input className='InputPadrao' style={{ border: emailError ? '#FF2E2E 2px solid' : 'white 2px solid', background: emailError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} typeof='text' value={email} onChange={(event) => {
            setEmail(event.target.value);
          }} />
          <label className='LabelPadrao' style={{ color: senhaError ? '#FF2E2E' : 'white' }} >senha</label>

          <input className='InputPadrao' style={{ marginBottom: senhaError || emailError ? 5 : 15, border: senhaError ? '#FF2E2E 2px solid' : 'white 2px solid', background: senhaError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='password' value={senha} onChange={(event) => {
            setSenha(event.target.value);
          }} />

          <label className='LabelPadrao' style={{ color: senhaError || emailError ? '#FF2E2E' : 'white', display: senhaError || emailError ? 'block' : 'none', margin: 'auto', marginBottom: 15 }} >email ou senha inválidos</label>


          <button className='Button' onClick={logar}>Avançar</button>

          <div className='ToRegistro'>
          Já tenho uma conta? <Link to='/'>Loge-se</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
