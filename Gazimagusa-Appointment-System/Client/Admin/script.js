
function showPage(pageName) {
    // Array of main pages
    const pages = ['dashboard', 'doctors', 'patients', 'appointments'];
   
    const otherPages = [
        'departments',
        'schedule',
        'payments',
        'calendar',
        'inventory',
        'help',
    ];

    // Hide all main pages
    pages.forEach((page) => {
        const pageElement = document.getElementById(page + '-page');
        if (pageElement) {
            pageElement.classList.add('hidden');
        }
    });

    // Hide the "other page" placeholder
    document.getElementById('other-page').classList.add('hidden');

    // Show the selected page or placeholder
    if (pages.includes(pageName)) {
        document
            .getElementById(pageName + '-page')
            .classList.remove('hidden');
    } else if (otherPages.includes(pageName)) {
        document.getElementById('other-page').classList.remove('hidden');
    }

    // Update active menu item
    document.querySelectorAll('.menu-item').forEach((item) => {
        item.classList.remove('active');
    });
    event.target.closest('.menu-item').classList.add('active');
}
