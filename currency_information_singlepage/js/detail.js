import {fetchData, listInsert, checkCookie} from './common.js';
import {toggleFavs, filterName, viewFavs, renderGeneralList, title} from './list.js'
import {list} from './main.js'


let overlay = 'has-overlay';
let detail = 'currencydetail--show';
let label = 'currencydetail__datasheet-label';
let data = 'currencydetail__datasheet-data';
let detailTitle = document.querySelector('.currencydetail__title');
let detailList = document.querySelector('.js-currencydetail-list');
let element = document.querySelector('.currencydetail__datasheet-row');
let currencyDetail = document.querySelector('.currencydetail');

async function renderDetails(date, currencyCode) {
    let response = await fetchData(date, currencyCode);
    let detailCurrencyList = response[currencyCode];
    document.querySelector('.js-currencydetail-date').value = response.date;
    listInsert(detailList, detailCurrencyList, element, label, data, false);
}


function show() {
    let favDetail = document.querySelector('.js-currencydetail-fav');
    let icon = document.querySelector('.js-currencydetail-fav-icon');
    favDetail.addEventListener('click', toggleFavs);
    document.body.classList.add(overlay);
    currencyDetail.classList.add(detail);

    let currencyName = this.textContent;
    let currencyCode = Object.keys(list).find(key => list[key] === currencyName);
    detailTitle.children[0].innerHTML = currencyCode.toUpperCase();
    detailTitle.children[1].innerHTML = currencyName;
    favDetail.dataset.code = currencyCode;
    favDetail.dataset.name = currencyName;
    if (checkCookie(`${currencyCode}`)){
        icon.src = 'img/ico-fav-selected-outline.svg';
        favDetail.classList.add('active');
    } else {
        icon.src = 'img/ico-fav-outline.svg';
        if (favDetail.classList.contains('active')) favDetail.classList.remove('active');
    } 
    renderDetails('latest', currencyCode);
}


function filterDate() {
    let date = this.value;
    let dateLimit = new Date('2020-11-22');
    let dateParsed = new Date(date);
    let currencyCode = document.querySelector('.js-currencydetail-code').textContent.toLowerCase();
    if (dateLimit.getTime() <= dateParsed.getTime() && dateParsed.getTime() <= new Date().getTime()) {
        renderDetails(date, currencyCode);
    } else {
        renderDetails('latest', currencyCode);
    }
}


function close(triggerEvent) {
    triggerEvent.preventDefault();
    document.body.classList.remove(overlay);
    currencyDetail.classList.remove(detail);
    let code = document.querySelector('.js-search-input').value;
    let event = new Event('filter');

    if (title.innerHTML.includes('Favourites')) viewFavs();
    else if (title.innerHTML.includes('Currencies')) filterName(event, code);
    else renderGeneralList();
}

export {show, filterDate, close};