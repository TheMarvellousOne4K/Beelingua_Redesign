let isCorrect = false;
let allowInput = true;
const correctAnswer = ["你", "好", "吗"];
const answerBox = document.getElementById("answerBox");
const wordBank = document.getElementById("wordBank");

let userAnswer = [];

wordBank.addEventListener("click", function (e) {
    if (e.target.classList.contains("word-tile")) {
        if(!allowInput){
            return;
        }
        const word = e.target.textContent;

       
        if (userAnswer.includes(word)) {
            return;
        }

        
        const tile = document.createElement("button");
        tile.classList.add("word-tile", "filled");
        tile.textContent = word;
        e.target.classList.add('disabled');
        tile.addEventListener("click", function () {
            if(!allowInput){
                return;
            }
            e.target.classList.remove('disabled');
            answerBox.removeChild(tile);
            userAnswer = userAnswer.filter(w => w !== word);
        });

        answerBox.appendChild(tile);
        userAnswer.push(word);
    }
});


function checkAnswer(isCorrect) {
    const button = document.getElementById("checkButton");
    if (isCorrect) {
        showSpeechBubble("Great job!");
        allowInput = false;
        const allAnswer = document.querySelectorAll('.word-tile');
        allAnswer.forEach(answer => {
            answer.classList.add('disabled');
        });
        button.innerHTML = 'Finished <span class="arrow">▶</span>';
    }
    else {
        showSpeechBubble("Try again!");
    }
}
  
document.getElementById("checkButton").addEventListener("click", function () {
    const typed = manualInput.value.trim();
    const correct = correctAnswer.join("");

    if(userAnswer.join("") === correct || typed.toLowerCase() === correct.toLowerCase()) {
        isCorrect = true;
    }
    else {
        isCorrect = false;
    }
    checkAnswer(isCorrect);
});

function showSpeechBubble(message) {
    const bubble = document.getElementById('speechBubble');
    bubble.textContent = message;
    bubble.style.opacity = 1;

    setTimeout(() => {
        bubble.style.opacity = 0;
    }, 2000);
}