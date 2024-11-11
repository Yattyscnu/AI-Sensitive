const database = {  
    'admn_db': [  
        ['abd', '12345'] 
    ]  
};  

function login() {  
    const username = document.getElementById('username').value;  
    const password = document.getElementById('password').value;  

    // Check for sensitive words  
    const sensitiveWords = ['shit', 'fucking', 'fuck', 'bitch'];  // You can define your sensitive words here

    for (const word of sensitiveWords) {  
        if (username.includes(word) || password.includes(word)) {  
            showModal();  
            return;  
        }  
    }  

    // Check if username and password match in the database  
    const matchingUser = database['admn_db'].find(([id, pwd]) => username === id && password === pwd);  

    // Debugging: Check if user found and matching password
    console.log('Matching user:', matchingUser);

    if (matchingUser) {  
        window.location.href = 'chat_f.html';  // Redirect to chat page if login successful
    } else {  
        alert('Invalid username or password.');  
    }  
}  

function showModal() {  
    const modal = document.getElementById('myModal');  
    modal.style.display = 'block';  
}  

function closeModal() {  
    const modals = document.getElementsByClassName('modal');  
    for (const modal of modals) {  
        modal.style.display = 'none';  
    }  
}  

document.getElementById('submitButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const userId = 1; // 假设当前用户 ID 为 1，可以根据需要动态获取

    fetch('http://localhost:3000/checkInput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, inputText })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseMessage').innerText = data.message;
    })
    .catch(error => console.error('Error:', error));
});