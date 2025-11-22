
document.addEventListener('DOMContentLoaded', function () {
    const forgotItem = document.getElementById('forgotPasswordItem');
    const settingsEl = document.getElementById('userSettingsModal');
    const forgotEl = document.getElementById('forgotPasswordModal');

    if (forgotItem && settingsEl && forgotEl) {
        forgotItem.addEventListener('click', function () {
            // Settings modalı kapat
            let settingsModal = bootstrap.Modal.getInstance(settingsEl);
            if (!settingsModal) {
                settingsModal = new bootstrap.Modal(settingsEl);
            }
            settingsModal.hide();

            // Forgot Password modalını aç
            const forgotModal = new bootstrap.Modal(forgotEl);
            forgotModal.show();
        });
    }
});
