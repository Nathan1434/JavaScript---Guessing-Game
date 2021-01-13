'use strict';

//DOM Cache
const mainDiv = document.querySelector('.main');

const compNumber_div = document.getElementById('comp-number');
const userNumber_Input = document.getElementById('user-number');

const input_Btn = document.querySelector('.input-btn');
const attempt_div = document.querySelector('.result');

const hisContainer = document.querySelector('.history--container');
const history_div = document.querySelector('.history');
const history_btn = document.querySelector('.history--btn');

const new_game_div = document.querySelector('.btn-new');

// Functions
function setupEventListeners() {
    userNumber_Input.addEventListener('keypress', (event) => {
        if (isPlaying) {
            if (event.key === 'Enter') {
                setTimeout(() => {
                    userNum = parseInt(userNumber_Input.value);
                    compare(userNum, computerNumber);
                    userNumber_Input.value = '';
                    userNumber_Input.focus();
                }, 50);
            }
        }
    });

    input_Btn.addEventListener('click', () => {
        if (isPlaying) {
            setTimeout(() => {
                userNum = parseInt(userNumber_Input.value);
                compare(userNum, computerNumber);
                userNumber_Input.value = '';
                userNumber_Input.focus();
            }, 50);
        }
    });

    history_btn.addEventListener('click', toggleHistory);

    new_game_div.addEventListener('click', startGame);
}

function compare(userNumber, compNumber) {
    if (userNumber < compNumber) {
        attempt_div.innerText = `Higher🔼`;
        attempt++;
        addHistory();
    } else if (userNumber > compNumber) {
        attempt_div.innerText = `Lower🔽`;
        attempt++;
        addHistory();
    } else if (userNumber === compNumber) {
        isPlaying = false;
        compNumber_div.innerHTML = compNumber;
        attempt_div.innerText = `You got it right. It took ${attempt} tr${attempt == 1 ? 'y' : 'ies'}.`;
        hisContainer.classList.add('history__hidden');
        history_btn.textContent = '<';
    }
}

function addHistory() {
    // 1. Add history element
    let previousEntry = `<p class="history-p" id="history-${attempt}">${userNum} - ${attempt_div.innerText}</p>`;
    history_div.insertAdjacentHTML('beforeend', previousEntry);

    // 2. Scroll history element into view
    hisContainer.classList.remove('history__hidden');
    history_btn.textContent = '>';
    const observer = new IntersectionObserver(
        () => {
            setTimeout(() => {
                document.getElementById(`history-${attempt}`).scrollIntoView({behavior: 'smooth'});
            }, 250);
        },
        {root: mainDiv, threshold: 1}
    );
    observer.observe(hisContainer);
}

function clearHistory() {
    // 1. Select all <p> elements in the history div
    var allHistory = document.querySelectorAll('.history-p');

    // 2. Delete all the <p> elements
    for (const el of allHistory) {
        el.remove();
    }
}
function toggleHistory() {
    if (hisContainer.classList.contains('history__hidden')) {
        hisContainer.classList.remove('history__hidden');
        history_btn.textContent = '>';
    } else {
        hisContainer.classList.add('history__hidden');
        history_btn.textContent = '<';
    }
}

function startGame() {
    computerNumber = Math.round(Math.random() * 100) + 1;
    isPlaying = true;
    attempt = 0;

    userNumber_Input.value = '';
    attempt_div.textContent = '';
    compNumber_div.textContent = '???';
    hisContainer.classList.add('history__hidden');
    history_btn.textContent = '<';

    clearHistory();

    onload = userNumber_Input.focus();
    setupEventListeners();
}

//Variables
let userNum, computerNumber;
let isPlaying = true;
let attempt;

// Game Start
startGame();
