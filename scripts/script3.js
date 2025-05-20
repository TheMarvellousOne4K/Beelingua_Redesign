let isCorrect = false;
let correctIndex = 1;

const input = document.querySelectorAll('.answer');

input.forEach(word => {
    word.addEventListener('click', () => {
        input.forEach(w => w.classList.remove('selected'));

        word.classList.add('selected');
    });
});

function checkAnswer(isCorrect) {
    const button = document.getElementById("checkButton");
    if (isCorrect) {
        showSpeechBubble("Great job!");
        button.innerHTML = 'Continue <span class="arrow">▶</span>';
        button.onclick = () => window.location.href = 'question4.html';
        input.forEach((ans, i) => {
            ans.classList.add('disabled');
            if (i === correctIndex) {
                ans.classList.add('correct');
            }
        });
    }
    else {
        showSpeechBubble("Try again!");
    }
}
  
document.getElementById("checkButton").addEventListener("click", function () {
    const selectedElement = document.querySelector('.answer.selected');
    if (selectedElement.id == "correct") {
        isCorrect = true;
    }
    else{
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