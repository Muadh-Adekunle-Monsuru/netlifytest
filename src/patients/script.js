const handleRegistration = async (event) => {
	event.preventDefault();
	const errormessage = document.querySelector('#error-message');
	const form = document.querySelector('#registration-form');
	try {
		const response = await fetch('http://localhost:8080/patient/register', {
			method: 'POST',
			body: new FormData(form),
		});
		const result = await response.json();
		if (response.ok) {
			window.location.href = '../patient_dashboard.html';
		} else {
			errormessage.innerHTML = result.message;
		}
	} catch (e) {
		console.log('error submitting form' + e);
	}
};
