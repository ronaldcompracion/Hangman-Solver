export function initializeAudio() {
    document.addEventListener("click", function startMusic() {
        let bgMusic = document.getElementById("bgMusic");
        bgMusic.volume = 0.5;
        bgMusic.play().catch(error => console.error("Autoplay failed:", error));
        
        document.removeEventListener("click", startMusic);
    });
}
