const grid = document.querySelector('.grid');
const SpanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const characters = [
    '-deidara', '-hidan', '-itachi', '-kakuzo-', '-kisame', '-konan', 'obito', '-pain', '-sasori-', 'zetsu',
];

const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    return element;
}
let soma = 0;
let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    soma = soma + 1;
    const disabledCards = document.querySelectorAll('disabled-card');
    if (disabledCards.length == 20) {
        clearInterval(this.loop);
    }

    if (soma == 10)
        alert(`Parabéns,${SpanPlayer.innerHTML}! Seu Tempo Foi:  ${timer.innerHTML}  Seg`);
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);



    }
}

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard == '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }


}

const createCard = (character) => {


    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', ' face back');

    front.style.backgroundImage = `url('imagens/${character}.png')`;


    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character)

    return card;
}

const loadGame = () => {

    const duplicatecharacters = [...characters, ...characters]

    const shuffledArray = duplicatecharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);

    });
}

const StartTimer = () => {


    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {
    SpanPlayer.innerHTML = localStorage.getItem('player');
    StartTimer();
    loadGame();

}