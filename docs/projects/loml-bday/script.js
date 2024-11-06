// Function to start listening for a "blow" sound
async function startAudioProcessing() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function checkVolume() {
            analyser.getByteFrequencyData(dataArray);

            const averageVolume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
            const volumeThreshold = 70;

            if (averageVolume > volumeThreshold) {
                blowOutCandle();
                console.log("Blow detected!");

                audioContext.close();
                stream.getTracks().forEach(track => track.stop());
            } else {
                requestAnimationFrame(checkVolume);
            }
        }

        checkVolume();
    } catch (err) {
        console.error("Microphone access denied or error occurred:", err);
    }
}

// Function to blow out the candle and trigger confetti
function blowOutCandle() {
    document.getElementById("candle").classList.add("blown-out"); // Dim the candle
    document.getElementById("flame").classList.add("blown-out"); // Hide the flame
    console.log("Candle blown out!");

    createConfetti(); // Trigger the confetti effect
}
function createConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) { // Adjust number of confetti pieces
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // Randomize confetti color, size, and starting position at the top
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.width = `${Math.random() * 9 + 6}px`;
        confetti.style.height = confetti.style.width;
        confetti.style.position = "absolute";
        confetti.style.top = "0px"; // Start at the top

        // Append confetti piece to container
        confettiContainer.appendChild(confetti);

        // Animate confetti falling using setInterval
        let position = 0;
        const fallSpeed = Math.random() * 2 + 1; // Randomize fall speed for each piece
        const fallInterval = setInterval(() => {
            if (position >= window.innerHeight - 20) { // Stop at the bottom
                clearInterval(fallInterval);
            } else {
                position += fallSpeed; // Move confetti down
                confetti.style.top = position + "px";
            }
        }, 10); // Adjust interval timing for smoothness
    }

    // Remove the container after a set time
    setTimeout(() => {
        confettiContainer.remove();
    }, 10000); // Adjust timeout as needed
}

// Start the audio processing and trigger confetti when the candle is blown out
async function startAudioProcessing() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function checkVolume() {
            analyser.getByteFrequencyData(dataArray);

            const averageVolume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
            const volumeThreshold = 70;

            if (averageVolume > volumeThreshold) {
                blowOutCandle();
                console.log("Blow detected!");

                audioContext.close();
                stream.getTracks().forEach(track => track.stop());
            } else {
                requestAnimationFrame(checkVolume);
            }
        }

        checkVolume();
    } catch (err) {
        console.error("Microphone access denied or error occurred:", err);
    }
}

function blowOutCandle() {
    document.getElementById("candle").classList.add("blown-out");
    document.getElementById("flame").classList.add("blown-out");
    createConfetti();
}

// Start the audio processing when the page loads
startAudioProcessing();