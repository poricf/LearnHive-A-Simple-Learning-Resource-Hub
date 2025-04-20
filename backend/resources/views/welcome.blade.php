<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    <style>
        body {
            font-family: 'Instrument Sans', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f3f4f6;
        }
        .login-container {
            background: white;
            padding: 2rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
        }
        .form-group {
            margin-bottom: 1rem;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.25rem;
        }
        button {
            width: 100%;
            padding: 0.75rem;
            background-color: #3b82f6;
            color: white;
            border: none;
            border-radius: 0.25rem;
            cursor: pointer;
            font-weight: 500;
        }
        button:hover {
            background-color: #2563eb;
        }
        .response {
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 0.25rem;
        }
        .success {
            background-color: #dcfce7;
            color: #166534;
        }
        .error {
            background-color: #fee2e2;
            color: #991b1b;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2 style="text-align: center; margin-bottom: 1.5rem;">Login</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
        <div id="response" class="response" style="display: none;"></div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const responseDiv = document.getElementById('response');
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                
                responseDiv.style.display = 'block';
                
                if (response.ok) {
                    responseDiv.className = 'response success';
                    responseDiv.innerHTML = `
                        <p>Login successful!</p>
                        <p>Token: ${data.token}</p>
                        <p>User: ${data.user.name} (${data.user.email})</p>
                    `;
                    // Store the token in localStorage
                    localStorage.setItem('auth_token', data.token);
                } else {
                    responseDiv.className = 'response error';
                    responseDiv.textContent = data.message || 'Login failed';
                }
            } catch (error) {
                responseDiv.style.display = 'block';
                responseDiv.className = 'response error';
                responseDiv.textContent = 'An error occurred during login';
            }
        });
    </script>
</body>
</html>
