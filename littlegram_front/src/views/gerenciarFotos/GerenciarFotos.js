import './GerenciarFotos.css';

import axios from 'axios';
import config from '../../config'
import ReactModal from 'react-modal';
import Menu from '../../components/menu/Menu.js'
import { useState, useEffect } from 'react';
import { checkImageSize } from '../validators'

const instance = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }
});

function bytesToMegabytes(bytes) {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2);
}

function data(date) {
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  //const nameMonth = date.toLocaleString('default', { month: 'long' });
  const month = dateObject.getMonth();
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const meses = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];
  return `${day} de ${meses[month]} de ${year} às ${hours}:${minutes}`
}

function GerenciarFotos() {

  const [openUpload, setOpenUpload] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openErroPhotoSize, setErroSize] = useState(false)

  const [image, setImage] = useState({
    file: null,
  })
  const [photos, setPhotos] = useState([
    {
      createdAt: "2023-07-25T02:51:25.000Z",
      path: "8b9759d42e3535ef8aee-wallpaperflare.com_wallpaper.jpg",
      size: "0.18",
      updatedAt: "2023-07-25T02:51:25.000Z",
      userId: "9d623cc7-2fbe-40e1-bc93-f12a6b3eeaa5",
      photoId: "jwdoaijw"
    },
  ])

  const [openErroFileType, setOpenErroFileType] = useState(false);

  const handleCloseErroFileType = () => {
    setOpenErroFileType(false);
  }

  const handleOpenErroFileType = () => {
    setOpenErroFileType(true);
  }

  const [imageError, setImageError] = useState(false)
  const [openFileRequiredError, setOpenFileRequiredError] = useState(false);

  const uploadPhotos = () => {
    instance.get('/photos/user/').then((response) => {
      for (const key in response.data) {

        response.data[key].size = bytesToMegabytes(response.data[key].size)
      }
      console.log(response.data)
      setPhotos(response.data)
    }).catch((response) => {
      if (response['response']['data']['message'] === ["No photos found for this user."]) {
        setPhotos([])
      }
    })
  }

  const handleOpenModal = () => {
    setOpenUpload(true)
  }

  const handleCloseModal = () => {
    setOpenUpload(false)
  }

  const handleCloseFileRequiredError = () => {
    setOpenFileRequiredError(false);
  };

  const handleOpenFileRequiredError = () => {
    setOpenFileRequiredError(true);
  };

  const handleDelete = () => {
    setOpenDelete(openDelete ? false : true)
  }

  const handleOpenErroSize = () => {
    setErroSize(true)
  }

  const handleCloseErroSize = () => {
    setErroSize(false)
  }

  const uploadPhoto = () => {
    if (!image.fileReal) {
      handleOpenFileRequiredError();
      return;
    }
    const form = new FormData();
    form.append('photo', image.fileReal);

    axios.post(config.baseURL + '/photos/', form, {
      headers: { 'Content-Type': 'multipart/form-data', Authorization: 'Bearer ' + localStorage.getItem("token") }
    }).then((response) => {

      if (response.status === 200) {
        handleCloseModal();
        setImage({});
      }
    }).catch((error) => {
      if (error.response) {
        console.error('Error response:', error.response);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      console.error('Error config:', error.config);
    });
  };

  const delet = (path, photoId) => {

    axios.delete(config.baseURL + "/photos?path=" + path + "&photoId=" + photoId, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }
    ).then((response) => {

      if (response.status === 200) {
        handleDelete()
        uploadPhotos()
      }

    })
  }

  useEffect(() => {
    uploadPhotos()
  }, [])

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

  return (

    <div className="Container">
      <Menu />
      <div className='PostFotos'>
        {photos !== undefined && photos.map((photo, index) => (
          <div key={index} className='DashPhoto'>
            <img src={config.baseURL + "/files/photos/" + photo.path} alt="Cat" className="Image" />
            <div className='CellPhoto'>
              <div className='DataPhoto'>
                <h5 style={{ color: 'white', fontSize: '17px', }}>data: {data(photo.createdAt)}</h5>
              </div>
              <div className='DataPhoto'>
                <h5 style={{ color: 'white', fontSize: '17px', }}>tamanho: {photo.size} mb</h5>
              </div>
              <button className='ButtonDelete' onClick={handleDelete}>deletar</button>
              <ReactModal isOpen={openDelete} onRequestClose={handleDelete} style={POPUP_STYLE}>
                <h1 style={{
                  color: 'white', fontSize: '25px', width: '510px', marginBottom: '5px',
                }}>Deseja mesmo excluir permanentemente essa foto?</h1>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px' }}>
                  <button className='ButtonModal' onClick={() => { delet(photo.path, photo.id) }}>Sim</button>
                  <button className='ButtonModal' onClick={handleDelete}>Não</button>
                </div>
              </ReactModal>
            </div>
          </div>
        ))}

        <div className='BackSidePhoto'>
          <button className="ButtonPhoto" onClick={handleOpenModal}>Adicionar Foto</button>
          <ReactModal isOpen={openUpload} onRequestClose={handleCloseModal} style={POPUP_STYLE}>
            <div className=''>
              <img alt='' src={image.file} style={{ width: 'auto', height: 'auto', background: 'white', maxWidth: '500px', maxHeight: '700px', }} accept="image/*" />
              <div className='Upload'>
                <button className='ButtonModal' onClick={uploadPhoto}>Enviar</button>
                <label htmlFor='imageInput' className='ButtonInputImage' style={{ color: imageError ? '#FF2E2E' : 'white' }} >Adicionar Imagem</label>
                <input
                  accept="image/png,image/jpeg,image/jpg"
                  id='imageInput'
                  className=''
                  style={{ display: 'none' }}
                  type='file'
                  onChange={(event) => {
                    const file = event.target.files[0];
                    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                    if (!acceptedImageTypes.includes(file['type'])) {
                      handleOpenErroFileType();
                      return;
                    }
                    if (checkImageSize()) {
                      setImage({
                        fileReal: file,
                        file: URL.createObjectURL(file)
                      })
                      setPhotos(uploadPhotos())
                    } else {
                      handleOpenErroSize()
                    }
                  }}
                />
                <button onClick={handleCloseModal} className='ButtonModal'>Fechar</button>
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
      <ReactModal isOpen={openErroFileType} onRequestClose={handleCloseErroFileType} style={POPUP_STYLE}>
        <h1 style={{
          color: 'white', fontSize: '25px', width: '510px', marginBottom: '5px',
        }}>O arquivo não é suportado</h1>
      </ReactModal>
      <ReactModal isOpen={openFileRequiredError} onRequestClose={handleCloseFileRequiredError} style={POPUP_STYLE}>
        <h1 style={{
          color: 'white', fontSize: '25px', width: '510px', marginBottom: '5px',
        }}>A seleção do arquivo é obrigatória</h1>
      </ReactModal>
    </div>
  );
}

export default GerenciarFotos;
