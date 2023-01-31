const API_KEY = `33254563-88689a1e5b2205132ba5023e4`;

const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

// `https://pixabay.com/api/?key=33254563-88689a1e5b2205132ba5023e4&q=yellow+flowers&image_type=photo`

export default function fetchCountries (name) {
    const url = `${instance.baseURL}?key=${API_KEY}q=image_type=photo&orientation=horizontal&safesearch=true`
    

return fetch(instance).then(response => {
        if (!response.ok) {
           throw new Error('Упс', response.status);
           
        }
      
          return response.json();
       })



    // return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    // .then(response => {
    //     if (!response.ok) {
    //        throw new Error('Упс', response.status);
           
    //     }
      
    //       return response.json();
    //    })
     }