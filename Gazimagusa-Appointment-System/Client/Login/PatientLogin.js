// client/PatientLogin/PatientLogin.js

document.addEventListener('DOMContentLoaded', () => {
    // Formu seç
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async (event) => {
        // Formun varsayılan "sayfayı yenileme" davranışını engelle
        event.preventDefault();

        // Input alanlarındaki verileri al
        const email = document.getElementById('idInput').value;
        const password = document.getElementById('passwordInput').value;

        // Hata mesajlarını temizle (varsa)
        const errorElement = document.getElementById('login-error');
        if (errorElement) errorElement.remove();

        try {
            // Backend'e POST isteği gönder
            const response = await fetch('http://localhost:7000/api/v1/auth/login/patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Email: email, Password: password }),
            });

            // Backend'den gelen cevabı JSON formatına çevir
            const data = await response.json();

            if (data.success) {
                // Giriş başarılıysa...
                alert('Giriş başarılı!');
                
                // Gelen token'ı tarayıcının hafızasında sakla
                localStorage.setItem('token', data.token);

                // Kullanıcıyı ana sayfaya yönlendir
                window.location.href = '../Home/Home.html';
            } else {
                // Giriş başarısızsa, backend'den gelen hatayı göster
                throw new Error(data.message);
            }

        } catch (error) {
            // Herhangi bir hata olursa kullanıcıya göster
            const errorMessage = document.createElement('p');
            errorMessage.id = 'login-error';
            errorMessage.textContent = error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
            errorMessage.style.color = 'red';
            errorMessage.style.marginTop = '10px';
            loginForm.appendChild(errorMessage);
        }
    });
});