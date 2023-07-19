import './GerenciarFotos.css';

import axios from 'axios';
import config from '../../config'
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/menu/Menu.js'
const instance = axios.create({
  baseURL: config.baseURL,
  headers:{
    'Access-Control-Allow-Origin': '*'
  }
});

function GerenciarFotos() {
  const navigate = useNavigate()

  // if(localStorage.getItem('token') == null){
  //   navigate('/')
  // }
  return (

    <div className="Container">
          <Menu />
          <div className='PostFotos'>

          </div>
    </div>
  );
}

export default GerenciarFotos;
