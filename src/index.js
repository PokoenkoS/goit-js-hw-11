import axios from "axios";
import Notiflix from 'notiflix';
import fetchPhoto from`./`

// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });

const form = document.querySelector(`.search-form`);
const btn = document.querySelector(`button`);
const input = document.querySelector('[name="searchQuery"]');
console.log(input);

form.addEventListener(`submit`, onSubmit);

 function onSubmit(e) {
    e.preventDefault();
    const form = input.value;
   
 };
