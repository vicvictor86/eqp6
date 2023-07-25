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
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+ localStorage.getItem('token'),
  }
});

function GerenciarFotos() {
  const navigate = useNavigate()
  const [openUpload, setOpenUpload] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [image, setImage] = useState({
    file: null,
  })
  const [photos, setPhotos] = useState([{}])
  useEffect(() => {
    instance.get('/photos/user/').then((response) => {
      setPhotos(response.data)
    })
  },[])

  const [imageError, setImageError] = useState(false)

  function handleOpenModal(){
    setOpenUpload(true)
  }

  function handleCloseModal(){
    setOpenUpload(false)
  }

  function handleOpenDelete(){
    setOpenDelete(true)
  }

  function handleCloseDelete(){
    setOpenDelete(false)
  }

  // const BACKGROUND_STYLE = {
  //   position: 'fixed',
  //   top: '0',
  //   botton: '0',
  //   left: '0',
  //   right: '0',
  //   backgroundColor: 'rgb(0, 0, 0, 0.7)',
  //   zIndex: '1000',
  // }

  const POPUP_STYLE = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      border: 'none',
      transform: 'translate(-50%, -50%)',
      background: 'var(--color3)',
      borderRadius: '15px',
      outline: 'none',
      padding: '40px',
    }
  }

  // if(localStorage.getItem('token') == null){
  //   navigate('/')
  // }
  return (

    <div className="Container">
          <Menu />
          <div className='PostFotos'>
             {photos.map((photo) => (
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
            ))} 
            <div className='DashPhoto'>
              <img src={gato} alt="Cat2" class="Image"/>
                <div className='CellPhoto'>
                  <div className='DataPhoto'>
                    <h5 style={{color: 'white', fontSize:'17px', marginBottom: '0px'}}>data: 15 de junho de 2023 ás 12:24</h5>
                  </div>
                  <div className='DataPhoto'>
                    <h5 style={{color: 'white', fontSize:'17px', marginBottom: '0px'}}>Tamanho: 4MB</h5>
                  </div> 
                  <button class='ButtonDelete' onClick={handleOpenDelete}>Deletar</button>
                  <ReactModal isOpen={openDelete} onRequestClose={handleCloseDelete} style={POPUP_STYLE}>
                    <h1 style={{
                      color: 'white', fontSize: '25px', width: '510px', marginBottom: '5px',
                      }}>Deseja mesmo excluir permanentemente essa foto?</h1>
                    <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px'}}>
                      <button class='ButtonModal'>Sim</button>
                      <button class='ButtonModal' onClick={handleCloseDelete}>Não</button>
                    </div>
                  </ReactModal>
                </div>
            </div>

            <div className='BackSidePhoto'>
              <button class="ButtonPhoto" onClick={handleOpenModal}>Adicionar Foto</button>
              <ReactModal isOpen={openUpload} onRequestClose={handleCloseModal} style={POPUP_STYLE}>
                <div className=''>
                  <img alt='' src={image.file} style={{ width: 'auto', height: 'auto', background: 'white', maxWidth: '500px', maxHeight: '700px',}} accept="image/*" />
                  <div className='Upload'>
                    <label htmlFor='imageInput' className='ButtonInputImage' style={{ color: imageError ? '#FF2E2E' : 'white' }} >Adicionar Imagem</label>
                    <input accept='image/jpeg' id='imageInput' className='' style={{ display: 'none' }} type='file' onChange={(event) => {
                      setImage({
                        file: URL.createObjectURL(event.target.files[0])
                      })
                    }} />
                    <button onClick={handleCloseModal} class='ButtonModal'>Fechar</button>
                  </div>
                </div>
                
              </ReactModal> 
            </div>
            
          </div>
    
    </div>
  );
}

export default GerenciarFotos;
