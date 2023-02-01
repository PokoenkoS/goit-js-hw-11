import axios from "axios";
import Notiflix from 'notiflix';

const API_KEY = `33261865-905999929b5f445e8a29b592f`;
const form = document.querySelector(`.search-form`);
const btn = document.querySelector(`button`);
const input = document.querySelector('[name="searchQuery"]');
const container = document.querySelector(`.gallery`);

form.addEventListener(`submit`, onSubmit);

function fetchPhoto (name) {
    const url = axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo`)
    
    return url;
     }

 function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.searchQuery.value.trim();
    
    fetchPhoto(inputValue).then(res => createMarkup(res.data.hits))
   
 };

 function createMarkup(picture) {
    const cardList = picture.reduce((acc, {webformatURL, tags, likes, views, comments, downloads}) => {
    return acc + `
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" width = 300 loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: '${likes}'</b>
        </p>
        <p class="info-item">
          <b>Views: '${views}'</b>
        </p>
        <p class="info-item">
          <b>Comments: '${comments}'</b>
        </p>
        <p class="info-item">
          <b>Downloads: '${downloads}'</b>
        </p>
      </div>
    </div> `
 })
 console.log(cardList);
 return container.innerHTML = cardList;
 }
