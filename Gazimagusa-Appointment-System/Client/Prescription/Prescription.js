$(document).ready(function () {
	//Only needed for the filename of export files.
	//Normally set in the title tag of your page.
	document.title = 'Simple DataTable';
	// DataTable initialisation
	$('#example').DataTable(
		{
			"dom": '<"dt-buttons"Bf><"clear">lirtp',
			"paging": true,
			"autoWidth": true,
			"buttons": [
				'colvis',
				'copyHtml5',
				'csvHtml5',
				'excelHtml5',
				'pdfHtml5',
				'print'
			]
		}
	);
});


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


document.addEventListener('DOMContentLoaded', function () {
	const forgotItem = document.getElementById('forgotPasswordItem');
	const settingsEl = document.getElementById('userSettingsModal');
	const forgotEl = document.getElementById('forgotPasswordModal');

	if (forgotItem && settingsEl && forgotEl) {
		forgotItem.addEventListener('click', function () {
			let settingsModal = bootstrap.Modal.getInstance(settingsEl);
			if (!settingsModal) {
				settingsModal = new bootstrap.Modal(settingsEl);
			}
			settingsModal.hide();

			const forgotModal = new bootstrap.Modal(forgotEl);
			forgotModal.show();
		});
	}
});


