import './Menu.css';
import Logout from '../../assets/imgs/logout.svg'
import Home from '../../assets/imgs/casa.svg'
import Image from '../../assets/imgs/image.svg'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from '../../config'
import { isAuth } from '../../views/validators';
import ImageLogout from '../../assets/imgs/logoutImage.svg'
import Modal from 'react-bootstrap/Modal'

function Menu() {
  const navigate = useNavigate()
  const [imagem,setImage] = useState('')
  const [perfil,setPerfil] = useState('')
  const [logoutModal, setLogoutModal] = useState(false)
  useEffect(()=>{
    setPerfil(localStorage.getItem('username'))
    setImage( config.baseURL + '/files/avatar/' + localStorage.getItem('avatar'))
    
    isAuth(navigate)


  })
  const logout = () => {
    localStorage.removeItem('avatar')
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <>
      <div className="Menu">
        <span className='AppNameMenu'> <h1>Littlegram</h1> </span>
        <img className='ImagePerfilMenu' src={ localStorage.getItem('avatar') === "null" || localStorage.getItem('avatar') === null || localStorage.getItem('avatar') === "" ? "" : imagem} />
        <span className='PerfilMenu'>@{perfil}</span>
        <div className='ItensMenu'>
          <div onClick={() => {
           window.location.pathname === '/home' ? console.log('') : navigate('/home')
          }} className={window.location.pathname === '/home' ? 'ItemMenuActive' : 'ItemMenu'}>Home</div>
          <hr className='BarraMenu' />
          <div onClick={() => {
           window.location.pathname === '/photos' ? console.log('') : navigate('/photos')
          }} className={window.location.pathname === '/photos' ? 'ItemMenuActive' : 'ItemMenu'} >Gerenciar Imagens</div>
          <hr className='BarraMenu' />
        </div>
        <hr style={{position:'absolute', bottom: 45}} className='BarraMenu'/>
        <div onClick={() => logout()} className='LogoutMenu'>
          <img style={{width:30, height:25}} src={Logout} alt='logout' />          Logout
        </div>
      </div>
      <div className="MenuMobile">
        <div onClick={() => {
           window.location.pathname === '/home' ? console.log('') : navigate('/home')
          }} className='ItemMenuMobile'>
        <img style={{width:30, height:25}} src={Home} alt='Home' />  
        </div>
        <div onClick={() => {
           window.location.pathname === '/photos' ? console.log('') : navigate('/photos')
          }} className='ItemMenuMobile'>
        <img style={{width:30, height:25}} src={Image} alt='Gerenciar Imagens' />  

        </div>
        <div onClick={() => setLogoutModal(true)} className='ItemMenuMobile'>
        <img style={{width:30, height:25}} src={Logout} alt='logout' />  
        </div>
      </div>
      <Modal show={logoutModal} onHide={() => setLogoutModal(false)} >
        <Modal.Body style={{ backgroundColor: 'var(--color3)' }}>
        <h1 style={{color: 'white', width: '100%', fontWeight:500, textAlign:'left'}}>Logout</h1>

          <img src={ImageLogout} style={{width:'85%', margin:'0px auto', textAlign:'center'}}/>
          <h1 style={{
            color: 'white', fontSize: '25px', width: '100%', marginBottom: '5px',
          }}>Tem certeza que deseja sair?</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px' }}>
            <button className='ButtonModal' onClick={() => logout()}>Sim</button>
            <button className='ButtonModal' onClick={() => setLogoutModal(false)}>Não</button>
          </div>
        </Modal.Body>
      </Modal>
      </>
  );
}

export default Menu;
