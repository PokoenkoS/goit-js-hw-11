import axios from "axios";
import Notiflix from 'notiflix';

const API_KEY = `33261865-905999929b5f445e8a29b592f`;
const form = document.querySelector(`.search-form`);
const container = document.querySelector(`.gallery`);
const loadBtn = document.querySelector(`.load-more`);
let queryPage = 1;
let inputValue = "";

loadBtn.hidden = true;

form.addEventListener(`submit`, onSubmit);
loadBtn.addEventListener(`click`, onLoadMore);


function fetchPhoto (name) {
    const url = axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo&page=${queryPage}&per_page=40`);
    
    return url;
   }
  
 function onSubmit(e) {
    e.preventDefault();
    loadBtn.hidden = true;
    clearForm();
   
    const form = e.currentTarget;
    inputValue = form.elements.searchQuery.value.trim();
   
    queryPage = 1;      
    fetchPhoto(inputValue)
    .then((res) => {
        console.log(res);
        if (res.data.hits.length ===0){
            Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.')
        }
        createMarkup(res.data.hits)
        loadBtn.hidden = false;
     })
    .catch(error => {
   
    })
   };

function onLoadMore() {
    queryPage += 1;
    inputValue = form.elements.searchQuery.value.trim();
    fetchPhoto(inputValue)
    .then((res) => createMarkup(res.data.hits))
    .catch(error => {
   
    })
}

function clearForm() {
    container.innerHTML = '';
   
}

function createMarkup(picture) {
    
    const cardList = picture.reduce((acc, {webformatURL, tags, likes, views, comments, downloads}) => {
    return acc + `<div class="photo-card">
      <img src=${webformatURL} alt=${tags} height = 250 loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${downloads}</b>
        </p>
      </div>
    </div> `
 },"" )

 return container.insertAdjacentHTML(`beforeend`, cardList);
 }