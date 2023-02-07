
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import fetchPhoto from "./API";

const form = document.querySelector(`.search-form`);
const container = document.querySelector(`.gallery`);
const loadBtn = document.querySelector(`.load-more`);
let queryPage;
const per_page = 40;
let inputValue = "";
let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt'
    } );

loadBtn.hidden = true;

form.addEventListener(`submit`, onSubmit);
loadBtn.addEventListener(`click`, onLoadMore);

async function onSubmit(e) {
        e.preventDefault();
        queryPage = 1;
    
        loadBtn.hidden = true;
        clearForm();
              
        const form = e.currentTarget;
        inputValue = form.elements.searchQuery.value.trim();
              
        try {
       const response = await fetchPhoto(inputValue);
      
    if (response.data.hits.length === 0) { 
      loadBtn.hidden = true;
         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
         return;
}

    Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);     
    loadBtn.hidden = false;
      createMarkup(response.data.hits);
      lightbox.refresh();
                      
    } catch (err){
        console.log(err);
  }
}

async function onLoadMore(e) {
  queryPage += 1;

    inputValue = form.elements.searchQuery.value.trim();
  try {

    const response = await fetchPhoto(inputValue, queryPage);
    createMarkup(response.data.hits);
    Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);  
      

    // const count = response.data.totalHits ;
    console.log(response.data.hits.length);
    if (response.data.hits.length <= 0) {
      loadBtn.hidden = true;
      Notiflix.Notify.info('Were sorry, but you ve reached the end of search results.');
      
      // clearForm();
      lightbox.refresh();
    }
  }   
  catch(err) {
        console.log(err);
        // loadBtn.hidden = true;
        // Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`)
    }
      
    }


 function createMarkup(picture) {
      
   const cardList = picture.reduce((acc, {webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return acc + `<div class="photo-card">
     <a href="${largeImageURL}"> <img src=${ webformatURL} alt=${tags} height = 250 loading="lazy" /></a>
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

 container.insertAdjacentHTML(`beforeend`, cardList);

 }

 function clearForm() {
    container.innerHTML = '';
 };


