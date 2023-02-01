import axios from "axios";
import Notiflix from 'notiflix';

const API_KEY = `33261865-905999929b5f445e8a29b592f`;
const form = document.querySelector(`.search-form`);
const btn = document.querySelector(`button`);
const input = document.querySelector('[name="searchQuery"]');
const container = document.querySelector(`.gallery`);
const loadBtn = document.querySelector(`.load-more`);
let page = 1;

loadBtn.hidden = true;

form.addEventListener(`submit`, onSubmit);
loadBtn.addEventListener(`click`, onLoadMore);
input.addEventListener(`input`, onInput);

function fetchPhoto (name) {
    const url = axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo&page=1&per_page=40`);
    
    return url;
   }

 function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const inputValue = form.elements.searchQuery.value.trim();
    loadBtn.hidden = true;
   
    
    fetchPhoto(inputValue)
    .then(res => createMarkup(res.data.hits))
    .then((res) => {
        if (res = []){
            return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
        } if (res.totalHits === 0) {
            return Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`) 
        }
    })
    .catch(error => {
        clearForm();
      
    })
    loadBtn.hidden = false;
 };

 function createMarkup(picture) {
    
    const cardList = picture.reduce((acc, {webformatURL, tags, likes, views, comments, downloads}) => {
    return acc + `<div class="photo-card">
      <img src=${webformatURL} alt=${tags} width = 300 loading="lazy" />
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
 console.log(cardList);
 return container.insertAdjacentHTML(`afterbegin`, cardList);
 }
function onLoadMore() {
    page += 1;
    fetchPhoto().then((res) =>{
        createMarkup(res.data.hits)
        page += 1;
    }) 
}
function clearForm() {
    container.innerHTML = '';
   
}

