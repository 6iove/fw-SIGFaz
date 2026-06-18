//cria uma instancia 
import axios from 'axios';

const apiSigfaz = axios.create({
 baseURL: 'http://localhost:8000'
});

export default apiSigfaz;