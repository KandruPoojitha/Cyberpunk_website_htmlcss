var welcomeMessageDisplayed = false;

document.addEventListener("DOMContentLoaded", function () {
    var chatPopup = document.getElementById("chat-popup");
    chatPopup.style.display = "block";
    displayWelcomeMessage();
    document.getElementById("user-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
});

function displayWelcomeMessage() {
    var welcomeMessage = "Hello! I am your assistant. How may I help you today?";
    displayMessage(welcomeMessage, "assistant-message");
    welcomeMessageDisplayed = true;
}

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    displayMessage(userInput, "user-message");
    var response = generateResponse(userInput);
    displayMessage(response, "assistant-message");
    document.getElementById("user-input").value = "";
    updateInputContainerPosition();
}

function displayMessage(message, className) {
    var chatContainer = document.getElementById("chat-container");
    var messageElement = document.createElement("div");
    messageElement.classList.add("message", className);
    messageElement.innerHTML = `</strong> ${message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function generateResponse(userInput) {
    var lowerCaseInput = userInput.toLowerCase();

    switch (lowerCaseInput) {
        case "hello":
            return "Hi! How may I help you today?";
        case "hi":
            return "Hello! How may I help you today?";
        case "release date":
            return "Cyberpunk 2077 was released on December 10, 2020.";
        case "main story length":
            return "The main story of Cyberpunk 2077 takes approximately 20-30 hours to complete.";
        case "cyberpunk":
            return "It's a genre that combines high-tech and low-life, exploring futuristic settings with advanced technology but societal decay.";
        case "dlc":
            return "As of now, Phantom Liberty is the only DLC announced for Cyberpunk 2077.";
        case "phantom liberty":
            return "It's an add-on for the main game."
        default:
            return "I'm sorry, I don't have information about that. Feel free to ask another question.";
    }
}

function minimizeChat() {
    var chatPopup = document.getElementById("chat-popup");
    var inputContainer = document.querySelector(".input-container");
    var currentHeight = chatPopup.clientHeight;

    if (currentHeight === 40) {
        chatPopup.style.height = "400px";
        inputContainer.style.display = "flex";
        updateInputContainerPosition();
    } else {
        chatPopup.style.height = "40px";
        inputContainer.style.display = "none";
    }
}

function closeChat() {
    var chatPopup = document.getElementById("chat-popup");
    var chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML = "";
    chatPopup.style.display = "none";
    welcomeMessageDisplayed = false;
}

function updateInputContainerPosition() {
    var inputContainer = document.querySelector(".input-container");
    var chatContainer = document.getElementById("chat-container");

    if (inputContainer.style.display === "flex") {
        inputContainer.style.bottom = chatContainer.scrollHeight + "px";
    }
}

function toggleChat() {
    var chatPopup = document.getElementById("chat-popup");
    var inputContainer = document.querySelector(".input-container");

    if (chatPopup.style.display === "none" || chatPopup.style.display === "") {
        chatPopup.style.display = "block";
        if (!welcomeMessageDisplayed) {
            displayWelcomeMessage();
        }
    } else {
        chatPopup.style.display = "none";
    }
    updateInputContainerPosition();
}

