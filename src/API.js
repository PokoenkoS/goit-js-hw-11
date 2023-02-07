import axios from "axios";
const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `33261865-905999929b5f445e8a29b592f`;

export default async function fetchPhoto (name, queryPage = 1, per_page=180) {
    const url = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo&page=${queryPage}&per_page=${per_page}`);
    
    return url;
   }
   