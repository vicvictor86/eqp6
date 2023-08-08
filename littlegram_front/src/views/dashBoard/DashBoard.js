import './DashBoard.css';

import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Menu from '../../components/menu/Menu.js'
import config from '../../config';
import axios from 'axios'
import ImageFilter from 'react-image-filter';
import Posts from '../../components/menu/Posts';
function DashBoard() {

  const [photos, setPhotos] = useState([])

  //modal selecionar imagem
  const [openNewPost, setOpenNewPost] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  //modal selecionar filtro
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [photoFilter, setPhotoFilter] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [posts, setPosts] = useState([])

  function getPosts() {
   axios.get(config.baseURL + "/posts/user/?limit=20&page=1", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((response) => {
        setPosts(response.data)
      })
  }

  const getPhotos = () => {
    axios.get(config.baseURL + '/photos/user/', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }).then((response) => {
      setPhotos(response.data)
    }).catch((response) => {
      if (response['response']['data']['message'] === ["No photos found for this user."]) {
        setPhotos([])
      }
    })
  }

  const uploadPost = () => {
    axios.post(config.baseURL + "/posts/", {
      photoId: photos[selectedImage].id,
      description: descricao,
      filterUsed: selectedImage
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.status === 200) {
        setOpenFilter(false)
        getPosts()
      }
    })
  }
  useEffect(() => {
    console.log(posts)
  }, [])
  return (

    <>
    <div className="Container">
      <Menu />
      <div className='PostDashBoard'>
        <div style={{ width: '100%', padding: 15, textAlign: 'center' }}><button onClick={() => { setOpenNewPost(true); getPhotos() }} className='ButtonPhoto'>Adicionar Post</button></div>
        <Posts postsData={posts} activeScroll={true} />
      </div>
    </div>

    {/* Modais */}

      <Modal dialogClassName='ModalMaior' show={openNewPost} onHide={() => {
        setOpenNewPost(openNewPost ? false : true)
      }}>
        <Modal.Body className='ModalMaior' style={{ backgroundColor: 'var(--color3)' }}>
          <h1 style={{ color: 'white', width: '100%', fontWeight: 500, textAlign: 'left' }}>Novo Post:</h1>
          <h3 style={{ textAlign: 'left', color: 'white' }}>Selecione uma imagem</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', border: 'none' }} className='DashPhoto'>
            {photos.length > 0 && photos.map((photo, index) => (
              <div key={index} onClick={() => {
                setSelectedImage(index)
                setOpenNewPost(false)
                setOpenFilter(true)
              }} className='PhotoToPost' style={{ background: String('url(' + config.baseURL + "/files/photos/" + photo.path + ')' + 'center center / cover') }}>
              </div>
            ))}
          </div>

        </Modal.Body>
      </Modal>

      <Modal dialogClassName='ModalMaior' show={openFilter} onHide={() => {
        setOpenFilter(openFilter ? false : true)
        setSelectedFilter(0)
        setPhotoFilter(null)
        setDescricao('')
      }}>
        <Modal.Body className='ModalMaior' style={{ backgroundColor: 'var(--color3)' }}>
          <h1 style={{ color: 'white', width: '100%', fontWeight: 500, textAlign: 'left' }}>Novo Post:</h1>
          <h3 style={{ textAlign: 'left', color: 'white' }}>Selecione um filtro</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', border: 'none' }} className='DashPhoto'>


            <ImageFilter
              onChange={(image) => {
                setPhotoFilter(image)
              }}
              image={ selectedImage !== null ? config.baseURL + "/files/photos/" + photos[selectedImage].path : ''}
              filter={config.filtros[selectedFilter].filter} // see docs beneath
              colorOne={config.filtros[selectedFilter].colorOne}
              colorTwo={config.filtros[selectedFilter].colorTwo}
            />
            <div className='FiltrosItens'> {config.filtros.map((filtro, index) => (<button key={index} style={{ opacity: index === selectedFilter ? 0.5 : 1 }} className='FiltroItem' onClick={() => {
              setSelectedFilter(index)
            }}>{filtro.name}</button>))}</div>
            <textarea maxLength={200} value={descricao} onChange={(event) => {
              setDescricao(event.target.value)
            }} rows={5} placeholder='Adicione aqui uma descrição' className='Descricao'></textarea>
            <button style={{ minWidth: 200 }} className='ButtonModal' onClick={() => { uploadPost() }}>Postar Imagem</button>
          </div>

        </Modal.Body>
      </Modal></>

  );
}

export default DashBoard;
