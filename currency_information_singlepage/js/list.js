import {listInsert, checkCookie} from './common.js';
import {list, title, feedback} from './main.js';

let notAvilable = 'There are no result availables with the search criteria';
let noLength = 'Search tearm should be at least 3 chars length';
let completeList = document.querySelector('.js-currencylist');
let currencyItem = document.querySelector('.js-currency-item');
let search = document.querySelector('.js-search-input');
let itemCode = 'currencylist__item-code';
let itemName = 'currencylist__item-name';


function renderGeneralList() {
    document.cookie = 'ACTIVESEARCH=; expires=Thu,01 Jan 1970 00:00:00 GMT; path=/'
    feedback.innerHTML = '';
    listInsert(completeList, list, currencyItem, itemCode, itemName, true);
    title.innerHTML = `${Object.keys(list).length} currencies`;
    search.value = '';
}

// SEARCH ---------------------------------

function filterName(event, code) {
    event.preventDefault();
    let input = code || this.value;
    input = input.toLowerCase();
    if (input.length >= 3) {
        document.cookie = 'ACTIVESEARCH=done; expires=Thu,01 Jan 2050 00:00:00 GMT; path=/; secure';
        feedback.innerHTML = '';
        let filteredList = {};
        for (const [key, value] of Object.entries(list)) {
            if (key === input) filteredList[key] = value;
            else if (value.toLowerCase().includes(input)) filteredList[key] = value;
        }
        listInsert(completeList, filteredList, currencyItem, itemCode, itemName, true);
        title.innerHTML = `Currencies with: ${search.value}`;
        if (Object.keys(filteredList).length === 0) feedback.innerHTML = notAvilable;
    } else {
        if (input === '') {
            renderGeneralList();
            document.cookie = 'ACTIVESEARCH=; expires=Thu,01 Jan 1970 00:00:00 GMT; path=/';
        } else if (checkCookie('ACTIVESEARCH')){
            feedback.innerHTML = noLength;
        }
    }
}

// FAVS ------------------------------------

function toggleFavs(event) {
    event.preventDefault();
    if (this.classList.contains('active')) {
        this.children[0].children[0].src = 'img/ico-fav-outline.svg';
        document.cookie = `${this.dataset.code.toUpperCase()}=; expires=Thu,01 Jan 1970 00:00:00 GMT; path=/`;
        this.classList.remove('active');
        if (title.innerHTML.includes('Favourites')) viewFavs(); 
    } else {
        this.children[0].children[0].src = 'img/ico-fav-selected-outline.svg';
        document.cookie = `${this.dataset.code.toUpperCase()}=${this.dataset.name}; expires=Thu,01 Jan 2050 00:00:00 GMT; path=/; secure`;
        this.classList.add('active');
    }
}

function viewFavs() {
    document.cookie = 'ACTIVESEARCH=; expires=Thu,01 Jan 1970 00:00:00 GMT; path=/'
    feedback.innerHTML = '';
    let favsList = {};
    for (let entrance of document.cookie.split(';')) {
        entrance = entrance.split('=');
        if (entrance[0].toLowerCase() !== 'csrftoken') favsList[entrance[0]] = entrance[1];
    }
    listInsert(completeList, favsList, currencyItem, itemCode, itemName, true);
    title.innerHTML = 'Favourites list';
    search.value = '';
}

export {filterName, toggleFavs, viewFavs, renderGeneralList, title};