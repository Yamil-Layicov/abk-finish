import axios from 'axios';

const data = JSON.parse(localStorage.getItem('user2'));

const instance = axios.create({
  baseURL: 'https://res.hill.az/api',
  headers:{
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${data?.token}`,  
  }
});
  
export default instance;
