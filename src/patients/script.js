//Patient Registration and Login
const handleRegistration = async (event) => {
	event.preventDefault();
	const errormessage = document.querySelector('#error-message');
	const form = document.querySelector('#registration-form');
	try {
		const response = await fetch(
			'https://yabatech-backend.vercel.app/patient/register',
			{
				method: 'POST',
				body: new FormData(form),
			}
		);
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

const handleLogin = async (event) => {
	event.preventDefault();
	const form = document.querySelector('#login-form');
	const errormessage = document.querySelector('#error-message');
	try {
		const response = await fetch(
			'https://yabatech-backend.vercel.app/patient/login',
			{
				method: 'POST',
				body: new FormData(form),
			}
		);
		const result = await response.json();
		if (response.ok) {
			window.location.href = '../patient_dashboard.html';
		} else {
			errormessage.innerHTML = result.message;
		}
	} catch (e) {
		console.log('Error logging in ' + e);
	}
};
