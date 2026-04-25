document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Chat Window
    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatWindow.classList.contains('open')) {
            chatInput.focus();
        }
    });

    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });

    // Send Message
    const sendMessage = async () => {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message to UI
        appendMessage('user', message);
        chatInput.value = '';

        // Add loading indicator (typing dots)
        const loadingId = 'loading-' + Date.now();
        appendMessage('bot', '<div class="typing-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>', loadingId, true);

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            
            // Remove loading and add bot response
            document.getElementById(loadingId).remove();
            
            if (response.ok && data.response) {
                appendMessage('bot', data.response);
            } else if (data.error) {
                appendMessage('bot', data.error);
            } else {
                appendMessage('bot', 'I am currently having a little trouble connecting, but you can explore all our products directly on our Shop page!');
            }
        } catch (error) {
            console.error('Chat error:', error);
            if (document.getElementById(loadingId)) {
                document.getElementById(loadingId).remove();
            }
            appendMessage('bot', 'I am currently having a little trouble connecting, but you can explore all our products directly on our Shop page!');
        }
    };

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function appendMessage(sender, text, id = null, isHTML = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        if (id) msgDiv.id = id;
        
        if (isHTML) {
            msgDiv.innerHTML = text;
        } else {
            msgDiv.textContent = text;
        }
        
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
