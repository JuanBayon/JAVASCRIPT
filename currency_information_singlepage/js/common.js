import {show} from './detail.js';
import {toggleFavs} from './list.js';
import {feedback} from './main.js';

let listEmpty = 'The list is empty';

async function fetchData(date, currency) {
    let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies`;
    if (currency !== undefined) {
        url += `/${currency}.json`;
    } else {
        url += '.json';
    }
    let request = await fetch(url);
    let textResponse = await request.text();
    return JSON.parse(textResponse);
}

function checkCookie(cokieName) {
    let name = cokieName.trim().toUpperCase() + "=";
    let cookieList = decodeURIComponent(document.cookie).split(';');
    for(let i = 0; i <cookieList.length; i++) {
        if (cookieList[i].trim().indexOf(name) === 0) {
            return true;
        }
    }
    return false;
}

function listInsert(list, currencyList, node, codeElement, nameElement, hasLink) {
    let fragment = new DocumentFragment();
    let keys = Object.keys(currencyList);
    if (keys.length > 0 && keys[0] !== '') {
        for (const [key, value] of Object.entries(currencyList)) {
            let toInsert = node.cloneNode(true);
            toInsert.querySelector('.' + codeElement).innerHTML = key.toUpperCase();
            toInsert.dataset.code = key.toUpperCase();
            if (hasLink){
                let linkInside = toInsert.querySelector('.link');
                linkInside.innerHTML = value;
                linkInside.addEventListener('click', show);
                let fav = toInsert.querySelector('.js-item-fav');
                let icon = toInsert.querySelector('.link__icon');
                if (checkCookie(`${key}`)) {
                    icon.children[0].src = 'img/ico-fav-selected-outline.svg';
                    fav.classList.add('active');
                } else {
                    icon.children[0].src = 'img/ico-fav-outline.svg';
                }
                fav.addEventListener('click', toggleFavs);
                fav.dataset.code = key.toUpperCase();
                fav.dataset.name = value;
            } else {
                toInsert.querySelector('.' + nameElement).innerHTML = value;
            }
            fragment.append(toInsert);
        };
    } else {
        let p = document.createElement('p');
        p.innerHTML = listEmpty;
        fragment.appendChild(p);
    }
    list.innerHTML = "";
    list.appendChild(fragment);
}

export {fetchData, listInsert, checkCookie};