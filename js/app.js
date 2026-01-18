/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

let gameActive;
let gameInterval;
let timeLeft;
let goodTreatCount;
let badTreatCount;

/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector('.board');
const messageEl = document.querySelector('#message');
const customCursor = document.getElementById('custom-cursor');
const goodTreatDisplay = document.getElementById('good-treat-count');
const badTreatDisplay = document.getElementById('bad-treat-count');
const timerDisplay = document.querySelector('#timer');
const startButtonEl = document.querySelector('#start');
const resetButtonEl = document.querySelector('#reset');


/*-------------------------------- Functions --------------------------------*/

const startGame = () => {
    if(gameActive) 
        return;
    init();
    gameActive = true;
    gameInterval = setInterval(updateTimer, 1000);
    dropTreats();
};

const updateTimer = () => {
    timeLeft--;
    if(timeLeft <= 0) {
        timeLeft = 0;
        updateMessage(`I didn't get enough treats! 😔`);
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
        if(!sourceEl) return;

        const newTreat = sourceEl.cloneNode(true);
            newTreat.removeAttribute('id');
            newTreat.classList.add('falling-treat');
            newTreat.style.display = 'block';

        boardEl.appendChild(newTreat);
    
        const treatWidth = newTreat.offsetWidth;
        const maxX = boardEl.clientWidth - treatWidth;
            newTreat.style.left = `${Math.floor(Math.random() * maxX)}px`;
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
    if(typeof dropInterval !== 'undefined') {
        clearInterval(dropInterval);
    }
    const activeTreats = document.querySelectorAll('.falling-treat');
    activeTreats.forEach(treat => treat.remove());
};

const bark = () => {
    const audio = new Audio('audio/dogBark.mp3');
    audio.play();
};

const howl = () => {
    const audio = new Audio('audio/dogHowl.mp3');
    audio.play();
};

const checkForWin = () => {
    if (goodTreatCount >= 10) {
        updateMessage(`Thank you for all the yummy treats! 🙂`);
        howl();
        endGame();
    }
 };

const checkForLoss = (event) => {
    if(badTreatCount === 3) {
        messageEl.textContent = `I don't want to eat anymore... 🤢`;
        bark();
        endGame();
    }
 };

const checkFinalScore = () => {
    if(goodTreatCount < 10) {
        messageEl.textContent = `I didn't get enough treats! 😔`;
        bark();
    }
    endGame();
};

const updateMessage = (msg) => {
    messageEl.textContent = msg;
}

const render = () => {
    goodTreatDisplay.textContent = ` ${goodTreatCount}`;
    badTreatDisplay.textContent = `${badTreatCount}`;
    timerDisplay.textContent = `${timeLeft} seconds`;
};

const init = () => {
    clearInterval(gameInterval);
    gameActive = false;
    goodTreatCount = 0;
    badTreatCount = 0;
    timeLeft = 60;

    const remainingTreats = document.querySelectorAll('.falling-treat');
        remainingTreats.forEach(t => t.remove());
    updateMessage();
    render();
};

init();

/*----------------------------- Event Listeners -----------------------------*/

startButtonEl.addEventListener('click', startGame);

resetButtonEl.addEventListener('click', init);

boardEl.addEventListener('mousemove', (e) => {
    customCursor.style.display = 'block';
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});

boardEl.addEventListener('mouseleave', () => {
    customCursor.style.display = 'none';
});

