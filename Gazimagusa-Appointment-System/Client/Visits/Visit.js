document.addEventListener("DOMContentLoaded", () => {
    const forgotItem = document.getElementById("forgotPasswordItem");
    const settingsModalEl = document.getElementById("userSettingsModal");
    const forgotModalEl = document.getElementById("forgotPasswordModal");

    if (!forgotItem || !settingsModalEl || !forgotModalEl) return;

    forgotItem.addEventListener("click", () => {

        // Settings modal instance'ı al veya oluştur
        let settingsModal = bootstrap.Modal.getInstance(settingsModalEl);
        if (!settingsModal) {
            settingsModal = new bootstrap.Modal(settingsModalEl);
        }

        // Settings modal'ı kapat
        settingsModal.hide();

        // Forgot Password modal instance'ı al veya oluştur
        let forgotModal = bootstrap.Modal.getInstance(forgotModalEl);
        if (!forgotModal) {
            forgotModal = new bootstrap.Modal(forgotModalEl);
        }

        // Forgot Password modal'ını aç
        forgotModal.show();
    });
});
