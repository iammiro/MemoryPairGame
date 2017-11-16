const container = document.getElementById('app');

let prevElements = [];

const data = [
    {iconId: 1, dataName: 'blueberries', iconSrc: 'img/blueberries.svg'},
    {iconId: 2, dataName: 'blueberries', iconSrc: 'img/blueberries.svg'},
    {iconId: 3, dataName: 'cherries', iconSrc: 'img/cherries.svg'},
    {iconId: 4, dataName: 'cherries', iconSrc: 'img/cherries.svg'},
    {iconId: 5, dataName: 'lime', iconSrc: 'img/lime.svg'},
    {iconId: 6, dataName: 'lime', iconSrc: 'img/lime.svg'},
    {iconId: 7, dataName: 'orange', iconSrc: 'img/orange.svg'},
    {iconId: 8, dataName: 'orange', iconSrc: 'img/orange.svg'},
    {iconId: 9, dataName: 'pear', iconSrc: 'img/pear.svg'},
    {iconId: 10, dataName: 'pear', iconSrc: 'img/pear.svg'},
    {iconId: 11, dataName: 'pumpkin', iconSrc: 'img/pumpkin.svg'},
    {iconId: 12, dataName: 'pumpkin', iconSrc: 'img/pumpkin.svg'}
];

function shuffleArr(o) {
    for (let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) ;
    return o;
}

function renderTemplate(data) {
    shuffleArr(data);
    for (let i = 0; i < data.length; i++) {
        let dataName = data[i].dataName;
        let iconSrc = data[i].iconSrc;
        let iconId = data[i].iconId;
        const gameBlock = document.createElement('div');
        gameBlock.className = "game-block ";
        gameBlock.className += dataName;
        gameBlock.innerHTML = ` <div class="flip-container">
                                    <div class="flipper ${dataName}"  id="${iconId}" data-name="${dataName}" onclick="clickHandler()">
                                        <div class="front"></div>
                                        <div class="back">
                                             <img src="${iconSrc}" alt="${dataName}">
                                        </div>
                                    </div>
                                </div>`;
        container.appendChild(gameBlock);
    }
}

function initGame() {
    renderTemplate(data);
    prevElements.length = 0;
}

function clickHandler() {
    event.target.parentNode.className += ' flip-animate';
    if (event.target.parentNode.id) {
        prevElements.push(event.target.parentNode.id);
        console.log(prevElements);
        hideDuplicate();
        if (prevElements.length > 2) {
            //TODO left 2 cards
            turnEvery();
        }
    }
}

function hideDuplicate() {
    for (let i = 0; i < 1; i++) {
        let currentElement = document.getElementById(prevElements[prevElements.length - 1]).getAttribute('data-name');
        let previousElement = document.getElementById(prevElements[prevElements.length - 2]).getAttribute('data-name');
        if (currentElement === previousElement) {
            document.getElementById(prevElements[prevElements.length - 2]).className += ' hide';
            document.getElementById(prevElements[prevElements.length - 1]).className += ' hide';
            console.log(prevElements);
            setTimeout(function () {
                turnEvery();
            }, 1000);
        }
    }
}

function turnEvery() {
    for (let i = 0; i < prevElements.length - 1; i++) {
        document.getElementById(prevElements[i]).classList.remove("flip-animate");
    }
    prevElements.splice(0, prevElements.length - 1);
    console.log(prevElements);
}

initGame();