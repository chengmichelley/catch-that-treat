/*-------------------------------- Constants --------------------------------*/


const player = [];
const win = [];
const loss = [];
const tennisBalls = [];


/*---------------------------- Variables (state) ----------------------------*/

let board;
let gameActive;
let gameInterval;
let startTime;
let timeLeft;
let goodTreatCount;
let badTreatCount;
let treat;
let treatID;

class Treat {
    constructor(type, name) {
        this.type = type || 'good';
        this.name = name;
    }
}

const milkBone = new Treat('good', 'Milkbone');
const iceCreamCone = new Treat('good', 'Ice Cream Cone');
const broccoli = new Treat('bad', 'Broccoli');
const apple = new Treat('bad', 'Apple');

let goodTreats = [milkBone, iceCreamCone];

let badTreats = [broccoli, apple];

/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector('.board');

const squareEls = document.querySelectorAll('.square');

const treatEls = document.querySelectorAll('.treat');

const messageEl = document.querySelector('.message');

const goodTreatDisplay = document.getElementById('good-treat-count');

const badTreatDisplay = document.getElementById(`bad-treat-count`);

const timerDisplay = document.querySelector('#timer');

const startButtonEl = document.querySelector('#start');

const resetButtonEl = document.querySelector('#reset');


/*-------------------------------- Functions --------------------------------*/

const startGame = () => {
    if(gameActive) 
        return;
    init();
    gameActive = true;
    gameInterval = setInterval(() => {
        updateTimer();
    }, 1000);
    dropTreats();
};

const updateTimer = () => {
    timeLeft--;
    if(timeLeft === 0) {
        timeLeft = 0;
        updateMessage(`Time's up!`);
        endGame();
    }
    render();
};

const dropTreats = () => {
    const treatIds = ['milkBone', 'iceCreamCone', 'broccoli', 'apple'];

    const dropInterval = setInterval(() => {
        if(!gameActive) {
            clearInterval(dropInterval);
            return;
        };
        const randomId = treatIds[Math.floor(Math.random() * treatIds.length)];
        const sourceEl = document.getElementById(randomId);
        const newTreat = sourceEl.cloneNode(true);

        newTreat.removeAttribute('id');
        newTreat.style.display = 'block';
    
        const maxX = boardEl.clientWidth - 50;
        newTreat.style.left = `${Math.floor(Math.random() * maxX)}px`;
        boardEl.appendChild(newTreat);

        newTreat.addEventListener('click', () => {
            if(!gameActive) return;
            if(randomId === 'milkBone' || randomId === 'iceCreamCone') {
                goodTreatCount++;
            } else {
                badTreatCount++;
            } 
            newTreat.remove();
            render();
            checkForWin();
            checkForLoss();
        })
        newTreat.addEventListener('animationend', () => newTreat.remove());
    }, 1000);
};

const removeTreats = (el) => {
    el.classList.remove('treat', ...Treat);
    el.textContent = '';
};

const endGame = () => {
    gameActive = false;
    clearInterval(gameInterval);
};

const bark = () => {
    console.log('Bark!');
    //add audio of puppy bark
};

const howl = () => {
    console.log('Awooo!');
    //add audio of puppy howl
};

// const bounceTennisBalls = () => {
//     console.log('bounceTennisBalls'); 
// }; add animation to bounce balls

const checkForWin = () => {
    if (goodTreatCount >= 10) {
        updateMessage(`Thank you for all the yummy treats!`);
        howl();
        endGame();
    }
 };

const checkForLoss = (event) => {
    const clickedEl = event.target;
    if(badTreatCount === 3) {
        messageEl.textContent= `I don't want to eat anymore...`;
        bark();
        endGame();
    }
 };

const checkFinalScore = () => {
    if(goodTreatCount < 10) {
        messageEl.textContent= `I didn't get enough treats!`
        bark();
    }
    endGame();
};

const updateMessage = (msg) => {
    messageEl.textContent = msg;
}

const render = () => {
    goodTreatDisplay.textContent = `Good Treats: ${goodTreatCount}`;
    badTreatDisplay.textContent = `Bad Treats: ${badTreatCount}`;
    timerDisplay.textContent = timeLeft;
};
const init = () => {
    board = Array(25).fill('');
    goodTreatCount = 0;
    badTreatCount = 0;
    timeLeft = 60;
    gameActive = false;
    render();
};

init();

/*----------------------------- Event Listeners -----------------------------*/

startButtonEl.addEventListener('click', startGame);

resetButtonEl.addEventListener('click', init);

