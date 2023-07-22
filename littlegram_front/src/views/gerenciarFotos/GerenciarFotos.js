import './GerenciarFotos.css';

import axios from 'axios';
import gatoSus from '../../img/gatoSus.jpg'
import gato from '../../img/gato.jpg'
import config from '../../config'
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/Menu.js'
import { useState, useEffect} from 'react';

const instance = axios.create({
  baseURL: config.baseURL,
  headers:{
    'Access-Control-Allow-Origin': '*'
  }
});

function GerenciarFotos() {
  const navigate = useNavigate()
  const [openUpload, setOpenUpload] = useState(false)
  const [photos, setPhotos] = useState([{}])
  // useEffect(() => {
  //   instance.get('/photos/user/').then((response) => {
  //     setPhotos(response.data)
  //   })
  // },[])

  function handleOpenModal(){
    setOpenUpload(true)
  }

  function handleCloseModal(){
    setOpenUpload(false)
  }

  const BACKGROUND_STYLE = {
    position: 'fixed',
    top: '0',
    botton: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgb(0, 0, 0, 0.7)',
  }

  const POPUP_STYLE = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      padding: '150px',
  }

  // if(localStorage.getItem('token') == null){
  //   navigate('/')
  // }
  return (

    <div className="Container">
          <Menu />
          <div className='PostFotos'>
            {/* {photos.map((photo) => (
              <div className='DashPhoto'>
                <img src={gatoSus} alt="Cat" class="Image"/>
                <div className='CellPhoto'>
                  <div className='DataPhoto'>
                    <h5 style={{color: 'white', fontSize:'17px',}}>data: {photo.createdAt}</h5>
                  </div>
                  <div className='DataPhoto'>
                    <h5 style={{color: 'white', fontSize:'17px',}}>Tamanho: {photo.size}</h5>
                  </div> 
                  <button class='ButtonDelete'>Deletar</button>
                </div>
              </div>
            ))} */}
            <div className='DashPhoto'>
              <img src={gato} alt="Cat2" class="Image"/>
                <div className='CellPhoto'>
                  <div className='DataPhoto'>
                    <h5 style={{color: 'white', fontSize:'17px',}}>data: 15 de junho de 2023 ás 12:24</h5>
                  </div>
                  <div className='DataPhoto'>
                    <h5 style={{color: 'white', fontSize:'17px',}}>Tamanho: 4MB</h5>
                  </div> 
                  <button class='ButtonDelete'>Deletar</button>
                </div>
            </div>
            <div className='BackSidePhoto'>
              <button class="ButtonPhoto" onClick={handleOpenModal}>Adicionar Foto</button>
              {/* <ReactModal isOpen={openUpload} onRequestClose={handleCloseModal}>
                <div style={BACKGROUND_STYLE}>
                  <div style={POPUP_STYLE}>Hello</div>
                  <button onClick={handleCloseModal}>Fechar</button>
                </div>
              </ReactModal> */}
            </div>
            
          </div>
    
    </div>
  );
}

export default GerenciarFotos;
