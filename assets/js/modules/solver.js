export function updateSolverSuggestion(words) {
    // Step 1: Check if the words array is loaded
    if (!words || words.length === 0) {
        console.warn("Words array is not loaded yet.");
        return;
    }

    // Step 2: Get all letter boxes and build the known letters string
    const letterBoxElements = document.querySelectorAll(".letter-box");
    const knownLettersArray = [];
    for (let i = 0; i < letterBoxElements.length; i++) {
        const input = letterBoxElements[i];
        const value = input.value.toLowerCase();
        if (value) {
            knownLettersArray.push(value); // Add the entered letter
        } else {
            knownLettersArray.push("_"); // Add "_" for unknown letters
        }
    }
    const knownLetters = knownLettersArray.join(""); // Combine into a single string

    // Step 3: Get incorrect letters
    const incorrectLettersInput = document.getElementById("incorrectLetters");
    const incorrectLetters = incorrectLettersInput.value.toLowerCase();

    // Step 4: Get warning and suggestion elements
    const wordLengthWarning = document.getElementById("wordLengthWarning");
    const suggestion = document.getElementById("solverSuggestion");

    // Step 5: Show a warning if no letters are entered
    if (knownLetters.length === 0) {
        wordLengthWarning.style.display = "block";
        return;
    } else {
        wordLengthWarning.style.display = "none";
    }

    // Step 6: Filter possible words
    const possibleWords = [];
    for (let w = 0; w < words.length; w++) { // Loop through each word in the words array
        const word = words[w]; // Get the current word

        // Check if the word length matches
        if (word.length !== knownLetters.length) { // Skip if lengths don't match   
            continue; // Move to the next word if lengths don't match
        }

        // Check if the word matches the known letters
        let matchesKnownLetters = true; // Assume it matches
        for (let i = 0; i < knownLetters.length; i++) { // Loop through each letter
            const knownLetter = knownLetters[i]; // Get the known letter from the input
            const wordLetter = word[i]; // Get the corresponding letter from the word
            if (knownLetter !== "_" && knownLetter !== wordLetter) { // Skip if letters don't match
                matchesKnownLetters = false; // Set to false if any letter doesn't match
                break; // Exit loop if a mismatch is found
            }  // If the known letter is not "_" and doesn't match the word letter, set to false
        }
        if (!matchesKnownLetters) { // If it doesn't match, skip to the next word
            continue; //
        }

        // Check if the word contains any incorrect letters
        let containsIncorrect = false; // Assume it doesn't contain incorrect letters 
        for (let i = 0; i < incorrectLetters.length; i++) { // Loop through each incorrect letter
            const incorrectLetter = incorrectLetters[i]; // Get the incorrect letter from the input
            if (word.includes(incorrectLetter)) { // Check if the word contains the incorrect letter
                containsIncorrect = true; // Set to true if it does
                break; // Exit loop if an incorrect letter is found
            }
        }
        if (containsIncorrect) { // If it contains incorrect letters, skip to the next word
            continue;
        }

        // Add the word to the list of possible words
        possibleWords.push(word); 
    }

    // Step 7: Handle the case where no matching words are found
    if (possibleWords.length === 0) { // If no possible words are found
        suggestion.textContent = "No matching words found."; // Update suggestion text
        return; 
    }

    // Step 8: Build a frequency map of letters in the possible words
    const letterFrequency = {}; // Initialize an empty object to store letter frequencies
    for (let p = 0; p < possibleWords.length; p++) { // Loop through each possible word
        const word = possibleWords[p]; // Get the current word
        for (let i = 0; i < word.length; i++) { // Loop through each letter in the word
            const letter = word[i]; // Get the current letter
            if (knownLetters[i] === "_" && 
                !incorrectLetters.includes(letter) && 
                !knownLetters.includes(letter)) { // Check if the letter is not already known or incorrect
                if (letterFrequency[letter]) { // If the letter is already in the frequency map
                    letterFrequency[letter]++; // Increment its frequency
                } else {
                    letterFrequency[letter] = 1; // Otherwise, initialize its frequency to 1
                }
            }
        }
    }

    // Step 9: Find the letter with the highest frequency
    const letterKeys = Object.keys(letterFrequency); 
    letterKeys.sort(function (a, b) {
        return letterFrequency[b] - letterFrequency[a];
    });
    const bestGuess = letterKeys[0];

    // Step 10: Update the suggestion text
    if (bestGuess) {
        suggestion.textContent = "Try guessing '" + bestGuess.toUpperCase() + "' next.";
    } else {
        suggestion.textContent = "No missing letters found.";
    }

    // Step 11: Handle the case where the word is fully guessed
    if (!knownLetters.includes("_")) {
        const wordDisplay = document.getElementById("wordDisplay");
        wordDisplay.classList.remove("completed-word");

        // Trigger reflow to restart animation
        void wordDisplay.offsetWidth;

        wordDisplay.classList.add("completed-word");

        // Play success sound
        const successSound = document.getElementById("successSound");
        successSound.play();
    }
}
