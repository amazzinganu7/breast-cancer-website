// Login functionality
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        localStorage.setItem('username', username);
        window.location.href = 'main.html';
    });
}

// Dashboard welcome message
if (document.getElementById('welcomeMessage')) {
    const username = localStorage.getItem('username') || 'User';
    document.getElementById('welcomeMessage').textContent = `Welcome, ${username}`;
}

// Track page upload functionality
if (document.getElementById('uploadBtn')) {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const uploadBtn = document.getElementById('uploadBtn');

    // Load existing files from localStorage
    let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles')) || [];
    displayFiles();

    uploadBtn.addEventListener('click', function() {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const fileData = {
                    name: file.name,
                    data: e.target.result  // Base64 string
                };
                uploadedFiles.push(fileData);
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
                displayFiles();
                fileInput.value = '';  // Clear input
            };
            reader.readAsDataURL(file);
        }
    });

    function displayFiles() {
        fileList.innerHTML = '';
        uploadedFiles.forEach((file, index) => {
            const li = document.createElement('li');
            li.textContent = file.name;
            // Optional: Add a view/download link
            const viewLink = document.createElement('a');
            viewLink.href = file.data;
            viewLink.target = '_blank';
            viewLink.textContent = ' (View)';
            li.appendChild(viewLink);
            fileList.appendChild(li);
        });
    }
}