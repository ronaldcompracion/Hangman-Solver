export async function loadWords() {
    try {
        const response = await fetch("assets/js/json_words/words_dictionary.json");
        const data = await response.json();   
        return Object.keys(data);  // Directly return the words array
    } catch (error) {
        console.error("Error loading words:", error);
        return [];
    }
}
