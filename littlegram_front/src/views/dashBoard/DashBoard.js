import './DashBoard.css';

import axios from 'axios';
import config from '../../config'
import { useNavigate } from 'react-router-dom';
console.log(config.baseURL)
const instance = axios.create({
  baseURL: config.baseURL,
  headers:{
    'Access-Control-Allow-Origin': '*'
  }
});

function DashBoard() {
  const navigate = useNavigate()

  // if(localStorage.getItem('token') == null){
  //   navigate('/')
  // }
  return (
    <div className="Container">
      
    </div>
  );
}

export default DashBoard;
