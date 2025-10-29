

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('doctorID').value;
        const password = document.getElementById('doctorPassword').value; 

        const errorElement = document.getElementById('login-error');
        if (errorElement) {
            errorElement.remove();
        }

        try {
            const response = await fetch('http://localhost:7000/api/v1/auth/login/doctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Doctor login successful!');
                
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.doctor));

                window.location.href = '../Doctor/Doctor.html';
            } else {
                throw new Error(data.message);
            }

        } catch (error) {
            const errorMessage = document.createElement('p');
            errorMessage.id = 'login-error';
            errorMessage.textContent = error.message || 'An error occurred. Please try again.';
            errorMessage.style.color = 'red';
            errorMessage.style.marginTop = '15px';
            loginForm.appendChild(errorMessage); 
        }
    });
});