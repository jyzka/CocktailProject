import {
    data
} from './getData.js'

const container = document.querySelector('.container');
const input = document.querySelector('input')
const drinksData = data();

function showDrinksOnUI(arr) {
    for (let drink of arr) {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const drinkName = document.createElement('h3');
        img.src = drink.strDrinkThumb;
        drinkName.innerHTML = drink.strDrink;
        div.appendChild(drinkName);
        div.appendChild(img);
        container.appendChild(div);
    }
}

function searchFilter(inputVal) {
    const filteredDrinks = [];
    for (let el of drinksData) {
        let nameOfDrinks = el.strDrink.toLowerCase()
        if (nameOfDrinks.includes(inputVal.toLowerCase())) {
            filteredDrinks.push(el)
        }
    }
    return filteredDrinks;
}

function clear() {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

function clickEvent() {
    if (input.value === '') {
        // console.log('input value is empty')
        clear()
        showDrinksOnUI(drinksData)
    } else {
        const inputValue = input.value
        const drinks = searchFilter(inputValue)
        console.log(drinks, '<<<drinks')
        clear()
        showDrinksOnUI(drinks);
    }
}
// input field get triggered
input.addEventListener('keyup', clickEvent)
showDrinksOnUI(drinksData);


// ---------------------------------------------------------------------------------
// Added options
const newArr = [];
const select = document.querySelector('.select');

function addArr() {
    for (let a of drinksData) {
        let categoryName = a.strCategory;
        if (newArr.indexOf(categoryName) === -1) {
            newArr.push(categoryName)
        };
    };

}
addArr();

function addOption() {
    for (let i of newArr) {
        const optn = document.createElement('option');
        optn.text = i;
        optn.value = i;
        select.appendChild(optn);
    }
}
addOption();

select.addEventListener('change', function (event) {
    const val = event.target.value;
    const filtered = drinksData.filter(category => category.strCategory === val);
    clear();
    showDrinksOnUI(filtered);
    if (val === 'Select option') {
        showDrinksOnUI(drinksData)
    };
});
// ---------------------------------------------------------------------------------
// Alcogol and non Alcohol drinks

const alcoBtn = document.querySelector('.alcohol');
const nonAlcoBtn = document.querySelector('.nonAlcohol');
const clearBtn = document.querySelector('.clear')

alcoBtn.addEventListener('click', function (event) {

    const alcoDrink = drinksData.filter((alco) => alco.strAlcoholic === 'Alcoholic')
    clear();
    showDrinksOnUI(alcoDrink)
});

nonAlcoBtn.addEventListener('click', function (event) {
    const nonAlcoDrink = drinksData.filter((non) => non.strAlcoholic === 'Non alcoholic');
    clear();
    showDrinksOnUI(nonAlcoDrink);
});

clearBtn.addEventListener('click', function (event) {
    clear();
    showDrinksOnUI(drinksData)
});
// ---------------------------------------------------------------------------------
// Modal window 
