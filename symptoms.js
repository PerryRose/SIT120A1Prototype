let submitButton = document.getElementById('submit-button');
let messageLabel = document.getElementById('message-label');

let coughingCheckbox = document.getElementById('coughing');
let feverCheckbox = document.getElementById('fever');
let fatiguedCheckbox = document.getElementById('fatigued');
let soreThroatCheckbox = document.getElementById('sore-throat');
let lossTasteCheckbox = document.getElementById('loss-taste');
let lossSmellCheckbox = document.getElementById('loss-smell');
let headacheCheckbox = document.getElementById('headache');
let difficultyBreathingCheckbox = document.getElementById('difficulty-breathing');
let chestPainCheckbox = document.getElementById('chest-pain')

submitButton.addEventListener('click', checkSymptoms);

function checkSymptoms() {
    if (!coughingCheckbox.checked && !feverCheckbox.checked 
        && !fatiguedCheckbox.checked && !soreThroatCheckbox.checked
        && !lossTasteCheckbox.checked && !lossSmellCheckbox.checked 
        && !headacheCheckbox.checked && !difficultyBreathingCheckbox.checked 
        && !chestPainCheckbox.checked) {
        messageLabel.textContent = "You have no symptoms"
        messageLabel.style.color = "#008000"
        messageLabel.style.display='block';
    }
    else
    {
        console.log(coughingCheckbox)
        messageLabel.textContent = `You have symptoms of COVID. Please go get tested`;
        messageLabel.style.color = "#B22222"
        messageLabel.style.display='block';
    }
}
