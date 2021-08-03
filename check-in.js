let submitButton = document.getElementById('submit-button');
let messageLabel = document.getElementById('message-label');

let symptomsCheckbox = document.getElementById('symptoms');
let closeContactCheckbox = document.getElementById('close-contact');

submitButton.addEventListener('click', checkIn);

function checkIn() {
    if (symptomsCheckbox.checked && closeContactCheckbox.checked) {
        messageLabel.textContent = "You have successfully checked in"
        messageLabel.style.color = "#008000"
        messageLabel.style.display='block';
    }
    else
    {
        messageLabel.textContent = `You have not selected the check boxes. 
        Please go home and get tested.`
        messageLabel.style.color = "#B22222"
        messageLabel.style.display='block';
    }
}
