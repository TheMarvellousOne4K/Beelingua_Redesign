let isCorrect = false;

const input = document.querySelectorAll('.red-box');

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
        const allAnswer = document.querySelectorAll('.red-box');
        allAnswer.forEach(answer => {
            answer.classList.add('disabled');
        });
        button.innerHTML = 'Continue <span class="arrow">▶</span>';
        button.onclick = () => window.location.href = 'question3.html';
    }
    else {
        showSpeechBubble("Try again!");
    }
}
  
document.getElementById("checkButton").addEventListener("click", function () {
    const selectedElement = document.querySelector('.red-box.selected');
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