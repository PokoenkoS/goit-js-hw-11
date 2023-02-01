import axios from "axios";
const API_KEY = `33261865-905999929b5f445e8a29b592f`;



export default function fetchPhoto (name) {

    const url = axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo`)
    
    return url;
      //  return fetch(url).then(response => {
      //   if (!response.ok) {
      //      throw new Error('Упс', response.status);
           
      //   }
      
      //     return response.json();
      //     console.log(response);
      //  })


     }