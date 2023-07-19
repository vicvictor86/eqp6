import './Register.css';
import RegisterSVG from "../../assets/imgs/register.svg"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config'


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


function Register() {
  const history = useNavigate();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirm_senha, setConfSenha] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState({
    file: null,
  })


  const [nomeError, setNomeError] = useState(false);
  const [sobreNomeError, setsobreNomeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [senhaError, setSenhaError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [confirmSenhaError, setConfirmSenhaError] = useState(false);
  const [imageError, setImageError] = useState(false)
  const [cadastradoError, setCadastradoError] = useState(false)

  const isEmail = (email) => {
    const emailRegex = /^([a-zA-Z][^<>\"!@[\]#$%¨&*()~^:;ç,\-´`=+{}º\|/\\?]{1,})@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(String(email).toLowerCase())
  }

  function registrar() {
    
    setNomeError(nome === "" ? true : false)
    setUsernameError(username === "" ? true : false)
    setsobreNomeError(sobrenome === "" ? true : false)
    setEmailError(email === "" || !isEmail(email) ? true : false)
    setSenhaError(senha === "" || (senha !== confirm_senha) || !validarSenha(senha) ? true : false)
    setConfirmSenhaError(confirm_senha === "" || (senha !== confirm_senha) || !validarSenha(confirm_senha) ? true : false)
    setCadastradoError(false)
    setImageError(image.file === "" || image.file === null ? true : false)

    if (image.file !== "" && username !== "" && nome !== "" && sobrenome !== "" && email !== "" && senha !== "" && confirm_senha !== "" && (senha === confirm_senha) && isEmail(email) && validarSenha(senha) && validarSenha(confirm_senha)) {
   
      instance.post('/users', {
        realName: nome + sobrenome,
        username: username,
        email: email,
        password: senha
      })
      .then(function (response) {
        console.log(response.data)
        if(response.status === 200){
          setCadastradoError(false)
          history('/');

        }
      })
      .catch(function (error) {
        console.log(error);
        if(error.response.data['message'] == "Email or password incorrect"){
          setCadastradoError(true)
        }
      });
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
          {/* Image input */}
          <div className='InputImageDiv'>
            <img alt='' src={image.file} style={{ width: 130, height: 130, background: 'white', borderRadius: '50%', }} accept="image/*" />
            <label htmlFor='imageInput' className='InputImage' style={{ color: imageError ? '#FF2E2E' : 'black' }} >Adicionar Imagem</label>
            <input accept='image/jpeg' id='imageInput' className='' style={{ display: 'none' }} type='file' onChange={(event) => {
              setImage({
                file: URL.createObjectURL(event.target.files[0])
              })
            }} />
          </div>

          {/* Nome */}
          <label className='LabelPadrao' style={{ color: nomeError ? '#FF2E2E' : 'white' }} >nome</label>
          <input maxLength={256} className='InputPadrao' style={{ marginBottom: nomeError ? 5 : 15, border: nomeError ? '#FF2E2E 2px solid' : 'white 2px solid', background: nomeError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='text' value={nome} onChange={(event) => {
            setNome(event.target.value);
          }} />
          {/* Sobrenome */}
          <label className='LabelPadrao' style={{ color: sobreNomeError ? '#FF2E2E' : 'white' }} >sobrenome</label>
          <input maxLength={256} className='InputPadrao' style={{ marginBottom: sobreNomeError ? 5 : 15, border: sobreNomeError ? '#FF2E2E 2px solid' : 'white 2px solid', background: sobreNomeError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='text' value={sobrenome} onChange={(event) => {
            setSobrenome(event.target.value);
          }} />
          {/* Email */}
          <label className='LabelPadrao' style={{ color: emailError ? '#FF2E2E' : 'white' }} >email</label>
          <input maxLength={256} className='InputPadrao' style={{ border: emailError ? '#FF2E2E 2px solid' : 'white 2px solid', background: emailError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} typeof='text' value={email} onChange={(event) => {
            setEmail(event.target.value);
          }} />
          {/* Username */}
          <label className='LabelPadrao' style={{ color: usernameError ? '#FF2E2E' : 'white' }} >username</label>
          <input maxLength={256} className='InputPadrao' style={{ border: usernameError ? '#FF2E2E 2px solid' : 'white 2px solid', background: usernameError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} typeof='text' value={username} onChange={(event) => {
            setUsername(event.target.value);
          }} />
          {/* Senha */}
          <label className='LabelPadrao' style={{ color: confirmSenhaError || senhaError ? '#FF2E2E' : 'white' }} >senha</label>
          <input maxLength={200} className='InputPadrao' style={{ marginBottom: confirmSenhaError || senhaError ? 5 : 15, border: confirmSenhaError || senhaError ? '#FF2E2E 2px solid' : 'white 2px solid', background: confirmSenhaError || senhaError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='password' value={senha} onChange={(event) => {
            setSenha(event.target.value);
          }} />
          {/* Confirmar Senha */}
          <label className='LabelPadrao' style={{ color: confirmSenhaError || senhaError ? '#FF2E2E' : 'white' }} >confirmar senha</label>
          <input maxLength={200} className='InputPadrao' style={{ marginBottom: confirmSenhaError || senhaError ? 15 : 15, border: confirmSenhaError || senhaError ? '#FF2E2E 2px solid' : 'white 2px solid', background: confirmSenhaError || senhaError ? 'linear-gradient(0deg, rgba(255, 46, 46, 0.20) 0%, rgba(255, 46, 46, 0.20) 100%), #AF70FD' : 'transparent' }} type='password' value={confirm_senha} onChange={(event) => {
            setConfSenha(event.target.value);
          }} />
          <label className='LabelPadrao' style={{ color: cadastradoError ? '#FF2E2E' : 'white', display:  cadastradoError ? 'block' : 'none', margin: 'auto', marginBottom: 15 }} >email ou username já cadastrado</label>

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
