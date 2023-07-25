import './GerenciarFotos.css';

import axios from 'axios';
import config from '../../config'
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/Menu.js'
import { useState, useEffect} from 'react';
import { checkImageSize } from '../validators'

const instance = axios.create({
  baseURL: config.baseURL,
  headers:{
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer '+ localStorage.getItem('token'),
  }
});

function bytesToMegabytes(bytes) {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2);
}

function data(date){
  const dateObject = new Date(date);

  const year = dateObject.getFullYear(); 
  //const nameMonth = date.toLocaleString('default', { month: 'long' });
  const month = dateObject.getMonth() + 1; 
  const day = dateObject.getDate(); 
  const hours = dateObject.getHours(); 
  const minutes = dateObject.getMinutes(); 
  
  return `Data: ${day} do ${month} de ${year}, às ${hours} e ${minutes}`
}

function uploadPhotos(){
  instance.get('/photos/user/').then((response) => {
    for (const key in response.data) {
      response.data[key].size = bytesToMegabytes(response.data[key].size)
    }
    return response.data
  })
}

function delet(path, photoId){
  instance.delete("/photos/", {
    path: path,
    photoId: photoId,
  }).then((response) => {
    console.log(response)
  })
}

function GerenciarFotos() {
  const navigate = useNavigate()
  const [openUpload, setOpenUpload] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openErroPhotoSize, setErroSize] = useState(false)

  const [image, setImage] = useState({
    file: null,
  })
  const [photos, setPhotos] = useState([{}])
  useEffect(() => {
    console.log('kkkkkk')
    instance.get('/photos/user/').then((response) => {
      for (const key in response.data) {
        response.data[key].size = bytesToMegabytes(response.data[key].size)
      }
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

  function handleOpenErroSize(){
    setErroSize(true)
  }

  function handleCloseErroSize(){
    setErroSize(false)
  }

  function uploadPhoto(){
    const form = new FormData()
    form.append('photo', image.fileReal);
    console.log(image)

    axios.post(config.baseURL + '/photos/',form,  {
        headers: {  'Content-Type': 'multipart/form-data',  Authorization: 'Bearer '+ localStorage.getItem("token")}
    }).then((response)=>{
      if(response.status === 200){
        handleCloseModal()
        setImage({})
      }
    })
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
                <img src={config.baseURL+"/files/photos/"+photo.path} alt="Cat" class="Image"/>
                <div className='CellPhoto'>
                  <div className='DataPhoto'>
                    <h5 style={{color: 'white', fontSize:'17px',}}>{data(photo.createdAt)}</h5>
                  </div>
                  <div className='DataPhoto'>
                    <h5 style={{color: 'white', fontSize:'17px',}}>Tamanho: {photo.size} MB</h5>
                  </div> 
                  <button class='ButtonDelete' onClick={handleOpenDelete}>Deletar</button>
                  <ReactModal isOpen={openDelete} onRequestClose={handleCloseDelete} style={POPUP_STYLE}>
                    <h1 style={{
                      color: 'white', fontSize: '25px', width: '510px', marginBottom: '5px',
                      }}>Deseja mesmo excluir permanentemente essa foto?</h1>
                    <div style={{display: 'flex',flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px'}}>
                      <button className='ButtonModal' onClick={() => {delet(photo.path, photo.photoId)}}>Sim</button>
                      <button className='ButtonModal' onClick={handleCloseDelete}>Não</button>
                    </div>
                  </ReactModal>
                </div>
              </div>
            ))}

            <div className='BackSidePhoto'>
              <button class="ButtonPhoto" onClick={handleOpenModal}>Adicionar Foto</button>
              <ReactModal isOpen={openUpload} onRequestClose={handleCloseModal} style={POPUP_STYLE}>
                <div className=''>
                  <img alt='' src={image.file} style={{ width: 'auto', height: 'auto', background: 'white', maxWidth: '500px', maxHeight: '700px',}} accept="image/*" />
                  <div className='Upload'>
                    <button class='ButtonModal' onClick={uploadPhoto}>Enviar</button>
                    <label htmlFor='imageInput' className='ButtonInputImage' style={{ color: imageError ? '#FF2E2E' : 'white' }} >Adicionar Imagem</label>
                    <input accept="image/png,image/jpeg,image/jpg" id='imageInput' className='' style={{ display: 'none' }} type='file' onChange={(event) => {
                      if(checkImageSize()){
                        setImage({
                          fileReal: event.target.files[0],
                          file: URL.createObjectURL(event.target.files[0])
                        })
                        setPhotos(uploadPhotos())
                      }else{
                        handleOpenErroSize()
                      }
                      
                    }} />
                    <button onClick={handleCloseModal} class='ButtonModal'>Fechar</button>
                  </div>
                </div>
                
              </ReactModal> 
            </div>
            
          </div>
          <ReactModal isOpen={openErroPhotoSize} onRequestClose={handleCloseErroSize} style={POPUP_STYLE}>
            <h1 style={{
              color: 'white', fontSize: '25px', width: '510px', marginBottom: '5px',
            }}>Imagem acima de 10 megabytes</h1>
          </ReactModal>
    </div>
  );
}

export default GerenciarFotos;
