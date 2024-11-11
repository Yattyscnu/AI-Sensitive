let MODE = 0;  // Default filtering mode (Light Filtering)

    // Function to display the initial filtering level modal
    window.onload = function () {
        showModeModal();
    };

    // Function to set the filtering mode based on user selection
    function setMode(selectedMode) {
        MODE = selectedMode;
        closeModeModal();  // Close the initial modal
        console.log("Filtering mode set to:", MODE);  // For debugging
    }

    // Function to show the filtering level modal
    function showModeModal() {
        const modal = document.getElementById('modeModal');
        modal.style.display = 'block';  // Show the filtering modal
    }

    // Function to close the filtering level modal
    function closeModeModal() {
        const modal = document.getElementById('modeModal');
        modal.style.display = 'none';  // Hide the filtering modal
    }

    // Function to handle the sending of messages
    function sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();

        // Get the list of sensitive words based on the current MODE
        const sensitiveWords = getSensitiveWords(MODE);

        // Filter the message based on the selected filtering mode
        const filteredMessage = filterMessage(message, sensitiveWords);

        // If the message was changed due to sensitive words, show the modal
        if (filteredMessage !== message) {
            showModal();
        }

        // Display the filtered message in the chat box
        displayMessage(filteredMessage);
        chatInput.value = '';  // Clear the input field
    }

    // Function to show modal for sensitive word alert
    function showModal() {
        const modal = document.getElementById('myModal');
        modal.style.display = 'block';  // Show the modal
    }

    // Function to close modal
    function closeModal() {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';  // Hide the modal
    }

    // Function to display the message in the chat box
    function displayMessage(message) {
        const chatBox = document.querySelector('.chat-box');
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the latest message
    }

    // Function to get the sensitive words based on selected MODE
    function getSensitiveWords(mode) {
        const wordSets = {
            0: ['shit', 'fucking', 'fuck', 'bitch'],
            1: ['shit', 'fucking', 'fuck', 'bitch', 'damn'],
            2: ['shit', 'fucking', 'fuck', 'damn', 'cunt', 'bitch', 'cock', 'dick'],
            3: ['shit', 'fucking', 'fuck', 'damn', 'cunt', 'bitch', 'cock', 'bastard', 'hell', 'dick', 'piss', 'asshole', 'motherfucker'],
        };
        return wordSets[mode] || [];
    }

    // Function to filter sensitive words in the message
    function filterMessage(message, sensitiveWords) {
        // Split the message into words (ignoring punctuation)
        const words = message.split(/\b/);  // Split by word boundaries

        // Loop through each word and check if it's a sensitive word
        const filteredWords = words.map(word => {
            // Check if the word matches any sensitive word (case insensitive)
            const lowerCaseWord = word.toLowerCase();
            return sensitiveWords.some(sensitiveWord => lowerCaseWord === sensitiveWord.toLowerCase())
                ? '***'  // Replace sensitive words with '***'
                : word;   // Keep other words unchanged
        });

        // Rejoin the filtered words back into a sentence
        return filteredWords.join('');
    }