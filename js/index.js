const container = document.getElementById('app');
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
let prevElements = [];
let count = 0;

function shuffleArr(o) {
    for (let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) ;
    return o;
}

function renderTemplate(data) {
    shuffleArr(data);
    const wrapper = document.createElement('div');
    wrapper.className = "wrapper";
    data.forEach(function (element) {
        console.log(element);
        const gameBlock = document.createElement('div');
        gameBlock.className = "game-block ";
        gameBlock.innerHTML = ` <div class="flip-container">
                                     <div class="flipper"  id="${element.iconId}" data-name="${element.dataName}">
                                        <div class="front">&#9883;</div>
                                       <div class="back">
                                            <img src="${element.iconSrc}" alt="${element.dataName}">
                                       </div>
                                  </div>
                                </div>`;
        wrapper.appendChild(gameBlock);
    });
    container.appendChild(wrapper);
    addEventHandler();
}

function addEventHandler() {
    const el = document.getElementById('app');
    el.addEventListener("click", function (event) {
        if (event.target.classList.contains('front')) {
            event.target.parentNode.className += ' flip-animate';
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
    let currentElement = document.getElementById(prevElements[prevElements.length - 1]);
    let previousElement = document.getElementById(prevElements[prevElements.length - 2]);
    if (prevElements.length > 2) {
        turnEvery();
    } else if (currentElement.getAttribute('data-name') === previousElement.getAttribute('data-name')) {
        currentElement.className += ' hide';
        previousElement.className += ' hide';
        count++;
        if (count === 6) {
            setTimeout(function () {
                alert('You won!');
                location.reload();
                initGame();
            }, 500);
        }
        setTimeout(function () {
            turnEvery();
        }, 500);
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