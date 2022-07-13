import {fetchData} from './common.js'
import {filterDate, close} from './detail.js'
import {filterName, viewFavs, renderGeneralList} from './list.js'

let list = await fetchData('latest');
let title = document.querySelector('.js-results-title');
let feedback = document.querySelector('.js-search-feedback');
document.querySelector('.js-currencydetail-close').addEventListener('click', close); 
document.querySelector('.js-currencydetail-date').addEventListener('input', filterDate);
document.querySelector('.js-favs').addEventListener('click', viewFavs);
document.querySelector('.js-search-input').addEventListener('input', filterName);
document.querySelector('.js-clear-btn').addEventListener('click', renderGeneralList);
document.querySelector('.js-search-input').addEventListener('input', filterName);
renderGeneralList();

export {list, title, feedback};