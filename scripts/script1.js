let originalDropText = "";
let draggedText = "";
let draggedID = "";
let isCorrect = false;
let allowInput = true;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    if(allowInput == false){
        return;
    }
    draggedText = ev.target.innerText;
    ev.dataTransfer.setData("text", draggedText);
    draggedID = ev.target.id;
}

function drop(ev) {
    ev.preventDefault();
    if(allowInput == false){
        return;
    }
    const data = ev.dataTransfer.getData("text");
    ev.target.textContent = data;
    ev.target.classList.add("filled");
    originalDropText = data;

    if(draggedID == "correct"){
        isCorrect = true;
    }
    else{
        isCorrect = false;
    }
}

function previewText(ev) {
    ev.preventDefault();
    const preview = document.querySelector(".drop-zone");
    preview.textContent = draggedText;
}

function resetPreview(ev) {
    ev.preventDefault();
    const preview = document.querySelector(".drop-zone");
    if (!preview.classList.contains("filled")) {
        preview.textContent = "______";
    }
    else{
        preview.textContent = originalDropText;
    }
}

function checkAnswer(isCorrect) {
    const button = document.getElementById("checkButton");
    if (isCorrect) {
        showSpeechBubble("Great job!");
        button.innerHTML = 'Continue <span class="arrow">▶</span>';
        button.onclick = () => window.location.href = 'question2.html';
        allowInput = false;
    } 
    else {
        showSpeechBubble("Try again!");
    }
}
  
document.getElementById("checkButton").addEventListener("click", function () {
    checkAnswer(isCorrect);
});

function showSpeechBubble(message) {
    const bubble = document.getElementById('speechBubble');
    bubble.textContent = message;
    bubble.style.display = 'block';
}