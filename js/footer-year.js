// Set the current year in the footer copyright text
document.addEventListener('DOMContentLoaded', () => {
	const currentYearElement = document.getElementById('current-year');
	if (currentYearElement) {
		currentYearElement.textContent = new Date().getFullYear();
	}
});
