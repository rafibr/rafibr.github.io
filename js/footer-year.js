// Set the current year in the footer and README copyright text
document.addEventListener('DOMContentLoaded', () => {
	const currentYear = new Date().getFullYear();

	// Update footer year
	const footerYearElement = document.getElementById('current-year');
	if (footerYearElement) {
		footerYearElement.textContent = currentYear;
	}

	// Update README year if viewed in browser
	const readmeYearElement = document.getElementById('readme-year');
	if (readmeYearElement) {
		readmeYearElement.textContent = currentYear;
	}
});
