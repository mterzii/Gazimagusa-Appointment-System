// client/Register.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');
    const messageDiv = document.createElement('div'); 
    registerForm.insertAdjacentElement('afterend', messageDiv);

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        messageDiv.innerHTML = ''; 
        const formData = {
            Name: document.getElementById('firstName').value,
            Surname: document.getElementById('lastName').value,
            Sex: document.getElementById('sex').value,
            DOB: document.getElementById('dob').value,
            Phone: document.getElementById('phone').value,
            Email: document.getElementById('email').value,
            Password: document.getElementById('password').value,
            Address: {
                street1: document.getElementById('street1').value,
                street2: document.getElementById('street2').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value,
            },
            MaritalStatus: document.getElementById('maritalStatus').value,
            EmergencyContact: {
                firstName: document.getElementById('emergencyFirstName').value,
                lastName: document.getElementById('emergencyLastName').value,
                relationship: document.getElementById('emergencyRelationship').value,
                phone: document.getElementById('emergencyPhone').value,
            },
            HealthHistory: {
                reasonForRegistration: document.getElementById('reason').value,
                additionalNotes: document.getElementById('notes').value,
                isTakingMeds: document.querySelector('input[name="meds"]:checked')?.value === 'yes',
                medsList: document.getElementById('medsList').value,
            },
        };

        try {
            const response = await fetch('http://localhost:7000/api/v1/auth/register/patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                messageDiv.innerHTML = `<div class="alert alert-success mt-3">Registration successful! Redirecting to login...</div>`;
                // 2 saniye sonra login sayfasına yönlendir
                setTimeout(() => {
                    window.location.href = '../Login/PatientLogin.html';
                }, 2000);
            } else {
                // Backend'den gelen hatayı göster
                throw new Error(data.message);
            }

        } catch (error) {
            messageDiv.innerHTML = `<div class="alert alert-danger mt-3">${error.message}</div>`;
        }
    });
});