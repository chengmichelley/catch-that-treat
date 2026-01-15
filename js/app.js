/*-------------------------------- Constants --------------------------------*/


const player = [];
const win = [];
const lose = [];
const tennisBalls = [];
const milkBone = [];
const iceCreamCone = [];
const broccoli = [];
const apple = [];

// Define constants and variables.
// Player will be Milo the puppy 
// cursor will be an animation of a dog 
// Will click a button to start game.
// Countdown 3,2,1
// Various treats will drop randomly for 1 minute from the top of the page.
// Good treats will be milk bones & ice cream cones
// Bad treats will be healthy foods like broccoli & apples
// Objective will be to collect 10 good treats in 1 minute.
// If too many bad treats(3) are collected(clicked) Milo will be upset and bark.Resulting in losing and game over.
// If not enough good treats(10) are collected(clicked) in one minute Milo will be upset and bark.Resulting in losing and game over.
// If enough treats are collected in one minute, Milo will be happy and he will howl.Resulting in game win.Tennis balls will bounce around. 
// After game over player can restart and play again. 

/*---------------------------- Variables (state) ----------------------------*/

let board;
let startTime;
let timeLimit;
let goodTreatCount;
let badTreatCount;

let goodTreats = [milkBone, iceCreamCone];

let badTreats = [broccoli, apple];

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.square');

const messageEl = document.querySelector('.message');

const goodTreatDisplay = document.getElementById('good-treat-count');

const badTreatDisplay = document.getElementById('bad-treat-count');

const startButtonEl = document.querySelector('#start');

const resetButtonEl = document.querySelector('#reset');


/*-------------------------------- Functions --------------------------------*/

const bark = () => {
    console.log('Bark!');
    //add audio of puppy bark
};

const howl = () => {
    console.log('Awooo!');
    //add audio of puppy howl
};

const checkForWin = (event) => {
    const clickedEl = event.target;
    if (goodTreatCount === 10) {
            updateMessage(`Thank you for all the yummy treats!`);
            howl();
    }
 };

 const checkForLose = (event) => {
    const clickedEl = event.target;
    if (
        badTreatCount === 3 || 
        goodTreatCount < 10) {
            updateMessage(`I don't want to eat anymore...`);
            bark();
    }
 };

// const updateBoard = () => {
//     board.forEach((cell,idx) => {
//         squareEls[idx].textContent = cell;
//     })
// };

const updateMessage = () => {
    textContent(`Good treats: ${goodTreatCount} Bad treats: ${badTreatCount}`)
};

const render = () => {
    updateBoard();
    goodTreatDisplay.textContent = goodTreatCount;
    badTreatDisplay.textContent = badTreatCount;
};

const handleClick = (event) => {
    const clickedEl = event.target;
    if (clickedEl.classList.contains(goodTreats)) {
        goodTreatCount++;
        goodTreatDisplay.textContent = goodTreatCount;
    } else if (clickedEl.classList.contains(badTreats)) {
        badTreatCount++;
        badTreatDisplay.textContent = badTreatCount;
    } else {
        return;
    }

    checkForWin(event);
    checkForLose(event);
    render();
};

// const init = () => {
//     board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',]
//     render();
// };

// init();

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
});

// startButtonEl.addEventListener('click', init);

// resetButtonEl.addEventListener('click', init);

