import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = `https://pixabay.com/api/`
const API_KEY = `33261865-905999929b5f445e8a29b592f`;
const form = document.querySelector(`.search-form`);
const container = document.querySelector(`.gallery`);
const loadBtn = document.querySelector(`.load-more`);
let queryPage = 1;
let inputValue = "";
var lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
    } );

loadBtn.hidden = true;

form.addEventListener(`submit`, onSubmit);
loadBtn.addEventListener(`click`, onLoadMore);

 function onSubmit(e) {
    e.preventDefault();
    loadBtn.hidden = true;
    clearForm();
   
    const form = e.currentTarget;
    inputValue = form.elements.searchQuery.value.trim();
   
    queryPage = 1;      
    fetchPhoto(inputValue)
    .then((res) => {
     
        if (res.data.hits.length === 0){
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            return;
        } 
        
        Notiflix.Notify.success(`Hooray! We found ${res.data.totalHits} images.`)
        createMarkup(res.data.hits)
        loadBtn.hidden = false;
     })
   };

function onLoadMore() {
    queryPage += 1;
    inputValue = form.elements.searchQuery.value.trim();
    fetchPhoto(inputValue)
    .then((res) => {
      createMarkup(res.data.hits)
      .then(res => refresh(res));
    
    })
    .catch(error => {
        loadBtn.hidden = true;
        Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`)
    })
}

async function fetchPhoto (name) {
    const url = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo&page=${queryPage}&per_page=40`);
    
    return url;
   }

async function createMarkup(picture) {
    
    const cardList = await picture.reduce((acc, {webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return acc + `<div class="photo-card">
     <a href="${webformatURL}"> <img src=${largeImageURL} alt=${tags} height = 250 loading="lazy" /></a>
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

 function clearForm() {
    container.innerHTML = '';
 };
