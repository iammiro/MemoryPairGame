const container = document.getElementById('app');

let prevElements = [];

let count = 0;

const data = [
    {iconId: 1, dataName: 'blueberries', iconSrc: 'img/atom.svg'},
    {iconId: 2, dataName: 'blueberries', iconSrc: 'img/atom.svg'},
    {iconId: 3, dataName: 'cherries', iconSrc: 'img/dna-structure.svg'},
    {iconId: 4, dataName: 'cherries', iconSrc: 'img/dna-structure.svg'},
    {iconId: 5, dataName: 'lime', iconSrc: 'img/earth.svg'},
    {iconId: 6, dataName: 'lime', iconSrc: 'img/earth.svg'},
    {iconId: 7, dataName: 'orange', iconSrc: 'img/earth-globe.svg'},
    {iconId: 8, dataName: 'orange', iconSrc: 'img/earth-globe.svg'},
    {iconId: 9, dataName: 'pear', iconSrc: 'img/flasks.svg'},
    {iconId: 10, dataName: 'pear', iconSrc: 'img/flasks.svg'},
    {iconId: 11, dataName: 'pumpkin', iconSrc: 'img/molecular.svg'},
    {iconId: 12, dataName: 'pumpkin', iconSrc: 'img/molecular.svg'}
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
                                     <div class="flipper"  id="${iconId}" data-name="${dataName}">
                                        <div class="front">&#9883;</div>
                                       <div class="back">
                                            <img src="${iconSrc}" alt="${dataName}">
                                       </div>
                                  </div>
                                </div>`;
        container.appendChild(gameBlock);
    }
    eventHandler();
}

function eventHandler() {
    const el = document.getElementById('app');
    el.addEventListener("click", function (e) {
        if (e.target.classList.contains('front')) {
            let theTarget = event.target.parentNode;
            theTarget.className += ' flip-animate';
            console.log(event);
            if (event.target.parentNode.id) {
                prevElements.push(event.target.parentNode.id);
                if (prevElements.length > 1) {
                    hideDuplicate();
                }
            }
        }
    })
}

function hideDuplicate() {
    let currentElement = document.getElementById(prevElements[prevElements.length - 1]).getAttribute('data-name');
    let previousElement = document.getElementById(prevElements[prevElements.length - 2]).getAttribute('data-name');
    if (prevElements.length > 2) {
        turnEvery();
    } else if (currentElement === previousElement) {
        document.getElementById(prevElements[prevElements.length - 1]).className += ' hide';
        document.getElementById(prevElements[prevElements.length - 2]).className += ' hide';
        count++;
        if (count === 6) {
            setTimeout(function () {
                alert('Tou win!');
                location.reload();
                initGame();
            }, 500);
        }
        turnEvery();
        prevElements.length = 0;
    }
}

function turnEvery() {
    for (let i = 0; i < prevElements.length - 1; i++) {
        document.getElementById(prevElements[i]).classList.remove("flip-animate");
    }
    prevElements.splice(0, prevElements.length - 1);
}

function initGame() {
    renderTemplate(data);
    prevElements.length = 0;
    count = 0;
}

initGame();