import { loadWords } from "../utils/wordLoarder.js";
import { updateSolverSuggestion } from "./solver.js";

let words = [];

export async function initializeGame() {   // async function will return a promise
    words = await loadWords();
    generateLetterBoxes();  
}


export function generateLetterBoxes() {
    let wordLength = Number(document.getElementById("wordLength").value);
    let wordDisplay = document.getElementById("wordDisplay");
    wordDisplay.innerHTML = "";
    
    for (let i = 0; i < wordLength; i++) {   // Iya e loop hangtod mag false
        let input = document.createElement("input"); 
        input.type = "text";
        input.maxLength = 1;
        input.className = "letter-box";
        input.oninput = () => {
            input.value = input.value.toUpperCase(); // Ensure input is uppercase
            updateSolverSuggestion(words); // Call the function
        };
        wordDisplay.appendChild(input);
    }
    
    if (wordLength > 0) {  //
        updateSolverSuggestion(words);
    }
}

export function updateIncorrectLetters() {
    let incorrectInput = document.getElementById("incorrectLetters").value.toLowerCase();
    let incorrectDisplay = document.getElementById("incorrectDisplay");
    incorrectDisplay.innerHTML = "";
    
    incorrectInput.split("").forEach(letter => {
        if (letter.match(/[a-z]/)) {
            let span = document.createElement("span");
            span.className = "incorrect-box";
            span.textContent = letter.toUpperCase();
            incorrectDisplay.appendChild(span);
        }
    });

    updateSolverSuggestion(words);
}
    
export function resetGame() { //clear all details inside contatiner
    ["wordLength", "incorrectLetters"].forEach(id => (document.getElementById(id).value = ""));
    ["wordDisplay", "incorrectDisplay", "solverSuggestion"].forEach(id => (document.getElementById(id).innerHTML = ""));
}