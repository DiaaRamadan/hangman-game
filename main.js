
// letters
const letters = 'abcdefghijklmnopqrstuvwxyz';
const lettersArray = Array.from(letters);

const lettersCtrl = document.querySelector('.letters');

lettersArray.forEach(letter => {

    // create span
    const span = document.createElement('span');
    span.className = 'letter-box';
    // create text node
    const spanText = document.createTextNode(letter);
    span.appendChild(spanText);

    lettersCtrl.appendChild(span);
});


// Words

const words = {

   programing: ['php', 'javascript', 'go', 'scala', 'fortran', 'r', 'mysql', 'python'],
   movies: ['Prestige', 'Inception', 'Parasite', 'interstellar', 'Whiplash', 'Memento', 'Coco', 'Up'],
   countries: ['Syria test', 'Palestine', 'Yemen test', 'Egypt', 'Bahrain', 'Iraq'],

};

const wordsKeys = Object.keys(words);
const randomKey = Math.floor(Math.random() * wordsKeys.length);
const randomWord = wordsKeys[randomKey];
const randomValueNumber = Math.floor(Math.random() * randomWord.length);
const randomArrayValues =words[randomWord];
const randomWordValue = randomArrayValues[randomValueNumber];

// set category
document.querySelector('.game-info .category span').innerHTML = randomWord;


// letters guess
const lettersGuessContainer = document.querySelector('.letters-guess');

const wordLettersArray = Array.from(randomWordValue);

wordLettersArray.forEach(letter => {

    const span = document.createElement('span');
    
    if(letter === ' '){
        span.className = 'with-space';
    }

    lettersGuessContainer.appendChild(span);
});


const guessSpans = document.querySelectorAll('.letters-guess span');
let wrongAttempts = 0;
let correctAttemps = 0;
const theDraw = document.querySelector('.hangman-draw');


function endGame(type){

    // create popup

    const div = document.createElement('div');

    // button 
    const btn = document.createElement('button');
    btn.className = 'play-again';
    const btnText = document.createTextNode('Play again');
    btn.appendChild(btnText);
    let text;
    // create text node
    if(type == 0){
         text = document.createTextNode(`Game Over, The word is ${randomWordValue}`);
    }else{
         text = document.createTextNode(`Success, You won`);
    }
    

    div.appendChild(text);
    div .appendChild(btn);
    div.className = 'popup';
    document.body.appendChild(div);


}

// click on letters spans
document.addEventListener('click', e => {
    
    let chooseStatus = false;
    const target = e.target;
    if(target.className === 'letter-box'){
        target.classList.add('clicked');
        
        const theLetterValue = target.innerHTML.toLowerCase();
        wordLettersArray.forEach((wordletter, wordIndex) => {
            if(wordletter.toLowerCase() === theLetterValue){

                chooseStatus = true;

                guessSpans.forEach((span, spanIndex) => {
                    if(wordIndex === spanIndex){
                        span.innerHTML = theLetterValue;
                    }
                });
            }
        });
    }

   // if choose wrong letters
   if(chooseStatus !== true){
       wrongAttempts++;
       theDraw.classList.add(`wrong-${wrongAttempts}`);

       if(wrongAttempts === 8){
           endGame(0);
           lettersCtrl.classList.add('finished');
       }
   }else {
    correctAttemps++;
    if(correctAttemps === randomWordValue.length){
         endGame(1);
    }
}
});

document.addEventListener('click', (e) => {
    if(e.target.className === 'play-again'){
        window.location.reload();
    }

});