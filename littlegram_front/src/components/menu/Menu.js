import './Menu.css';
import Logout from '../../assets/imgs/logout.svg'
import Home from '../../assets/imgs/casa.svg'
import Image from '../../assets/imgs/image.svg'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from '../../config'
import { isAuth } from '../../views/validators';
import ImageLogout from '../../assets/imgs/logoutImage.svg'


function Menu() {
  const navigate = useNavigate()
  const [imagem,setImage] = useState('')
  const [perfil,setPerfil] = useState('')

  useEffect(()=>{
   var user = localStorage.getItem('user')
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
        <div onClick={() => logout()} className='ItemMenuMobile'>
        <img style={{width:30, height:25}} src={Logout} alt='logout' />  
        </div>
      </div>
      </>
  );
}

export default Menu;
