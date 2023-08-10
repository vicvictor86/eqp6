import './DashBoard.css';

import Trash from '../../assets/imgs/trash.svg'

import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Menu from '../../components/menu/Menu.js'
import config from '../../config';
import axios from 'axios'
import ImageFilter from 'react-image-filter';
import { useNavigate } from 'react-router-dom';
import TresPontos from '../../assets/imgs/tres-pontos.svg'

function DashBoard() {
  // Controladores da requisição
  const [isFetchingPhotos, setIsFetchingPhotos] = useState(false);

  const [isFetchingPosts, setIsFetchingPosts] = useState(false);
  const [offSetPosts, setOffSetPosts] = useState(0);
  const [offSetPhotos, setOffSetPhotos] = useState(0);

  const [posts, setPosts] = useState([])

  //modal selecionar imagem
  const [openNewPost, setOpenNewPost] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [photos, setPhotos] = useState([])

  //modal selecionar filtro
  const [openFilter, setOpenFilter] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState(0)
  const [descricao, setDescricao] = useState('')

  // modal deletar post
  const [selectedExclude, setSelectedExclude] = useState(null)
  const [openDelete, setOpenDelete] = useState(false)

  const navigate = useNavigate()

  function getPosts() {
    setIsFetchingPosts(true);
    axios.get(config.baseURL + "/posts/user/?limit=10&offset=" + offSetPosts, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((response) => {
      console.log(response.data)
      setPosts(posts.concat(response.data.posts));
      console.log(offSetPosts)
      if (offSetPosts + 1 >= response.data.totalPages || response.data.posts === []) return

      setOffSetPosts(offSetPosts + 1); // Usando a função de atualização do estado para obter o valor mais recente de 'page'
      setIsFetchingPosts(false);
    })
  }

  const getPhotos = () => {
    setIsFetchingPhotos(true);
    axios.get(config.baseURL + "/photos/user/?limit=10&offset=" + offSetPhotos, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((response) => {

      if (offSetPhotos + 1 > response.data.totalPages || response.data.photos === []) return

      setOffSetPhotos(prevPage => prevPage + 1);
      setIsFetchingPhotos(false);
      setPhotos(photos.concat(response.data.photos));
    }).catch((response) => {
      console.log(response)
      if (response['response']['data']['message'] === ["No photos found for this user."]) {
        setPhotos([])
      }
    })
  }

  const uploadPost = () => {
    axios.post(config.baseURL + "/posts/", {
      photoId: photos[selectedImage].id,
      description: descricao,
      filterUsed: String(selectedFilter)
    }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then((response) => {
      if (response.status === 200) {
        setOpenFilter(false)
        navigate(0)
      }
    })
  }

  // Quando o scroll de posts se move
  const handleScrollPosts = (event) => {
    if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight - 100 && !isFetchingPosts) {
      getPosts()
    }
  }

  // Quando o scrool de photos se move
  const handleScrollPhotos = (event) => {
    if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight - 100 && !isFetchingPhotos) {
      getPhotos()
    }
  }
  const deletePost = (postId) => {
    console.log(postId)
    axios.delete(config.baseURL + "/posts/?postId=" + postId, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((response) => {
      console.log(response)
      if (response.status === 200) {
          setOpenDelete(openDelete ? false : true)
          navigate(0)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(() => {
    getPosts()
  }, [])

  const returnBackground = (url) => {
    var part1 = "url("
    var part2 = url === "" ? "" : config.baseURL + '/files/avatar/' + url
    var part3 = ")  center/cover"
    return part1 + part2 + part3
  }
  return (

    <>
      <div className="Container">
        <Menu />
        <div className='PostDashBoard'>
          <div style={{ width: '100%', padding: 15, textAlign: 'center' }}><button onClick={() => { setOpenNewPost(true); getPhotos() }} className='ButtonPhoto'>Adicionar Post</button></div>
          <div className='ListViews' onScroll={handleScrollPosts} >
            {posts.length > 0 && posts.map((post, index) => (
              <div key={index} className='DashPhoto' style={{ paddingTop: 0 }}>
                <div className='PostHeader'>
                  <div style={{ background: returnBackground(post.user.avatar), width: 40, height: 40, border: 'solid 1px white', margin: 'auto 0px' }} className='ImagePerfilMenu'  ></div>
                  <span style={{ color: 'white', fontSize: 18, fontWeight: 500, margin: 'auto 10px' }}>{'@' + post.user.username}</span>
                  <div style={{ width: 25, height: 30, position: 'absolute', right: 0, top: 10, display: post.user.id === localStorage.getItem('user_id') ? 'block' : 'none' }}><img style={{ width: '100%', cursor: 'pointer' }} src={TresPontos} onClick={() => {
                    setSelectedExclude(post.id)
                    setOpenDelete(true)
                  }} />
                  </div>
                </div>

                <ImageFilter
                  style={{ marginLeft: 50 }}
                  image={config.baseURL + "/files/photos/" + post.photo.path}
                  filter={config.filtros[post.filterUsed].filter} // see docs beneath
                  colorOne={config.filtros[post.filterUsed].colorOne}
                  colorTwo={config.filtros[post.filterUsed].colorTwo}
                />
                <span className='PostDescricao' >{post.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modais */}

      <Modal dialogClassName='ModalMaior' show={openNewPost} onHide={() => {
        setOpenNewPost(openNewPost ? false : true)
      }}>
        <Modal.Body onScroll={handleScrollPhotos} className='ModalMaior' style={{ backgroundColor: 'var(--color3)', maxHeight: '86vh', overflow: 'auto' }}>
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
        setDescricao('')
      }}>
        <Modal.Body className='ModalMaior' style={{ backgroundColor: 'var(--color3)', maxHeight: '86vh', overflow: 'auto' }}>
          <h1 style={{ color: 'white', width: '100%', fontWeight: 500, textAlign: 'left' }}>Novo Post:</h1>
          <h3 style={{ textAlign: 'left', color: 'white' }}>Selecione um filtro</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', border: 'none' }} className='DashPhoto'>


            <ImageFilter
              image={selectedImage !== null ? config.baseURL + "/files/photos/" + photos[selectedImage].path : ''}
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
      </Modal>
      
      <Modal show={openDelete} onHide={() => {
        setOpenDelete(openDelete ? false : true)
      }}>
        <Modal.Body style={{ backgroundColor: 'var(--color3)' }}>
        <h1 style={{ color: 'white', width: '100%', fontWeight: 500, textAlign: 'left' }}>Deletar Post</h1>

          <img src={Trash} />
          <h1 style={{width:'100%', color: 'white', fontSize: '25px', marginBottom: '5px',
          }}>Deseja mesmo excluir permanentemente esse post?</h1>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '20px' }}>
            
         
            <button className='ButtonModal' onClick={() => { deletePost(selectedExclude) }}>Sim</button>
            <button className='ButtonModal' onClick={() => {
              setOpenDelete(openDelete ? false : true)
            }}>Não</button>
          </div>
        </Modal.Body>
      </Modal>
      
      </>
      

  );
}

export default DashBoard;
