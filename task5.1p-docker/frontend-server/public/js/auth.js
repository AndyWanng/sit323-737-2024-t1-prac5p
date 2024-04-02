document.getElementById('toggle-login').addEventListener('click', function() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
});

document.getElementById('toggle-register').addEventListener('click', function() {
    document.getElementById('register-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
});

document.getElementById('register-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const data = await response.json();
        alert(`Registration successful, your API key: ${data.apiKey}`);
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    let apiKey = document.getElementById('login-apikey').value;
    apiKey = apiKey.toString()
    console.log(apiKey);

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, apiKey }),
        });


        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        sessionStorage.setItem('token', data.token);
        alert('Login successful');

        window.location.href = '/calculatorPage';
    } catch (error) {
        alert(error.message);
    }
});
