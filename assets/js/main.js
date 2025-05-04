import { initializeGame, generateLetterBoxes, updateIncorrectLetters, resetGame } from "./modules/gameLogic.js";
import { initializeAudio } from "./modules/audioHandler.js";

// Initialize background music
initializeAudio();

// Initialize the game (load words and set up event listeners)
initializeGame().then(() => {
    document.getElementById("wordLength").addEventListener("input", generateLetterBoxes);
    document.getElementById("incorrectLetters").addEventListener("input", updateIncorrectLetters);
    document.getElementById("resetButton").addEventListener("click", resetGame);
});