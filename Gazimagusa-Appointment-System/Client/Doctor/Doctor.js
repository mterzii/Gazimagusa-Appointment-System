// Sidebar Toggle for Mobile Responsive
document.addEventListener('DOMContentLoaded', function () {
    const sidebarCollapse = document.getElementById('sidebarCollapse');
    const sidebar = document.getElementById('sidebar');

    if (sidebarCollapse) {
        sidebarCollapse.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function (event) {
        const isClickInsideSidebar = sidebar.contains(event.target);
        const isClickOnToggle = sidebarCollapse && sidebarCollapse.contains(event.target);

        if (!isClickInsideSidebar && !isClickOnToggle && window.innerWidth <= 991) {
            sidebar.classList.remove('active');
        }
    });

    // Initialize Chart
    initializeChart();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Chart
function initializeChart() {
    const ctx = document.getElementById('patientChart');
    if (!ctx) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data1 = [45, 52, 49, 60, 70, 85, 95, 88, 92, 105, 115, 125];
    const data2 = [35, 42, 38, 48, 55, 65, 72, 68, 75, 85, 92, 98];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Total Patients',
                    data: data1,
                    borderColor: '#4a90e2',
                    backgroundColor: 'rgba(74, 144, 226, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    borderWidth: 3
                },
                {
                    label: 'New Patients',
                    data: data2,
                    borderColor: '#95a5a6',
                    backgroundColor: 'rgba(149, 165, 166, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 14
                    },
                    bodyFont: {
                        size: 13
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: '#95a5a6'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 12
                        },
                        color: '#95a5a6',
                        callback: function (value) {
                            return value;
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// Real-time stats demo (optional)
function updateStats() {
    const statCards = document.querySelectorAll('.stat-content h3');
    statCards.forEach(card => {
        const currentValue = parseInt(card.textContent.replace(/,/g, ''));
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newValue = Math.max(0, currentValue + change);
        card.textContent = newValue.toLocaleString();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card, .quick-card, .card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

/* Patient Modal */
const patientModal = document.getElementById('patientDetailsModal');

if (patientModal) {
    patientModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        if (!button) return;

        document.getElementById('modalPatientName').textContent = button.dataset.name || '-';
        document.getElementById('modalComplaint').textContent = button.dataset.complaint || '-';
        document.getElementById('modalAppointmentTime').textContent = button.dataset.time || '-';
        document.getElementById('modalDiagnosis').textContent = button.dataset.diagnosis || '-';
        document.getElementById('modalMedication').textContent = button.dataset.medication || '-';
        document.getElementById('modalNotes').textContent = button.dataset.notes || '-';
    });
}

/* Forgot Password flow (Settings -> Forgot Password modal) */
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const settingsModalEl = document.getElementById('settingsModal');
const forgotPasswordModalEl = document.getElementById('forgotPasswordModal');

if (forgotPasswordBtn && settingsModalEl && forgotPasswordModalEl) {
    const settingsModal = bootstrap.Modal.getOrCreateInstance(settingsModalEl);
    const forgotPasswordModal = new bootstrap.Modal(forgotPasswordModalEl);

    forgotPasswordBtn.addEventListener('click', () => {
        settingsModal.hide();
        forgotPasswordModal.show();
    });
}

/*Navbar Geçişleri */

document.querySelectorAll(".sidebar-menu li a").forEach(link => {
    link.addEventListener("click", function () {

        // Tüm active sınıflarını temizle
        document.querySelectorAll(".sidebar-menu li").forEach(li => {
            li.classList.remove("active");
        });

        // Tıklanan link'in parent LI'sine active ata
        this.parentElement.classList.add("active");
    });
});

