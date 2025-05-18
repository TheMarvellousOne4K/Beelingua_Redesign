const isCorrect = new Array(3).fill(false);
let isCorrectAll = false;

const questionTabs = document.querySelectorAll('.question-tab');
const input = document.querySelectorAll('.answer');

const questions = [
    {
        question: "What is the main idea of the first paragraph?",
        answers: ["Asnawal Iwown", "Prolun Potenti", "Unus Annus", "Eros Eros"],
        correctIndex: 0
    },
    {
        question: "What is the main idea of the second paragraph?",
        answers: ["Light-hearted", "Sarcastic", "Analytical", "Mysterious"],
        correctIndex: 1
    },
    {
        question: "What is the main idea of the third paragraph?",
        answers: ["Waveform analysis", "Noise suppression", "Circuit design", "Energy efficiency"],
        correctIndex: 2
    }
];

let currentQuestionIndex = 0;

function renderQuestion(index) {
    const question = questions[index];
    const container = document.querySelector('.question-content');

    container.innerHTML = `
        <div class="question-text">
        <p><strong>${question.question}</strong></p>
        </div>
        <div class="answer-options">
        ${question.answers.map((ans, i) => `
            <div class="answer" data-index="${i}">
                <span class="circle">${String.fromCharCode(65 + i)}</span> ${ans}
            </div>
        `).join('')}
        </div>
    `;

    // Reset selected state
    let selectedIndex = null;
    const answers = document.querySelectorAll('.answer');

    answers.forEach(ans => {
        ans.addEventListener('click', () => {
        answers.forEach(a => a.classList.remove('selected'));
            ans.classList.add('selected');
            selectedIndex = parseInt(ans.getAttribute('data-index'));
        });
    });

    const checkBtn = document.getElementById('check-answer-btn');
    checkBtn.onclick = () => {
        if (selectedIndex === null) {
            alert("Please select an answer first.");
            return;
        }
        else if(selectedIndex === question.correctIndex){
            showSpeechBubble("Nice one!");
            isCorrect[currentQuestionIndex] = true;
            updateTabColors();
            answers.forEach((ans, i) => {
                ans.classList.add('disabled');
                if (i === question.correctIndex) {
                    ans.classList.add('correct');
                }
            });
        }
        else{
            showSpeechBubble("Try again!");
            isCorrect[currentQuestionIndex] = false;
            updateTabColors();
        }
    };
}

questionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        questionTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentQuestionIndex = parseInt(tab.dataset.index);
        renderQuestion(currentQuestionIndex);
    });
});

function updateTabColors(){
    isCorrect.forEach((status, index) => {
        if (status) {
            questionTabs[index].classList.add('correct');
        } 
        else {
            questionTabs[index].classList.remove('correct');
        }
    });
}

renderQuestion(currentQuestionIndex);


function checkAnswer(isCorrectAll) {
    const button = document.getElementById("checkButton");
    if (isCorrectAll) {
        showSpeechBubble("Great job!");
        button.innerHTML = 'Continue <span class="arrow">▶</span>';
        button.onclick = () => window.location.href = 'question5.html';
    }
    else {
        showSpeechBubble("All questions must be correct!");
    }
}
  
document.getElementById("checkButton").addEventListener("click", function () {
    for(let i = 0; i < isCorrect.length; i++)
    {
        if(isCorrect[i] == false){
            isCorrectAll = false;
            break;
        }
        else{
            isCorrectAll = true;
        }
    }
    checkAnswer(isCorrectAll);
});

function showSpeechBubble(message) {
    const bubble = document.getElementById('speechBubble');
    bubble.textContent = message;
    bubble.style.display = 'block';
}