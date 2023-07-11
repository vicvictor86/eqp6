import './Register.css';
import RegisterSVG from "../../assets/imgs/register.svg"
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirm_senha, setConfSenha] = useState('');
  const [username, setUsername] = useState('');

  const [nomeError, setNomeError] = useState(false);
  const [sobreNomeError, setsobreNomeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const [confirmSenhaError, setConfirmSenhaError] = useState(false);
  const [cadastradoError, setCadastradoError] = useState(false)

  const isEmail = (email) => {
    const emailRegex = /^([a-zA-Z][^<>\"!@[\]#$%¨&*()~^:;ç,\-´`=+{}º\|/\\?]{1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(String(email).toLowerCase())
  }
  function registrar() {

    setNomeError(nome == "" ? true : false)
    setUsernameError(nome == "" ? true : false)

    setsobreNomeError(sobrenome == "" ? true : false)
    setEmailError(email == "" || !isEmail(email) ? true : false)
    setSenhaError(senha == "" || (senha != confirm_senha) ? true : false)
    setConfirmSenhaError(confirm_senha == "" || (senha != confirm_senha) ? true : false)
    setCadastradoError(false)


    if (username != "" && nome != "" && sobrenome != "" && email != "" && senha != "" && confirm_senha != "" && (senha == confirm_senha) && isEmail(email)) {
      console.log(nome)
      console.log(sobrenome)

      console.log(email)

      console.log(senha)

      console.log(username)

      console.log(confirm_senha)

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
      <div className="FormRegis">
        <div style={{ display: 'inline-block', height: 'auto' }}>
          <h3 className='AppName'>Littlegram</h3>

          <label className='LabelPadrao' style={{ color: nomeError ? '#FF2E2E' : 'white' }} >nome</label>

          <input className='InputPadrao' style={{ marginBottom: nomeError ? 5 : 15, border: nomeError ? '#FF2E2E 2px solid' : 'white 2px solid', background: nomeError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='text' value={nome} onChange={(event) => {
            setNome(event.target.value);
          }} />



          <label className='LabelPadrao' style={{ color: sobreNomeError ? '#FF2E2E' : 'white' }} >sobrenome</label>

          <input className='InputPadrao' style={{ marginBottom: sobreNomeError ? 5 : 15, border: sobreNomeError ? '#FF2E2E 2px solid' : 'white 2px solid', background: sobreNomeError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='text' value={sobrenome} onChange={(event) => {
            setSobrenome(event.target.value);
          }} />

          <label className='LabelPadrao' style={{ color: emailError ? '#FF2E2E' : 'white' }} >email</label>
          <input className='InputPadrao' style={{ border: emailError ? '#FF2E2E 2px solid' : 'white 2px solid', background: emailError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} typeof='text' value={email} onChange={(event) => {
            setEmail(event.target.value);
          }} />

          <label className='LabelPadrao' style={{ color: usernameError ? '#FF2E2E' : 'white' }} >username</label>
          <input className='InputPadrao' style={{ border: usernameError ? '#FF2E2E 2px solid' : 'white 2px solid', background: usernameError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} typeof='text' value={username} onChange={(event) => {
            setUsername(event.target.value);
          }} />

          <label className='LabelPadrao' style={{ color: confirmSenhaError || senhaError ? '#FF2E2E' : 'white' }} >senha</label>

          <input className='InputPadrao' style={{ marginBottom: confirmSenhaError || senhaError ? 5 : 15, border: confirmSenhaError || senhaError ? '#FF2E2E 2px solid' : 'white 2px solid', background: confirmSenhaError || senhaError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='password' value={senha} onChange={(event) => {
            setSenha(event.target.value);
          }} />

          <label className='LabelPadrao' style={{ color: confirmSenhaError || senhaError ? '#FF2E2E' : 'white' }} >confirmar senha</label>

          <input className='InputPadrao' style={{ marginBottom: confirmSenhaError || senhaError ? 15 : 15, border: confirmSenhaError || senhaError ? '#FF2E2E 2px solid' : 'white 2px solid', background: confirmSenhaError || senhaError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='password' value={confirm_senha} onChange={(event) => {
            setConfSenha(event.target.value);
          }} />


          <button className='ButtonRegis' onClick={registrar}>Avançar</button>


        </div>
        <div className='ToRegistroRegis'>
          já tenho uma conta? <Link to='/'>Loge-se</Link>
        </div>
      </div>

    </div>
  );
}

export default Register;
